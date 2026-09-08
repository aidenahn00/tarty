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
        const favoriteIcon = favoriteButton.querySelector('img');
        if (favoriteIcon) {
            favoriteIcon.src = isActive ? './img/icn-heart-fill.svg' : './img/icn-heart.svg';
            favoriteIcon.alt = isActive ? '찜 해제하기' : '찜하기';
        }
    });

    const cartButton = document.querySelector('a.cart-button');
    const headerCartLink = document.querySelector('.header-actions img[src$="icn-bag.svg"]')?.closest('a');

    cartButton?.addEventListener('click', (event) => {
        event.preventDefault();
        if (!headerCartLink || headerCartLink.querySelector('.cart-notification-dot')) return;

        const dot = document.createElement('span');
        dot.className = 'cart-notification-dot';
        dot.setAttribute('role', 'status');
        dot.setAttribute('aria-label', '장바구니 알림');
        Object.assign(dot.style, {
            position: 'absolute',
            top: 'calc(50% - 10px)',
            left: 'calc(50% + 8px)',
            transform: 'translate(-25%, -75%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#FF3F61',
            pointerEvents: 'none',
            zIndex: '401',
        });
        headerCartLink.style.position = 'relative';
        headerCartLink.appendChild(dot);
    });

    const productTabs = document.querySelectorAll('.product-tabs a');
    const detailSection = document.querySelector('.product-detail-images');

    if (detailSection) {
        const detailContent = Array.from(detailSection.childNodes);
        const detailLabel = detailSection.getAttribute('aria-label') || '상품 상세정보';
        const emptyPanels = {};

        const panelContent = {
            '#reviews': {
                title: '구매평 (0)',
                message: '아직 등록된 구매평이 없습니다.',
            },
            '#questions': {
                title: 'Q&A (0)',
                message: '아직 등록된 문의가 없습니다.',
            },
        };

        Object.entries(panelContent).forEach(([target, content]) => {
            const panel = document.createElement('div');
            const title = document.createElement('h2');
            const message = document.createElement('p');
            title.textContent = content.title;
            message.textContent = content.message;
            Object.assign(panel.style, {
                padding: '0 0 6rem',
                textAlign: 'center',
            });
            title.style.fontWeight = '700';
            message.style.marginTop = '16px';
            panel.append(title, message);
            emptyPanels[target] = panel;
        });

        productTabs.forEach((tab) => {
            tab.setAttribute('aria-controls', detailSection.id);
            if (tab.classList.contains('is-active')) tab.setAttribute('aria-current', 'true');

            tab.addEventListener('click', (event) => {
                const target = tab.getAttribute('href');
                if (target !== '#detail' && !emptyPanels[target]) return;
                event.preventDefault();

                productTabs.forEach((item) => {
                    const active = item === tab;
                    item.classList.toggle('is-active', active);
                    if (active) item.setAttribute('aria-current', 'true');
                    else item.removeAttribute('aria-current');
                });

                if (target === '#detail') {
                    detailSection.replaceChildren(...detailContent);
                    detailSection.setAttribute('aria-label', detailLabel);
                } else {
                    detailSection.replaceChildren(emptyPanels[target]);
                    detailSection.setAttribute('aria-label', panelContent[target].title);
                }
            });
        });
    }

    updatePrice();
});
