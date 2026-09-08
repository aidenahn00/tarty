document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.event-tabs button');
    const cards = document.querySelectorAll('.event-card');
    const emptyMessage = document.querySelector('.event-empty');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((item) => {
                const active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', String(active));
            });
            let visibleCount = 0;
            cards.forEach((card) => {
                const visible = card.dataset.status === tab.dataset.status;
                card.hidden = !visible;
                if (visible) visibleCount += 1;
            });
            emptyMessage.hidden = visibleCount > 0;
            document.querySelector('.event-grid-list').style.display = 'none';
            
        });
    });

    tabs[0].addEventListener('click', ()=>{
        document.querySelector('.event-grid-list').style.display = 'grid';
    });

});
