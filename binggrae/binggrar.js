// 전체 세로 슬라이드
var slider = $(".myslider");
slider
.slick({
vertical: true,
infinite: false,
arrows:false,
dots: true
});

slider.on('wheel', (function(e) {
  e.preventDefault();
  if (e.originalEvent.deltaY > 0) {
    $(this).slick('slickNext');
  } else {
    $(this).slick('slickPrev');
  }
  
  if ($(this).slick('slickCurrentSlide') == 0) {
    $("header").removeClass("on");
  } else {
    $("header").addClass("on");
  }
}));

//탑부분 슬라이더
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


//하단 cf부분 슬라이더
var swiper2 = new Swiper(".mySwiper2", {
  grabCursor: true,
  autoplay: {
    delay: 2000,
  },
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-120%", 0, -500],
    },
    next: {
      shadow: true,
      translate: ["120%", 0, -500],
    },
  },
  navigation: {
    nextEl: ".swiper-button-next.cus",
    prevEl: ".swiper-button-prev.cus",
  },
});

//사회공헌 아이콘 슬라이드
var swiper = new Swiper(".mySwiper3", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


//sns hover 이벤트
$(function () {
  $(".box1").hover(function () {
    $(".clip1").toggleClass("on");
  });
  $(".box2").hover(function () {
    $(".clip2").toggleClass("on");
  });
  $(".box3").hover(function () {
    $(".clip3").toggleClass("on");
  });
  $(".box4").hover(function () {
    $(".clip4").toggleClass("on");
  });
});


//footer 패밀리사이트
var sel = document.querySelector('#site_select');
var wrap = document.querySelector('.onoff');

function createEle() {
  wrap.classList.toggle('on');
  return false;
}
sel.addEventListener('click', createEle);

  
//태블릿,모바일 nav
$(document).ready(function(){
$(".mmenu").click(function(){
    $(".top").addClass("on");
});
$(".mclose").click(function(){
    $(".top").removeClass("on");
});
});

$(".nav div > span").click(function() {
$(this).addClass('on').siblings().removeClass('on');
$("#" + $(this).data('id')).addClass('on').siblings().removeClass('on');
$(this).children("ul").slideToggle();
//this의 자식 요소를 슬라이드다운
$(".nav div > span").not(this).children("ul").slideUp();
//this와 관계없는 자식 요소를 슬라이드업
});