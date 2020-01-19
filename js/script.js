Main = {
    slider : function () {
        let left = document.getElementById('carousel_left_button');
        let right = document.getElementById('carousel_right_button');
        let carouselWrapper = document.getElementById('carousel__wrapper');
        let carouselBlock = document.getElementById('carousel_block');
        let carouselItem = document.getElementsByClassName('carousel_item_top');
        let percentItem;
        let leftPercent;


        function percent() {
            if (carouselBlock.offsetWidth > 920) {
                return percentItem = 20;
            } else if (carouselBlock.offsetWidth <= 920 && carouselBlock.offsetWidth > 738) {
                return percentItem = 25;
            } else if (carouselBlock.offsetWidth <= 738 && carouselBlock.offsetWidth > 546) {
                return percentItem = 33.33;
            } else if (carouselBlock.offsetWidth <= 546 && carouselBlock.offsetWidth > 360) {
                return percentItem = 50;
            } else if (carouselBlock.offsetWidth < 360) {
                return percentItem = 100;
            }
        }

        function leftFunction() {
            leftPercent = 0;
            return function () {
                leftPercent = leftPercent - percentItem;
                carouselWrapper.style.left = leftPercent + "%";
            }
        }

        let leftMove = leftFunction();

        function rightFunction() {
            return function () {
                leftPercent = leftPercent + percentItem;
                carouselWrapper.style.left = leftPercent + "%";
            }
        }

        let rightMove = rightFunction();

        left.onclick = function () {
            percent();
            let leftPercentPositive = leftPercent * -1;
            let percentAllItem = percentItem * carouselItem.length;
            if (leftPercentPositive >= (percentAllItem - 100)) {
                leftPercent = 0;
                carouselWrapper.style.left = leftPercent + "%";
            } else {
                leftMove();
            }
        }

        right.onclick = function () {
            percent();
            let percentAllItem = percentItem * carouselItem.length;
            if (Math.round(leftPercent) == 0) {
                leftPercent = (percentAllItem - 100) * -1;
                carouselWrapper.style.left = leftPercent + "%";
            } else {
                rightMove();
            }
        }
            },
    init: function () {
        this.slider();
    },
}

document.addEventListener('DOMContentLoaded', function () {
    Main.init();
})