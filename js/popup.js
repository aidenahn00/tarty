const popupClose = document.querySelectorAll('.popup-close-script');
const popup = document.querySelector('.popup');
const modal = document.querySelector('.modal');
const benefitBar = document.querySelector('.benefit-bar');
popupClose.forEach((el)=>{
    el.addEventListener('click', ()=>{
        popup.style.display = 'none';
        modal.style.display = 'none';
    }); 
});
benefitBar.addEventListener('click', el=>{
    el.preventDefault();
    popup.style.display = 'block';
    modal.style.display = 'block';
});