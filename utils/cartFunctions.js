// Загружаем данные корзины из localStorage или создаем пустую корзину, если данных нет
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
console.log('Текущая корзина при загрузке:', cart);

// Функция для добавления товара в корзину
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${product.name} добавлен в корзину.`, 'success');
    updateCartDisplay();
}

// Функция для обновления отображения корзины (используется на странице cart.html)
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';  // Очищаем содержимое

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Ваша корзина пуста</p>';
    } else {
        let totalPrice = 0;
        cart.forEach((product, index) => {
            const item = document.createElement('div');
            item.innerHTML = `
                <p>${product.name} - ${product.price} ₽</p>
                <button onclick="removeFromCart(${index})">Удалить</button>
            `;
            cartItems.appendChild(item);
            totalPrice += product.price * (product.quantity || 1);
        });
        totalPriceElement.textContent = totalPrice;
    }
}

// Функция для удаления товара из корзины с анимацией
function removeFromCart(index) {
    const itemToRemove = document.querySelectorAll('#cart-items div')[index];
    itemToRemove.style.animation = 'fadeOut 0.4s ease';

    setTimeout(() => {
        cart.splice(index, 1);  // Удаляем товар из массива корзины
        localStorage.setItem('cart', JSON.stringify(cart));  // Обновляем корзину в localStorage
        updateCartDisplay();  // Обновляем отображение корзины
        showNotification(`Товар удалён из корзины.`, 'success');
    }, 400);  // Ждём завершение анимации (400 мс)
}

// Функция для отображения уведомлений
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.className = 'notification';  // Скрываем уведомление
    }, 3000);
}

// Оформление заказа (добавляем проверку на существование элемента checkout)
document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Заказ оформлен!');
            cart = [];  // Очищаем корзину после оформления заказа
            localStorage.setItem('cart', JSON.stringify(cart));  // Очищаем корзину в localStorage
            updateCartDisplay();  // Обновляем отображение корзины
        });
    }

    updateCartDisplay();  // Обновляем корзину при загрузке страницы
});

// Добавление товара в избранное (wishlist)
function addToWishlist(product) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showNotification(`${product.name} добавлен в избранное.`, 'success');
}

// Обработчик отправки формы заказа
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Отменяем стандартное действие отправки формы

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        if (cart.length === 0) {
            alert('Ваша корзина пуста!');
            return;
        }

        const orderDetails = {
            name,
            address,
            phone,
            items: cart,
            totalPrice: totalPriceElement.textContent
        };

        console.log('Детали заказа:', orderDetails);

        alert(`Спасибо, ${name}! Ваш заказ оформлен.\nИтого: ${totalPriceElement.textContent} ₽\nДоставка по адресу: ${address}`);

        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        orderForm.reset();  // Очищаем форму
    });
});
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Инициализация первого слайда
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});



let currentMainImageIndex = 0;  // Индекс текущего главного изображения

// Функция для отображения основного изображения
function showMainImage(index) {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail img');
    currentMainImageIndex = index;

    // Обновляем главное изображение
    mainImage.src = thumbnails[index].src;
}

// Функция для открытия оригинального изображения
function openCurrentOriginal() {
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const hiddenImages = document.querySelectorAll('.hidden-images img');
    
    // Открываем оригинал изображения для текущей миниатюры
    window.open(hiddenImages[currentMainImageIndex].src, '_blank');
}

// Добавляем обработчики для миниатюр
document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => showMainImage(index));
});

// Переход на следующую страницу (эту функцию можно настроить)
function nextPage() {
    alert('Переход на следующую страницу');
}
