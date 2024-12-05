

(function (win) {
    $(function () {
        $(window).scroll(function () {
            var scrollVal = $(this).scrollTop();
            if (scrollVal > 50) {
                $(".box_go_top").removeClass("hide");
            } else {
                $(".box_go_top").addClass("hide");
            }
        });
		// send Cookie
		$(".prompt__button").click(function () {
			$('#sendEighteenForm').submit();
			document.getElementById('prompt').style.display = 'none';
		});
		$(".cookie-consent-button").click(function () {
			$('#sendCookieForm').submit();
			document.getElementsByClassName('cookie-consent').style.display = 'none';
		});

		$(function () {
            $(".language__list a").each(function () {
                $(this).click(function () {
                    var lang = $(this).attr('lang');
                    $('#changeLanguageForm [name=locale]').val(lang);
                    $('#changeLanguageForm').submit();
                });
            });

			//漢堡--執行項目
			function hamburger_active() {
				$(".hamburger").removeClass("flipInY").addClass("flipOutX");
				$(".hamburger_close").show().removeClass("flipOutX").addClass("flipInY");
				$(".main-nav").addClass("main-nav-active");
			}
			//漢堡關閉--執行項目
			function hamburger_close() {
				$(".hamburger").removeClass("flipOutX").addClass("flipInY");
				$(".hamburger_close").removeClass("flipInY").addClass("flipOutX");
				$(".main-nav").removeClass("main-nav-active");
			}
			//點擊--漢堡
			$(".hamburger").on("click", hamburger_active);
			//點擊--漢堡關閉
			$(".hamburger_close").on("click", hamburger_close);
			//點擊--漢堡選項
			$(".container li").on("click", hamburger_close);

			$('ul.select-options li').click(function (e) {
				var type = $(this).val();
                removeAllGames();
                showGames(type);
			});

			$(".gamenav__list .btn .btn-type").on("click", function (event, param1) {
				$(".gamenav__list .btn .btn-type").each(function () {
					$(this).removeClass('btn-type-select');
					$(this).removeClass('active');
				});
				var type = $(this).attr('value');
				if (param1 !== undefined) {
					type = param1
				}
                changeGameTypeTitleText(type);
                removeAllGames();
                showGames(type);
			});

            var changeGameTypeTitleText = function (type) {
                $('.gameTypeTitle[type]').hide();
                $('.gameTypeTitle[type=' + type + ']').show();
                if (window.matchMedia('(max-width: 812px)').matches) {
                    $('.gameTypeTitle[type]').hide();
                }
            }

			var removeAllGames = function () {
				$('.gameTypeBlock').each(function () {
					$(this).hide();
				});
                $(".btn").removeClass("active");
			}

            var showLoadingMask = function () {
                $('.loading-mask').fadeIn();
            }
            
            var hideLoadingMask = function () {
                $('.loading-mask').fadeOut();
            }

            var showGames = function (type) {                
                $('.gameTypeBlock[type=' + type + ']').show();
                $(".btn-" + type).addClass("active");
				document.cookie = 'gameType=' + type;
			}

            var init = function () {
                const urlParams = new URLSearchParams(window.location.search);
                const type = urlParams.get('type');
                if (type) {
                    removeAllGames();
                    showGames(type);
                }
            };

            init();
		});
		//accordion
		(function ($) {
			$('.accordion > li:eq(0) a').addClass('active').next().addClass('active');

			$('.accordion a').click(function (j) {
				var dropDown = $(this).closest('li').find('.panel');

				$(this).closest('.accordion').find('.panel').not(dropDown).removeClass('active');
				$(this).closest('.accordion').find('a.active').removeClass('active');
				$(this).addClass('active');

				dropDown.stop(false, true).addClass('active');

				j.preventDefault();
			});
		})(jQuery);
		function detectOrient() {
			var obj = $(".advertise .swiper-slide img");
			obj.each(function () {
				if (window.innerHeight >= window.innerWidth) {
					$(this).attr('src', $(this).attr('data-tSrc'));
				} else {
					$(this).attr('src', $(this).attr('data-src'));
				}
			})
		}
		detectOrient();
		window.addEventListener('resize', detectOrient);
		window.addEventListener('orientationchange', detectOrient);
		//swiper
		var swiper = new Swiper(".ourUnique__swiper .swiper, .ourService__swiper .swiper, .ourVision__swiper .swiper", {
			pagination: {
				el: '.swiper-pagination',
                clickable: true,
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    var out = ''
                    for (i = 1; i < total+1; i++) {
                        if (i == current) {
                            out = out + '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex='+i+' role="button" aria-label="Go to slide '+i+1+'"></span>';
                        }
                        else {
                            out = out + '<span class="swiper-pagination-bullet" tabindex='+i+' role="button" aria-label="Go to slide '+i+1+'"></span>';
                        }
                    };
                    return out;
                },
			},
		});
		var swiper = new Swiper(".advertise__swiper .swiper", {
			loop: true,
            speed: 1300,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
		// var swiper = new Swiper(".swiper", {
		// 	pagination: {
		// 		el: ".swiper-pagination",
		// 		clickable: true,
		// 	},
		// });
		$(function () {
			$(".gamesExhibit__list").on("click", "li", function () {
				$(".gamesExhibit__list li").find('.info').removeClass("active");
				$(this).find('.info').toggleClass("active");
			});
		});

        $(document).ready(function () {
			$('.panel').hover(function () {
				$(this).addClass('flip');
			}, function () {
				$(this).removeClass('flip');
			});
		});
	});
})(window);