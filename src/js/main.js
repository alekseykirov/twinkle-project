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

//START ===================================================Pagination
    $('.pagination__link').on('click', function () {
        var parent = $(this).parent();
        var indexPagination = parent.index();
        $('.js-slide.active').removeClass('active');
        $('.js-slide').eq(indexPagination).addClass('active');
        parent.addClass('active').siblings().removeClass('active');
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
    }, 8000);
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

    //TODO доделать фичу чтобы закрывалось меню при нажатии на область вне контейнера с меню
    // $('.js-menu').on('click', function () {
        // $(this).removeClass('active');
        // $('.js-menu').toggleClass('active');
    // });


//END ===================================================Menu

    $('.service__item').on('mouseover', function () {
        var dataAttr = $(this).attr('data-page');
        $(this).parent().addClass(dataAttr);
        $(this).parent().find('.service__background').hide();
    });

    $('.service__item').on('mouseleave', function () {
        var dataAttr = $(this).attr('data-page');
        $(this).parent().find('.service__background').show();
        $(this).parent().removeClass(dataAttr);
    })
});