 

! function($) {

  var defaults = {
      sectionContainer: "section",
      easing: "ease",
      animationTime: 1000,
      pagination: true,
      updateURL: false,
      keyboard: true,
      beforeMove: null,
      afterMove: null,
      loop: false,
      responsiveFallback: false,
      preventScroll: false
  };



  $.fn.swipeEvents = function() {
      return this.each(function() {

          var startX,
              startY,
              $this = $(this);

          $this.bind('touchstart', touchstart);

          function touchstart(event) {
              var touches = event.originalEvent.touches;
             if (touches && touches.length) {
          startX = touches[0].pageX;
          startY = touches[0].pageY;
          $this.unbind('touchmove', touchmove);
          $this.bind('touchmove', touchmove);
        }
      }

          function touchmove(event) {
              var touches = event.originalEvent.touches;
              if (touches && touches.length) {
                  var deltaX = startX - touches[0].pageX;
                  var deltaY = startY - touches[0].pageY;

                  if (deltaX >= 50) {
                      $this.trigger("swipeLeft");
                  }
                  if (deltaX <= -50) {
                      $this.trigger("swipeRight");
                  }
                  if (deltaY >= 50) {
                      $this.trigger("swipeUp");
                  }
                  if (deltaY <= -50) {
                      $this.trigger("swipeDown");
                  }
                  if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
                      $this.unbind('touchmove', touchmove);
                  }
              }
          }

      });
  };


  $.fn.onepage_scroll = function(options) {
      var settings = $.extend({}, defaults, options),
          el = $(this),
          sections = $(settings.sectionContainer)
          total = sections.length,
          status = "off",
          topPos = 0,
          lastAnimation = 0,
          quietPeriod = 500,
          paginationList = "";

      $.fn.transformPage = function(settings, pos, index) {
          if (document.all && !window.atob) {
              $(this).animate({
                  top: pos + '%'
              }, settings.animationTime, function() {
                  if (typeof settings.afterMove == 'function') settings.afterMove(index);
              });
          } else {
              $(this).css({
                  "-webkit-transform": "translate3d(0, " + pos + "%, 0)",
                  "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
                  "-moz-transform": "translate3d(0, " + pos + "%, 0)",
                  "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
                  "-ms-transform": "translate3d(0, " + pos + "%, 0)",
                  "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
                  "transform": "translate3d(0, " + pos + "%, 0)",
                  "transition": "all " + settings.animationTime + "ms " + settings.easing
              });

              $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                  if (typeof settings.afterMove == 'function') settings.afterMove(index);
              });
          }
      };

      $.fn.moveDown = function() {
          var el = $(this)
          index = $(settings.sectionContainer + ".active").data("index");
          current = $(settings.sectionContainer + "[data-index='" + index + "']");
          next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
          if (next.length < 1) {
              if (settings.loop == true) {
                  pos = 0;
                  next = $(settings.sectionContainer + "[data-index='1']");
              } else {
                  return
              }

          } else {
              pos = (index * 100) * -1;
          }
          if (typeof settings.beforeMove == 'function') settings.beforeMove(current.data("index"));
          current.removeClass("active")
          next.addClass("active");
          if (settings.pagination == true) {
              $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
              $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
          }

          $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          $("body").addClass("viewing-page-" + next.data("index"))

          if (history.replaceState && settings.updateURL == true) {
              var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index + 1);
              history.pushState({}, document.title, href);
          }
          el.transformPage(settings, pos, index);
      }

      $.fn.moveUp = function() {
          var el = $(this)
          index = $(settings.sectionContainer + ".active").data("index");
          current = $(settings.sectionContainer + "[data-index='" + index + "']");
          next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");

          if (next.length < 1) {
              if (settings.loop == true) {
                  pos = ((total - 1) * 100) * -1;
                  next = $(settings.sectionContainer + "[data-index='" + total + "']");
              } else {
                  return
              }
          } else {
              pos = ((next.data("index") - 1) * 100) * -1;
          }
          if (typeof settings.beforeMove == 'function') settings.beforeMove(current.data("index"));
          current.removeClass("active")
          next.addClass("active")
          if (settings.pagination == true) {
              $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
              $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
          }
          $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          $("body").addClass("viewing-page-" + next.data("index"))

          if (history.replaceState && settings.updateURL == true) {
              var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index - 1);
              history.pushState({}, document.title, href);
          }
          el.transformPage(settings, pos, index);
      }

      $.fn.moveTo = function(page_index) {
          current = $(settings.sectionContainer + ".active")
          next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");
          if (next.length > 0) {
              if (typeof settings.beforeMove == 'function') settings.beforeMove(current.data("index"));
              current.removeClass("active")
              next.addClass("active")
              $(".onepage-pagination li a" + ".active").removeClass("active");
              $(".onepage-pagination li a" + "[data-index='" + (page_index) + "']").addClass("active");
              $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
              $("body").addClass("viewing-page-" + next.data("index"))

              pos = ((page_index - 1) * 100) * -1;
              el.transformPage(settings, pos, page_index);
              if (settings.updateURL == false) return false;
          }
      }
    function responsive() {
      if ($(window).width() < settings.responsiveFallback) {
          $("body").addClass("disabled-onepage-scroll");
          $(document).unbind('mousewheel DOMMouseScroll');
          el.swipeEvents().unbind("swipeDown swipeUp");
      } else {
          if ($("body").hasClass("disabled-onepage-scroll")) {
              $("body").removeClass("disabled-onepage-scroll");
              $("html, body, .wrapper").animate({
                  scrollTop: 0
              }, "fast");
          }
          
                          el.swipeEvents().bind("swipeDown", function(event) {
              if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
              el.moveUp();
          }).bind("swipeUp", function(event) {
              if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
              el.moveDown();
          });
          

          if (!settings.preventScroll) {
              $(document).bind('mousewheel DOMMouseScroll', function(event) {
                  event.preventDefault(), { passive: false };
                  var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                  init_scroll(event, delta);
              });
          }
      }
  }


  function init_scroll(event, delta) {
    deltaOfInterest = delta;
    var timeNow = new Date().getTime();

    if (timeNow - lastAnimation < quietPeriod + settings.animationTime) {
                    document.addEventListener('mousewheel DOMMouseScroll', { passive: false });
        return;
    }

    if (deltaOfInterest < 0) {
        el.moveDown()
    } else {
        el.moveUp()
    }
    lastAnimation = timeNow;
}

    // Prepare everything before binding wheel scroll

    el.addClass("onepage-wrapper").css("position","relative");
    $.each( sections, function(i) {
      $(this).css({
        position: "absolute",
        top: topPos + "%"
      }).addClass("section").attr("data-index", i+1);


      $(this).css({
        position: "absolute",
        left: ( settings.direction == 'horizontal' )
          ? leftPos + "%"
          : 0,
        top: ( settings.direction == 'vertical' || settings.direction != 'horizontal' )
          ? topPos + "%"
          : 0
      });

      if (settings.direction == 'horizontal')
        leftPos = leftPos + 100;
      else
        topPos = topPos + 100;


      if(settings.pagination == true) {
        paginationList += "<li><a data-index='"+(i+1)+"' href='#" + (i+1) + "'></a></li>"
      }
    });

    el.swipeEvents().bind("swipeDown",  function(event){
      if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
      el.moveUp();
    }).bind("swipeUp", function(event){
      if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
      el.moveDown();
    });

    // Create Pagination and Display Them
    if (settings.pagination == true) {
      if ($('ul.onepage-pagination').length < 1) $("<ul class='onepage-pagination'></ul>").prependTo("body");

      if( settings.direction == 'horizontal' ) {
        posLeft = (el.find(".onepage-pagination").width() / 2) * -1;
        el.find(".onepage-pagination").css("margin-left", posLeft);
      } else {
        posTop = (el.find(".onepage-pagination").height() / 2) * -1;
        el.find(".onepage-pagination").css("margin-top", posTop);
      }
      $('ul.onepage-pagination').html(paginationList);
    }

    if(window.location.hash != "" && window.location.hash != "#1") {
      init_index =  window.location.hash.replace("#", "")

      if (parseInt(init_index) <= total && parseInt(init_index) > 0) {
        $(settings.sectionContainer + "[data-index='" + init_index + "']").addClass("active")
        $("body").addClass("viewing-page-"+ init_index)
        if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + init_index + "']").addClass("active");

        next = $(settings.sectionContainer + "[data-index='" + (init_index) + "']");
        if(next) {
          next.addClass("active")
          if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + (init_index) + "']").addClass("active");
          $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          $("body").addClass("viewing-page-"+next.data("index"))
          if (history.replaceState && settings.updateURL == true) {
            var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (init_index);
            history.pushState( {}, document.title, href );
          }
        }
        pos = ((init_index - 1) * 100) * -1;
        el.transformPage(settings, pos, init_index);
      } else {
        $(settings.sectionContainer + "[data-index='1']").addClass("active")
        $("body").addClass("viewing-page-1")
        if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
      }
    }else{
      $(settings.sectionContainer + "[data-index='1']").addClass("active")
      $("body").addClass("viewing-page-1")
      if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
    }

    if(settings.pagination == true)  {
      $(".onepage-pagination li a").click(function (){
        var page_index = $(this).data("index");
        el.moveTo(page_index);
      });
    }


    if (!settings.preventScroll) {
      $(document).bind('mousewheel DOMMouseScroll', function(event) {
          document.addEventListener('mousewheel DOMMouseScroll', { passive: false });
    
       var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
          if (!$("body").hasClass("disabled-onepage-scroll")) init_scroll(event, delta);
      });
      
  }
 
    if(settings.responsiveFallback != false) {
      $(window).resize(function() {
        responsive();
      });

      responsive();
    }

    if(settings.keyboard == true) {
      $(document).keydown(function(e) {
        var tag = e.target.tagName.toLowerCase();

        if (!$("body").hasClass("disabled-onepage-scroll")) {
          switch(e.which) {
            case 38:
              if (tag != 'input' && tag != 'textarea') el.moveUp()
            break;
            case 40:
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 32: //spacebar
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 33: //pageg up
              if (tag != 'input' && tag != 'textarea') el.moveUp()
            break;
            case 34: //page dwn
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 36: //home
              el.moveTo(1);
            break;
            case 35: //end
              el.moveTo(total);
            break;
            default: return;
          }
        }

      });
    }
    return false;
  }


}(window.jQuery);
