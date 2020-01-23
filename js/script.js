main = {
    slider: function () {
        let left = document.getElementById('carousel_left_button');
        let right = document.getElementById('carousel_right_button');
        let carouselWrapper = document.getElementById('carousel__wrapper');
        let carouselBlock = document.getElementById('carousel_block');
        let carouselItem = document.getElementsByClassName('carousel_item_top');
        let percentItem = 0;
        let leftPercent = 0;
        let coordinatesDown = 0;
        let coordinatesUp = 0;
        let coordinatesResult = 0;
        let coordinatesMove = 0;
        let mouseDown = false;
        let moveLeft = 0;
        let touchDevice = ('ontouchstart' in document.documentElement);
        let down = 'mousedown';
        let up = 'mouseup';
        let move = 'mousemove';

        if (touchDevice) {
            down = 'touchstart';
            up = 'touchend';
            move = 'touchmove';
        }

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
            return function () {
                if (leftPercent > 0) {
                    leftPercent = leftPercent * -1
                }

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
            let leftPercentPositive = leftPercent;
            if (leftPercent < 0) {
                leftPercentPositive = leftPercent * -1;
            }
            let percentAllItem = percentItem * carouselItem.length;
            if (leftPercentPositive >= (percentAllItem - 100)) {
                leftPercent = 0;
                carouselWrapper.style.left = leftPercent + "%";
            } else {
                leftMove();
            }
        };

        right.onclick = function () {
            percent();
            if (leftPercent > 0) {
                leftPercent = leftPercent * -1;
            }
            let percentAllItem = percentItem * carouselItem.length;
            if (Math.round(leftPercent) == 0) {
                leftPercent = (percentAllItem - 100) * -1;
                carouselWrapper.style.left = leftPercent + "%";
            } else {
                rightMove();
            }
        };

        carouselBlock.addEventListener(down, event => {

            if (touchDevice) {
                coordinatesDown = event.touches[0].clientX;
            } else {
                coordinatesDown = event.x;
            }

            mouseDown = true;
            moveLeft = leftPercent;
            return coordinatesDown;
        });

        window.addEventListener(up, event => {
            if (mouseDown) {
                percent();
                let percentAllItem = percentItem * carouselItem.length;
                if (touchDevice) {
                } else {
                    coordinatesUp = event.x;
                }
                coordinatesResult = coordinatesDown - coordinatesUp
                mouseDown = false;
                leftPercent = leftPercent + moveLeft;
                if (Math.round(percentAllItem - 100) < Math.round(leftPercent)) {
                    leftPercent = percentAllItem - 100;
                    carouselWrapper.style.left = leftPercent * -1 + '%';
                } else if (Math.round(leftPercent) < 0) {
                    leftPercent = 0;
                    carouselWrapper.style.left = leftPercent * -1 + '%';
                } else
                    carouselWrapper.style.left = leftPercent * -1 + '%';
            }
        });

        carouselBlock.addEventListener(move, function (event) {
            if (mouseDown) {
                percent();
                if (touchDevice) {
                    coordinatesMove = event.touches[0].clientX;
                } else {
                    coordinatesMove = event.x;
                }
                let resultTemp = coordinatesDown - coordinatesMove;
                if (resultTemp < 0 && resultTemp >= -200) {
                    moveLeft = percentItem * -1;
                } else if (resultTemp < -200 && resultTemp >= -400) {
                    moveLeft = (2 * percentItem) * -1;
                } else if (resultTemp < -400) {
                    moveLeft = (3 * percentItem) * -1;
                } else if (resultTemp >= 0 && resultTemp <= 200) {
                    moveLeft = percentItem;
                } else if (resultTemp > 200 && resultTemp <= 400) {
                    moveLeft = 2 * percentItem;
                } else if (resultTemp > 400) {
                    moveLeft = 3 * percentItem;
                }
                if (leftPercent < 0) {
                    leftPercent = leftPercent * -1;
                }
                carouselWrapper.style.left = (leftPercent + moveLeft) * -1 + '%';

            }
        })
    },

    init: function () {
        this.slider();
    },
}

document.addEventListener('DOMContentLoaded', function () {
    main.init();
})