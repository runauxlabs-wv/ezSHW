$(document).ready(function () {
    //패밀리사이트
    var bt = document.querySelector('#site_select');
    var wrap = document.querySelector('.family_wrap');
    function createEle() {
        wrap.classList.toggle('on');
        return false;
    }
    bt.addEventListener('click', createEle);

    //섹션2 탭구조
    $(".tab > ul > li").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $("#" + $(this).data("id")).addClass("on").siblings().removeClass("on");
        return false;
    });
    $(".conbox").mouseleave(function () {
        $(this).removeClass("on");
        $(".tab > ul > li").removeClass("on");
    });

    //하단 계열사 로고
    $(".ch_box.tving").hover(function () {
        $(".txt_hover1").toggleClass("on");
    });
    $(".ch_box.mnet").hover(function () {
        $(".txt_hover2").toggleClass("on");
    });
    $(".ch_box.ocn").hover(function () {
        $(".txt_hover3").toggleClass("on");
    });
    $(".ch_box.toon").hover(function () {
        $(".txt_hover4").toggleClass("on");
    });



    //뉴스룸 롤링
    var ticker = function () {
        setTimeout(function () {
            $('.news_sub a:first-child').animate({ marginTop: '-28px' }, 400, function () {
                $(this).detach().appendTo('.news_sub').removeAttr('style');
            });
            ticker();
        }, 3000);
    };
    ticker();

    //뉴스룸 버튼
    $(".pre_arrow").click(function () {
        $(".news_sub a:first-child").animate({ "margin-Top": "-28px" }, 400, function () {
            $(this).detach().appendTo('.news_sub');
        });
    });
    $(".next_arrow").click(function () {
        $(".news_sub a:first-child").animate({ "margin-Top": "28px" }, 400, function () {
            $(this).detach().appendTo('.news_sub');
        });
    });

    //nav 전체 내려오는 sub
    $(".nav > li > ul").hide();
    $(".nav > li").click(function () {
        $(this).children("ul").stop().slideToggle();
        $(".nav > li").not(this).children("ul").slideUp();
    });


    // 최초시작 모바일
    if ($(window).width() < 767) {
        //하단 사이트맵
        $(".map > li > ul").hide();
        $(".map > li").click(function () {
            $(this).children("ul").stop().slideToggle();
            $(".map > li").not(this).children("ul").slideUp();
        });
        //nav 열고닫기
        $(".mmenu").click(function () {
            $("header").addClass("on");
        });
        $(".mclose").click(function () {
            $("header").removeClass("on");
        });
        //nav-ul아코디언
        $("header.on .nav_bot .nav > li > ul").hide();
        $("header.on .nav_bot .nav > li").click(function () {
            $(this).children("ul").stop().slideToggle();
            $("header.on .nav_bot .nav > li").not(this).children("ul").slideUp();
        });
        //섹션3 애니메이션 기본뜨기
        $('.ir_txt').addClass('ir_txtfade');
    }

    //섹션3 애니메이션 딜레이
    $(document).scroll(function () {
        $('.ir_txt').each(function () {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {
                $(this).addClass('ir_txtfade');
            }
            if (bottom_of_window < bottom_of_object) {
                $(this).removeClass('ir_txtfade');
            }
        });
    });

    // 리사이징 변동성 여부들
    $(window).resize(function () {
        // pc
        if ($(window).width() > 766) {
            $(".map > li > ul").show();
        }
        // 모바일
        else if ($(window).width() < 767) {
            //하단 사이트맵
            $(".map > li > ul").hide();
            $(".map > li").click(function () {
                $(this).children("ul").stop().slideToggle();
                $(".map > li").not(this).children("ul").slideUp();
            });
            //nav 열고닫기
            $(".mmenu").click(function () {
                $("header").addClass("on");
            });
            $(".mclose").click(function () {
                $("header").removeClass("on");
            });
            //nav-ul아코디언
            $("header.on .nav_bot .nav > li > ul").hide();
            $("header.on .nav_bot .nav > li").click(function () {
                $(this).children("ul").stop().slideToggle();
                $("header.on .nav_bot .nav > li").not(this).children("ul").slideUp();
            });
        }
    });

});