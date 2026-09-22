// Cloudflare Worker: receives the "Inquire" form submission from site/js/inquiry.js
// and emails Ari (via SendGrid) with the customer's details and cart contents,
// plus a confirmation email back to the customer (if they gave one).
//
// Deployed manually to Cloudflare (Workers & Pages -> boonandbane-inquiries).
// This file is the source of truth to edit; after changing it, redeploy with:
//   curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<account_id>/workers/scripts/boonandbane-inquiries" \
//     -H "Authorization: Bearer <cloudflare_api_token>" \
//     -H "Content-Type: application/javascript" \
//     --data-binary "@cloudflare/inquiries-worker.js"
//
// Sender: no-reply@boonandbane.shop (SendGrid Domain Authentication verified 2026-09-22).
// Reply-To: boonandbaneshop@gmail.com (so replies land in Ari's real inbox).
//
// SENDGRID_API_KEY is a Cloudflare "secret" attached to this Worker (not stored in
// this file or this repo, since the repo is public). It shows up below as a bare
// global variable because Cloudflare injects secrets that way for this older
// "service worker" script format. To set/rotate it:
//   curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<account_id>/workers/scripts/boonandbane-inquiries/secrets" \
//     -H "Authorization: Bearer <cloudflare_api_token>" \
//     -H "Content-Type: application/json" \
//     -d '{"name":"SENDGRID_API_KEY","text":"<sendgrid_key>","type":"secret_text"}'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only accept POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    // Parse the form data
    const formData = await request.formData();
    const customerName = formData.get('name');
    const customerEmail = formData.get('email');
    const customerPhone = formData.get('phone');
    const cartItems = formData.get('items');

    // Validate required fields: name and items always required; at least one of email/phone
    if (!customerName || !cartItems || (!customerEmail && !customerPhone)) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Parse the items
    let items;
    try {
      items = JSON.parse(cartItems);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid items data' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Build the email content
    let itemsHtml = items.map(item =>
      `<li>${item.name} × ${item.qty} - $${(item.price * item.qty).toFixed(2)}</li>`
    ).join('');

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const emailBody = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; }
      .container { max-width: 600px; margin: 0 auto; }
      .header { background: #2a2a2a; color: #fff; padding: 20px; }
      .content { padding: 20px; }
      .items { margin: 20px 0; }
      .footer { background: #f5f5f5; padding: 10px; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Inquiry from The Eclectic Boon &amp; Bane</h2>
      </div>
      <div class="content">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail || '(not provided)'}</p>
        <p><strong>Phone:</strong> ${customerPhone || '(not provided)'}</p>

        <h3>Items Inquired About</h3>
        <ul class="items">
          ${itemsHtml}
        </ul>

        <p><strong>Total Value:</strong> $${totalPrice.toFixed(2)}</p>

        <hr />
        <p>Reply to the customer directly at ${[customerEmail, customerPhone].filter(Boolean).join(' or ')} to discuss the purchase and payment options.</p>
      </div>
      <div class="footer">
        <p>This inquiry was submitted from boonandbane.shop</p>
      </div>
    </div>
  </body>
</html>
    `;

    // Send email to Ari (SENDGRID_API_KEY is a Cloudflare secret, not in this source file)
    const sendgridKey = SENDGRID_API_KEY;
    const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'boonandbaneshop@gmail.com' }],
            subject: `New Inquiry: ${customerName}`,
          },
        ],
        from: { email: 'no-reply@boonandbane.shop', name: 'The Eclectic Boon & Bane' },
        reply_to: { email: 'boonandbaneshop@gmail.com', name: 'The Eclectic Boon & Bane' },
        content: [
          {
            type: 'text/html',
            value: emailBody,
          },
        ],
      }),
    });

    if (!sendgridResponse.ok) {
      const error = await sendgridResponse.text();
      console.error('SendGrid error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Send confirmation email to customer (only if they gave an email address)
    if (customerEmail) {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: customerEmail }],
              subject: 'Your inquiry has been received - The Eclectic Boon & Bane',
            },
          ],
          from: { email: 'no-reply@boonandbane.shop', name: 'The Eclectic Boon & Bane' },
          reply_to: { email: 'boonandbaneshop@gmail.com', name: 'The Eclectic Boon & Bane' },
          content: [
            {
              type: 'text/html',
              value: `
<html>
  <body>
    <h2>Thank you for your interest!</h2>
    <p>Hi ${customerName},</p>
    <p>We've received your inquiry and will be in touch shortly via email or phone to discuss payment options and delivery.</p>
    <p><strong>Your inquiry details:</strong></p>
    <ul>
      ${itemsHtml}
    </ul>
    <p>Thank you for choosing The Eclectic Boon & Bane.</p>
  </body>
</html>
              `,
            },
          ],
        }),
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Inquiry received' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
