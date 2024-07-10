$(document).ready(function(){
    //tv show-live
    $('.listbox, .listbox1, .listbox2, .listbox3').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 5,
        slidesToScroll : 1,
        speed : 500,
        infinite : true,
        autoplay : true,
        autoplaySpeed : 1000,
        // pauseOnHover : true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '80px',
              slidesToShow: 3,
              slidesToScroll : 1,
              speed : 500,
              infinite : true,
              autoplay : true,
              autoplaySpeed : 1000,
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '20px',
              slidesToShow: 3,
              slidesToScroll : 1,
              speed : 500,
              infinite : true,
              autoplay : true,
              autoplaySpeed : 1000,
            }
          }
        ]
    });
});