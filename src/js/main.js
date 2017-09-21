$(window).on('load', function() {
    $('.js-preloader').fadeOut();
});

$(function () {


//START ===================================================One page Scroll
    var sections = $('.page'),
        display = $('.main-content');
    inScroll = false;

    var scrollToSection = function (sectionEq) {
        var position = 0;
        if (!inScroll) {
            inScroll = true;
            position = (sections.eq(sectionEq).index() * -100) + '%';
            sections.eq(sectionEq).addClass('active').siblings().removeClass('active');
            display.css({'transform': 'translate3d(0, ' + position + ', 0)'});
            setTimeout(function () {
                inScroll = false;
                $('.fixed-menu__item').eq(sectionEq).addClass('active').siblings().removeClass('active');
            }, 1300)
        }
    };

    $('.wrapper').on('wheel', function (e) {
        var deltaY = e.originalEvent.deltaY,
            activeSection = sections.filter('.active'),
            nextSection = activeSection.next(),
            prevSection = activeSection.prev();
        if (deltaY > 0) {  //скролл вниз
            if (nextSection.length) {
                scrollToSection(nextSection.index());
            }
        }
        if (deltaY < 0) {  //скролл вниз
            if (prevSection.length) {
                scrollToSection(prevSection.index());
            }
        }
    });
//END ===================================================One page Scroll

//START ===================================================Pagination
    $('.pagination__link').on('click', function () {
        var parent = $(this).parent();
        var indexPagination = parent.index();
        $('.js-slide.active').removeClass('active');
        $('.js-slide').eq(indexPagination).addClass('active');
        parent.addClass('active').siblings().removeClass('active');
    });

    $('.pagination__arrow_left').on('click', function () {
        var elem = $('.pagination__item.active');
        var indexElem = elem.index();
        if (indexElem == 0) {
            elem.removeClass('active');
            $('.pagination__item').eq(2).addClass('active');
            $('.js-slide.active').removeClass('active');
            $('.js-slide').eq(2).addClass('active');
        } else {
            elem.removeClass('active').prev().addClass('active');
            $('.js-slide.active').removeClass('active').prev().addClass('active');
        }
    });

    $('.pagination__arrow_right').on('click', function () {
        var elem = $('.pagination__item.active');
        var indexElem = elem.index();
        if (indexElem == 2) {
            elem.removeClass('active');
            $('.pagination__item').eq(0).addClass('active');
            $('.js-slide.active').removeClass('active');
            $('.js-slide').eq(0).addClass('active');
        } else {
            elem.removeClass('active').next().addClass('active');
            $('.js-slide.active').removeClass('active').next().addClass('active');
        }
    });

    setInterval(function () {
        var activeSlide = $('.js-slide.active');
        var activePagination = $('.pagination__item.active');
        var indexElem = activeSlide.index();
        if (indexElem == 2) {
            activeSlide.removeClass('active');
            $('.js-slide').eq(0).addClass('active');
            activePagination.removeClass('active');
            $('.pagination__item').eq(0).addClass('active');
        } else {
            activeSlide.removeClass('active').next().addClass('active');
            activePagination.removeClass('active').next().addClass('active');
        }
    }, 7000);
//END ===================================================Pagination

//START ===================================================Teachers
    $('.teacher-item').on('mouseover', function () {
        $(this).addClass('active').removeClass('disabled').siblings().removeClass('active').addClass('disabled');
    });
//END ===================================================Teachers

//START ===================================================Yandex Map

    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [53.348907, 83.554537],
            zoom: 14
        });
        myPlacemark = new ymaps.Placemark([53.348907, 83.554537], {
            hintContent: 'Twinkle!',
            balloonContent: 'Столица России'
        });
        myMap.geoObjects.add(myPlacemark);
    }
//END ===================================================Yandex Map

//START ===================================================Menu

    $('.js-menu-icon').on('click', function () {
        $(this).toggleClass('active');
        $('.js-menu').toggleClass('active');
    });
//END ===================================================Menu

});