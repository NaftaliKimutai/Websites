$(function () {
    $('.switch').toggle(function () {
        $('.QRcodeSlide .content, .switch').addClass('action');
    }, function () {
        $('.QRcodeSlide .content, .switch').removeClass('action');
    });
    if (screen.width >= 576) {
        $('.gamesExhibit__search').on("click", function () {
            $('.gamesExhibit__search input').toggleClass('action');
        });
    }
    if (screen.width < 576) {
        $('.gamesExhibit__search').on("click", function () {
            $('.gamesExhibit__search, .gamesExhibit__searchbar').toggleClass('action');
        });
    }
});
function getIsFullScreen() {
    var defaultFullscreen = typeof document.fullscreenElement != 'undefined' && document.fullscreenElement != null;
    var mozFullscreen = typeof document.mozFullScreenElement != 'undefined' && document.mozFullScreenElement != null;
    var webkitFullscreen = typeof document.webkitFullscreenElement != 'undefined' && document.webkitFullscreenElement != null;
    var msFullscreen = typeof document.msFullscreenElement != 'undefined' && document.msFullscreenElement != null;
    return (defaultFullscreen || mozFullscreen || webkitFullscreen || msFullscreen);
}
function exitFullscreens() {


    var isFullScreen = getIsFullScreen();
    if (isFullScreen) {
        $('div').removeClass('fullscreen');
        document.exitFullscreen();
    } else {
        var url = $('#gamesUrl').val();
        location.href = url;
    }

}
function fullscreen() {
    // check if fullscreen mode is available
    var isFullScreen = getIsFullScreen();
    if (isFullScreen) {
        exitFullscreens();
        return;
    }
    $(".game-details__iframe").toggleClass("fullscreen");
    if (document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled) {

        // which element will be fullscreen
        var iframe = document.querySelector('.game-details__iframe');
        // Do fullscreen
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    } else {
        document.querySelector('.error').innerHTML = 'Your browser is not supported';
    }
}



function doSearch(keyWord) {
    $(".gamesBox--title").each(function () {
        var isFind = searchKeyWord(keyWord, $(this).text());
        if (isFind) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}
function searchKeyWord(keyWord, valWord) {
    if (keyWord.length == 0) {
        return true;
    }
    result = valWord.indexOf(keyWord);
    if (result >= 0) {
        return true;
    }
    return false;
}
function clearKeyword() {
    doSearch("");
}
//
//================= 頁面捲動事件 =================
$(window).scroll(function () {
    var scrollVal = $(this).scrollTop();
    if (scrollVal > 50) {
        $(".navbar").addClass("scroll");
        $(".box_go_top").removeClass("hide");
    } else {
        $(".navbar").removeClass("scroll");
        $(".box_go_top").addClass("hide");
    }
});
//================= 登入區塊控制_開始 =================

$(function () {
    //漢堡--執行項目
    function hamburger_active() {
        $(".hamburger").toggleClass("flipInY").toggleClass("flipOutX");
        $(".hamburger").toggleClass("hamburger-close");
        $(".navbar__main--list").toggleClass("active");
    }

    //點擊--漢堡
    $(".hamburger, .navbar__main--list li").on("click", hamburger_active);

    $(".cookie-consent-button").on("click", function () {
        $(".cookie-consent").hide();
    });
    $(".prompt__button").on("click", function () {
        $(".prompt").hide();
    });

});
$(function () {
    $(".wrapper").on("click", function () {
        $(".language,.sub-menus").removeClass("active");
    });
    $(".language,.sub-menus").click(function (e) {
        e.stopPropagation();
    });
    $(".language,.sub-menus").on("click", function () {
        $(".language,.sub-menus").not(this).removeClass("active");
        $(this).toggleClass("active");
    });
});
var swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
$(window).on('scroll', function () {
    if (screen.width >= 812) {
        var scrollVal = $(document).scrollTop();
        if (330 < scrollVal) {
            $('#gamenav').addClass("scroll");
        } else {
            $('#gamenav').removeClass("scroll");
        }
    }
    if (screen.width >= 1024) {
        var scrollVal = $(document).scrollTop();
        if (400 < scrollVal) {
            $('#gamenav').addClass("scroll");
        } else {
            $('#gamenav').removeClass("scroll");
        }
    }
});
$('select').each(function () {
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});
$(function () {
    $(".gamesExhibit__list").on("mouseover", "li", function () {
        $(this).find('.info').addClass("active");
    });
    $(".gamesExhibit__list").on("mouseout", "li", function () {
        $(this).find('.info').removeClass("active");
    });
    function search() {
        if (window.innerWidth >= 576) {
            $('.gamesExhibit__search').on("click", function () {
                $('.gamesExhibit__search input').toggleClass('action');
            });
        } else if (window.innerWidth < 576) {
            $('.gamesExhibit__search').on("click", function () {
                $('.gamesExhibit__search, .gamesExhibit__searchbar').toggleClass('action');
            });
        }
    }
    // search();
    window.addEventListener('resize', search);
});
$(function () {
    var url = location.href;
    switch (true) {
        case url.indexOf('our-unique') > -1:
            $(".navbar__main--list li#our-unique").addClass("active");
            break;
        case url.indexOf('games') > -1:
            $(".navbar__main--list li#games").addClass("active");
            break;
        case url.indexOf('partners') > -1:
            $(".navbar__main--list li#partners").addClass("active");
            break;
        case url.indexOf('news') > -1:
            $(".navbar__main--list li#news").addClass("active");
            break;
        case url.indexOf('clienthub') > -1:
            $(".navbar__main--list li#clienthub").addClass("active");
            break;
        case url.indexOf('company') > -1:
            $(".navbar__main--list li#company").addClass("active");
            break;
    }

    switch (true) {
        case url.indexOf('triluck') > -1:
            $(".sub-menus__list a#triluck").addClass("active");
            break;
        case url.indexOf('clients') > -1:
            $(".sub-menus__list a#clients").addClass("active");
            break;
        case url.indexOf('media-partners') > -1:
            $(".sub-menus__list a#media-partners").addClass("active");
            break;
        case url.indexOf('affiliate') > -1:
            $(".sub-menus__list a#affiliate").addClass("active");
            break;
    }
});
$(function () {
    var isClick = true;
    $("#btn-subscribe,#btn-subscribe-mobile").click(function() {
        if (isClick) {
            ifClick = false;
            setTimeout(() => {
                isClick = true;
            }, 5000);
            $("#subscribeEmail").submit();
        }
    });
    $('#subscribeEmail').on('submit', function (e) {
        if (!$('#agree').is(':checked') || !$('#agree3').is(':checked')) {
            e.preventDefault();
            alert('Please agree to the terms and conditions.');
            return;
        }
        var eamil = $('#subscribeEmail input[name="email"]').val();
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(eamil)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }
    });
});
$(function () {
    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('scroll') === 'subscription') {
        var target = $('#footer-subscription');
        if (target.length) {
            var checkInterval = setInterval(function() {
                if (target.find('img').length === 0 || target.find('img').get().every(img => img.complete)) {
                    // 清除定時器，並執行滾動操作
                    clearInterval(checkInterval);
                    var scrollPosition = target.offset().top - 70;
                    $(window).scrollTop(scrollPosition);
                }
            }, 100); // 每100毫秒檢查一次
        }
    }
});