let currentToken = '';

async function auth(type) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const res = await fetch(`/auth/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
        currentToken = data.token;
        document.getElementById('tokenDisplay').innerText = currentToken;
        alert('Успішно!');
    } else {
        alert(data.message || 'Виконано');
    }
}

async function getProducts() {
    const res = await fetch('/products');
    const data = await res.json();
    document.getElementById('output').innerText = JSON.stringify(data, null, 2);
}

async function addProduct() {
    const name = document.getElementById('prodName').value;
    const price = document.getElementById('prodPrice').value;
    const category_id = document.getElementById('prodCatId').value;

    const res = await fetch('/products', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ name, price, category_id })
    });
    if (res.ok) { alert('Додано!'); getProducts(); }
}

async function addReview() {
    const product_id = document.getElementById('revProdId').value;
    const comment = document.getElementById('revText').value;
    const rating = document.getElementById('revRating').value;

    const res = await fetch('/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id, comment, rating })
    });
    if (res.ok) { alert('Відгук додано!'); getProducts(); }
}

async function deleteProduct() {
    const id = document.getElementById('deleteId').value;
    const res = await fetch(`/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${currentToken}` }
    });
    if (res.ok) { alert('Видалено!'); getProducts(); }
}