let left = document.getElementById('carousel_left_button');
let right = document.getElementById('carousel_right_button');
let carouselWrapper = document.getElementById('carousel__wrapper');
let carouselBlock = document.getElementById('carousel_block');
let carouselItem = document.getElementsByClassName('carousel_item');
let carouselItemWidth = carouselWrapper.offsetWidth / carouselItem.length;
let carouselItemWidthInvisible = carouselWrapper.offsetWidth - carouselBlock.offsetWidth;
let carouselWrapperMove = 0;


left.onclick = function () {
    console.log(carouselWrapperMove)
    if (carouselWrapperMove < -carouselItemWidthInvisible) {
        carouselWrapperMove = 0;
        carouselWrapper.style.left = carouselWrapperMove + "px";
    } else {
        carouselWrapperMove = carouselWrapperMove - carouselItemWidth;
        carouselWrapper.style.left = carouselWrapperMove + "px";
    }
};

right.onclick = function () {
    console.log(carouselWrapper.offsetWidth)
    if(carouselWrapperMove != 0){
        carouselWrapperMove = carouselWrapperMove + carouselItemWidth;
         carouselWrapper.style.left = carouselWrapperMove + "px";
        console.log(carouselWrapperMove);
    } else {
        carouselWrapperMove = -carouselItemWidthInvisible-1;
        carouselWrapper.style.left = carouselWrapperMove + "px";
    }
}
