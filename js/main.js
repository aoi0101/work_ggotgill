$(function() {
//ドロップダウンメニュー
  $('.c-header__menu--itemSection').hover(function(){
    $(".c-header__dropdown--menu:not(:animated)", this).slideDown();
  }, function(){
    $(".c-header__dropdown--menu").slideUp();
  })


//ハンバーガーメニュー
  $('.c-header__humbergurMenu--section').click(function(){
    $('.c-header__spMenu').toggleClass('close');
    $('.c-header__spMenu--section').fadeToggle(500);
  });
  $('.c-header__spMenu--closeButton').click(function(){
    $('.c-header__spMenu').toggleClass('close');
    $('.c-header__spMenu--section').fadeToggle(500);
  });

//spメニュー色変更
  $('.c-header__spMenu--closeButton').hover(function(){
    $(".c-header__spMenu--closeButton").css("background-color","#5b7891");
  },function(){
    $(".c-header__spMenu--closeButton").css("background-color","");
  })



//ドロップダウンメニュー色変更
  $('.c-header__dropdown--text').hover(function(){
    var index = $(".c-header__dropdown--text").index(this);

    $(".c-header__dropdown--text").eq(index).css("background-color","#005aa3");
    $(".c-header__dropdown--text").eq(index).css("color","#ffffff");
  },function(){
    $(".c-header__dropdown--text").css("background-color","");
    $(".c-header__dropdown--text").css("color","");
  })

//メニューバー固定
  var nav = $('.c-header__menu--section');
    var navTop = nav.offset().top;
    //スクロールするたびに実行
    $(window).scroll(function () {
        var winTop = $(this).scrollTop();
        //スクロール位置がnavの位置より下だったらクラスfixedを追加
        if (winTop >= navTop) {
            nav.addClass('fixed')
        } else if (winTop <= navTop) {
            nav.removeClass('fixed')
        }
    });


//スライドショー
  var slideWidth = $('.p-top__image').outerWidth();
  var slideNum = $('.p-top__image').length;
  var slideSetWidth = slideWidth * slideNum;
  var lastCurrent = $('.p-top__image').length - 1;

  $('.p-top__image--section__detail').css('width', slideSetWidth);

  var slideCurrent = 0;

  var sliding = function(){
    if( slideCurrent < 0 ){
      slideCurrent = slideNum - 1;
    }else if( slideCurrent > slideNum - 1){
      slideCurrent = 0;
    }
    $('.p-top__image--section__detail').stop().animate({
      left: slideCurrent * -slideWidth
    })
  }

  var loop = function(){
    var clone = $(".p-top__image:first").clone(true);
    $(".p-top__image:first").animate({
        marginLeft : -slideWidth
    }, {
      duration : 500,
      complete : function() {
        $(".p-top__image:first").remove();
        clone.insertAfter($(".p-top__image:last"));
      }
    })
    var pagination = function(){
      var dots = slideCurrent + 1;
      $('.p-top__pagination-circle').removeClass('target');
      $(".p-top__pagination-circle:nth-of-type(" + dots + ")").addClass('target');
    }
  }

  var Timer;

  function startTimer(){
    Timer = setInterval(function(){
      loop();
    },4000);
  }

  function stopTimer(){
    clearInterval(Timer);
  }

  startTimer();

  //スライドボタン
  $(".p-top__imageButton--left").click(function() {
    stopTimer();
    slideCurrent--;
    sliding();
    startTimer();
  })

  $(".p-top__imageButton--right").click(function() {
    stopTimer();
    slideCurrent++;
    sliding();
    startTimer();
  })

  $('.p-top__image--section__detail').on('touchstart', function(e) {
      e.preventDefault();
      stopTimer();
      this.touchX = event.changedTouches[0].pageX;
      startX =  e.originalEvent.changedTouches[0].pageX;
			this.slideX = $(this).position().left;
    });

    $('.p-top__image--section__detail').on('touchmove', function(e) {
      e.preventDefault();
				this.slideX = this.slideX - (this.touchX - event.changedTouches[0].pageX );
				$(this).css({left:this.slideX});
				this.accel = (event.changedTouches[0].pageX - this.touchX) * 5;
				this.touchX = event.changedTouches[0].pageX;

        var X = $(this).position().left;
    });

    $('.p-top__image--section__detail').on('touchend', function(e) {
      e.preventDefault();
      startTimer();
      endX = e.originalEvent.changedTouches[0].pageX;
      moveX = startX - endX;
      if (moveX >= 150, moveX > -150){
        slideCurrent++;
        sliding();
      }if (moveX <= -150, moveX < 150){
        slideCurrent--;
        sliding();
      }
    });


//ボタン色変更
    $(".c-moreButton").hover(function() {
      var index = $(".c-moreButton").index(this);

      $(".c-moreButton").eq(index).css("background-color","#7296b4");
      $(".c-moreButton__text").eq(index).css("color","#ffffff");
    },function(){
      $(".c-moreButton").css("background-color","");
      $(".c-moreButton__text").css("color","");
    })


//フッターメニュー色変更
    $('.l-footer__menuItem').hover(function(){
    var index = $(".l-footer__menuItem").index(this);

      $(".l-footer__menuItem").eq(index).css("background-color","#ffffff");
      $(".l-footer__menuItem--text").eq(index).css("color","#7296b4");
    },function(){
      $(".l-footer__menuItem").css("background-color","");
      $(".l-footer__menuItem--text").css("color","");
    })
});
