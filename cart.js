document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-product-name');
        const productPrice = parseFloat(document.getElementById('product-price').getAttribute('data-price'));
        const productQuantity = parseInt(document.getElementById('product-quantity').value);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.name === productName);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += productQuantity;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: productQuantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirect to the cart page
        window.location.href = 'cart.html';
    });
});

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear the container first
    let total = 0;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
    } else {
        cart.forEach((item,index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>Rs.${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>Rs.${subtotal.toFixed(2)}</td>
                <td> <button class="delete-btn" data-itemIndex=${index}> Remove </button> </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        document.getElementById('total-price').innerText = `Rs.${total.toFixed(2)}`;
    }
    
    deleteItem(); //add a new function for delete item from cart
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout...');
});

if (document.getElementById('cart-items')) {
    renderCart();
}

//delete item function 

function deleteItem(){

    let deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const producIndexNum = btn.getAttribute('data-itemIndex'); 
            //console.log(producIndexNum);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            cart = cart.filter(item => item !== cart[producIndexNum]);

            let total = 0;

            cart.forEach((item,index) => {
                const subtotal = item.price * item.quantity;
                total += subtotal;
            });

            document.getElementById('total-price').innerText = `Rs.${total.toFixed(2)}`;
        
            localStorage.setItem('cart', JSON.stringify(cart));

            renderCart();
        })
    })
}
