$(window).on('load', function () {
    $('.js-preloader').fadeOut();
});

$(function () {
//START =================================================One page Scroll
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

    $('html').keydown(function (e) {
        var activeSection = sections.filter('.active');
        var nextSection = activeSection.next();
        var prevSection = activeSection.prev();
        if (e.keyCode === 40) {
            if (nextSection.length) {
                scrollToSection(nextSection.index());
            }
        }
        if (e.keyCode === 38) {
            if (prevSection.length) {
                scrollToSection(prevSection.index());
            }
        }
    });

    $('.js-mouse').on('click', function () {
        var activeSection = sections.filter('.active');
        var nextSection = activeSection.next();
        if (nextSection.length) {
            scrollToSection(nextSection.index());
        }
    });

    $('.wrapper').on('wheel', function (e) {
        var deltaY = e.originalEvent.deltaY;
        var activeSection = sections.filter('.active');
        var nextSection = activeSection.next();
        var prevSection = activeSection.prev();
        if (deltaY > 0) {  //скролл вниз
            if (nextSection.length) {
                scrollToSection(nextSection.index());
            }
        }
        if (deltaY < 0) {  //скролл вверх
            if (prevSection.length) {
                scrollToSection(prevSection.index());
            }
        }
    });
//END ===================================================One page Scroll

//START ===================================================Teachers
    $('.teacher-item').on('mouseover', function () {
        $(this).addClass('active').removeClass('disabled').siblings().removeClass('active').addClass('disabled');
    });
//END ===================================================Teachers

//START ===================================================Menu

    $('.js-menu-icon').on('click', function () {
        $(this).toggleClass('active');
        $('.js-menu').toggleClass('active');
    });

    $('.menu__link').on('click', function () {
        $('.js-menu-icon').removeClass('active');
        $('.js-menu').removeClass('active');
    });

    $('.menu__inactiveField').on('click', function () {
        $('.js-menu-icon').removeClass('active');
        $('.js-menu').removeClass('active');
    });

//END ===================================================Menu

    $('.service__item').on('mouseover', function () {
        var dataAttr = $(this).attr('data-page');
        $(this).parent().find('.bg').removeClass('active');
        $(this).parent().find('.' + dataAttr).addClass('active');
        $(this).parent().find('.service__background').hide();
    });

    $('.service__item').on('mouseleave', function () {
        $(this).parent().find('.service__background').fadeIn(700);
    });


    //START ===================================================Yandex Map

    ymaps.ready(init);
    var myMap;
    var myPlacemark;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [53.348907, 83.554537],
            zoom: 14
        });
        myPlacemark = new ymaps.Placemark([53.348907, 83.554537], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-point.png',
            iconImageSize: [86, 68],
            hintContent: 'Twinkle!'
        });
        myMap.geoObjects.add(myPlacemark);
    }

//END ===================================================Yandex Map


    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 25,
        autoplay: true,
        autoplayTimeout: 6000,
        items: 1
    });
});