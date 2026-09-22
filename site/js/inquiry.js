// Inquiry form handler
(function() {
  const WORKER_URL = 'https://boonandbane-inquiries.arianaeadams.workers.dev/';
  const form = document.getElementById('inquiry-form-element');
  const formContainer = document.getElementById('inquiry-form');
  const statusEl = document.getElementById('form-status');

  function showForm() {
    const items = Bag.items();
    if (items.length === 0) {
      formContainer.style.display = 'none';
      return;
    }

    formContainer.style.display = 'block';
  }

  // Show form when bag changes
  document.addEventListener('bagchange', showForm);
  showForm();

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const items = Bag.items();
    if (items.length === 0) {
      statusEl.textContent = 'Please add items to your bag first.';
      statusEl.style.color = 'red';
      return;
    }

    const emailVal = document.getElementById('email').value.trim();
    const phoneVal = document.getElementById('phone').value.trim();
    if (!emailVal && !phoneVal) {
      statusEl.textContent = 'Please give us an email or a phone number so we can reach you.';
      statusEl.style.color = 'red';
      return;
    }

    // Build the item details with product info
    const itemsWithDetails = items.map(bagItem => {
      const product = window.PRODUCTS.find(p => p.id === bagItem.id);
      return {
        id: bagItem.id,
        name: product ? product.name : bagItem.id,
        qty: bagItem.qty,
        price: product ? product.price : 0,
      };
    });

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', emailVal);
    formData.append('phone', phoneVal);
    formData.append('items', JSON.stringify(itemsWithDetails));

    statusEl.textContent = 'Sending inquiry...';
    statusEl.style.color = 'black';

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        statusEl.textContent = '✓ Inquiry sent!';
        statusEl.style.color = 'green';
        form.reset();
        Bag.clear();
        setTimeout(() => {
          window.location.href = 'inquiry-sent.html';
        }, 600);
      } else {
        statusEl.textContent = '✗ Error: ' + (result.error || 'Failed to send');
        statusEl.style.color = 'red';
      }
    } catch (error) {
      console.error('Inquiry error:', error);
      statusEl.textContent = '✗ Network error. Please try again.';
      statusEl.style.color = 'red';
    }
  });
})();
