document.addEventListener('DOMContentLoaded', function () {

    // 獲取整個輪播組件的根元素，作為所有查詢的起點
    const projectExp = document.querySelector('#project_exp');

    const dotsContainer = projectExp.querySelector('.carousel');
    const dots = projectExp.querySelectorAll('.carousel .dot');

    dotsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('dot')) {
            const targetIndex = parseInt(event.target.dataset.index);
            goToSlide(targetIndex);
        }
    });

    /**
     * 換頁的核心函式
     * @param {number} index 要切換到的頁面索引
     */
    function goToSlide(index) {

        // 移除舊的 dot.active (只在 .project_exp .carousel 裡尋找)
        // 尋找：.project_exp .carousel .dot.active
        const currentDot = projectExp.querySelector('.carousel .dot.active');
        if (currentDot) currentDot.classList.remove('active');
        dots[index].classList.add('active');

        const distanceToMove = index * 50;
        const sliderContent = document.querySelector('.slide');

        // 使用負值來實現向左移動
        sliderContent.style.transform = `translateX(-${distanceToMove}%)`;
    }
});