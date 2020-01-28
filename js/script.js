main = {
    slider: function() {
        let left = document.getElementById('carousel_left_button');
        let right = document.getElementById('carousel_right_button');
        let carouselWrapper = document.getElementById('carousel__wrapper');
        let carouselBlock = document.getElementById('carousel_block');
        let carouselItem = document.getElementsByClassName('carousel_item_top');
        let item = carouselBlock.querySelector('.carousel_item_top');
        let itemWidth = item.clientWidth;
        let carouselBlockWidth = carouselBlock.clientWidth;
        let leftPercent = 0;
        let coordinatesDown = 0;
        let coordinatesUp = 0;
        let coordinatesResult = 0;
        let coordinatesMove = 0;
        let mouseDown = false;
        let mouseMove = false;
        let moveLeft = 0;
        let touchDevice = ('ontouchstart' in document.documentElement);
        let down = 'mousedown';
        let up = 'mouseup';
        let move = 'mousemove';
        let percentItem = 100 / Math.round(carouselBlockWidth/itemWidth);
        let dropdownMenu = document.getElementById('dropdown_menu_header');
        let dropdownMenuItems = dropdownMenu.getElementsByTagName('a');
        let openChecked = document.getElementById('open');

        function checked(){
            if(openChecked.checked == false){
                openChecked.checked = true
            } openChecked.checked = false
        };

        for (let dropdownMenuItem of dropdownMenuItems ){
            dropdownMenuItem.addEventListener('click', function () {
                let firstVisibleItem = (Math.abs(leftPercent)/Math.abs(percentItem)) + 1;
                let dropdownMenuItemsArr = Array.from(dropdownMenuItems);
                let indexActiveItemMenu = (dropdownMenuItemsArr.indexOf(this, 0))+1;
                let indexMove = ((indexActiveItemMenu - firstVisibleItem)*Math.abs(percentItem)) * -1;
                leftPercent = leftPercent + indexMove;
                checked();
                setTimeout(function () {
                    carouselWrapper.style.left = leftPercent + '%';
                },500)

                let carouselItemArr = Array.from(carouselItem);
                let activeItemCarousel = carouselItemArr[indexActiveItemMenu-1]

                for (let i=0; i<carouselItemArr.length; i++){
                    carouselItemArr[i].classList.remove('active')
                }
                activeItemCarousel.classList.add('active');

            })
        }



        // dropdownMenu.addEventListener('click', function () {
        //
        // })
        checked();

        window.addEventListener('resize', function () {
            itemWidth = item.clientWidth;
            carouselBlockWidth = carouselBlock.clientWidth;
            percentItem = 100 / Math.round(carouselBlockWidth/itemWidth);
            leftPercent = 0;
            carouselWrapper.style.left = leftPercent + '%';

        })

        if (touchDevice) {
            down = 'touchstart';
            up = 'touchend';
            move = 'touchmove';
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
            mouseMove = false;
            moveLeft = leftPercent;
            return coordinatesDown;
        });

        window.addEventListener(up, event => {
            if (mouseDown) {
                let percentAllItem = percentItem * carouselItem.length;
                if (touchDevice) {
                } else {
                    coordinatesUp = event.x;
                }
                coordinatesResult = coordinatesDown - coordinatesUp
                mouseDown = false;

                if(mouseMove){
                    leftPercent = (leftPercent + moveLeft) * -1;
                }

                if (Math.round(percentAllItem - 100) < (Math.round(leftPercent)) * -1) {
                    leftPercent = (percentAllItem - 100) * -1;
                    carouselWrapper.style.left = leftPercent + '%';
                } else if ((Math.round(leftPercent)) * -1 < 0) {
                    leftPercent = 0;
                    carouselWrapper.style.left = leftPercent + '%';
                } else
                    carouselWrapper.style.left = leftPercent + '%';
            }

        });

        carouselBlock.addEventListener(move, function (event) {
            if (mouseDown) {

                if (touchDevice) {
                    coordinatesMove = event.touches[0].clientX;
                } else {
                    coordinatesMove = event.x;
                }
                mouseMove = true;
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
    scroll: function(){
        let dropdownMenu = document.getElementById('dropdown_menu_header');
        let anchors = dropdownMenu.querySelectorAll('a[href*="#"]');
        for (let anchor of anchors) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()

                let blockID = anchor.getAttribute('href').substr(1)
                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            })
        }

    },
    init: function () {
        this.slider();
        this.scroll();
    },
}

document.addEventListener('DOMContentLoaded', function () {
    main.init();
})