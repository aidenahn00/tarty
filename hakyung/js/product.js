document.addEventListener('DOMContentLoaded', () => {
    const unitPrice = 4500;
    const mainImage = document.querySelector('#product-main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const quantityValue = document.querySelector('.quantity-value');
    const linePrice = document.querySelector('.line-price');
    const totalPrice = document.querySelector('.total-price');
    const minusButton = document.querySelector('.quantity-minus');
    const plusButton = document.querySelector('.quantity-plus');
    const shareButton = document.querySelector('.share-button');
    const favoriteButton = document.querySelector('.favorite-button');
    let quantity = 1;

    const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`;
    const updatePrice = () => {
        const price = unitPrice * quantity;
        quantityValue.value = quantity;
        quantityValue.textContent = quantity;
        linePrice.textContent = formatPrice(price);
        totalPrice.textContent = formatPrice(price);
        minusButton.disabled = quantity === 1;
    };

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach((item) => item.classList.remove('is-active'));
            thumbnail.classList.add('is-active');
            mainImage.src = thumbnail.dataset.image;
        });
    });

    minusButton.addEventListener('click', () => {
        quantity = Math.max(1, quantity - 1);
        updatePrice();
    });

    plusButton.addEventListener('click', () => {
        quantity += 1;
        updatePrice();
    });

    shareButton.addEventListener('click', async () => {
        if (navigator.share) {
            await navigator.share({ title: document.title, url: window.location.href });
            return;
        }

        await navigator.clipboard?.writeText(window.location.href);
        shareButton.setAttribute('aria-label', '상품 주소가 복사되었습니다');
    });

    favoriteButton.addEventListener('click', () => {
        const isActive = favoriteButton.classList.toggle('is-active');
        favoriteButton.setAttribute('aria-pressed', String(isActive));
        favoriteButton.setAttribute('aria-label', isActive ? '찜 해제하기' : '찜하기');
    });

    updatePrice();
});
