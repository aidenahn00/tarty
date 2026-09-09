const popupClose = document.querySelectorAll('.popup-close-script');
const popup = document.querySelector('.popup');
const modal = document.querySelector('.modal');
popupClose.forEach((el)=>{
    el.addEventListener('click', ()=>{
        popup.style.display = 'none';
        modal.style.display = 'none';
    }); 
});