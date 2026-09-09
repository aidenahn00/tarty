const popupClose = document.querySelector('.popup-close');
const popup = document.querySelector('.popup');
const modal = document.querySelector('.modal');
popupClose.addEventListener('click', ()=>{
    popup.style.display = 'none';
    modal.style.display = 'none';
});