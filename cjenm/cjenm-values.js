//nav 전체 내려오는 sub
$(".nav > li > ul").hide();
$(".nav > li").click(function(){
    $(this).children("ul").stop().slideToggle();
    $(".nav > li").not(this).children("ul").slideUp();
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
//탭구조
$(".tab > ul > li").click(function() {
    $(this).addClass('on')
        .siblings().removeClass('on');
    $("#" + $(this).data('id')).addClass('on')
        .siblings().removeClass('on');
});

//서브페이지 탭구조 연결
if (location.hash == "#tab1") {
    $('#tab1').addClass('on').siblings().removeClass('on');
} else if (location.hash == "#tab2") {
    $('#tab2').addClass('on').siblings().removeClass('on');
} 


//모바일
$(document).ready(function(){
    if($(window).width() < 767) {
        //하단 사이트맵
        $(".map > li > ul").hide();
        $(".map > li").click(function() {
            $(this).children("ul").stop().slideToggle();
            $(".map > li").not(this).children("ul").slideUp();
        });
    } else {
        $(".map > li > ul").show();
    }
    //nav 열고닫기
    $(".mmenu").click(function(){
        $("header").addClass("on");
    });
    $(".mclose").click(function(){
        $("header").removeClass("on");
    });
    //nav-ul아코디언
    $("header.on .nav_bot .nav > li > ul").hide();
    $("header.on .nav_bot .nav > li").click(function(){
        $(this).children("ul").stop().slideToggle();
        $("header.on .nav_bot .nav > li").not(this).children("ul").slideUp();
});
})