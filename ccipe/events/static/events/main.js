(function ($, sr) {
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced() {
      var obj = this,
      args = arguments;
      function delayed() {
        if (!execAsap) {
          func.apply(obj, args);
        }
        timeout = null;
      }
      if (timeout) {
        clearTimeout(timeout);
      } else if (execAsap) {
        func.apply(obj, args);
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
  };
  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind('resize', debounce(fn))  : this.trigger(sr);
  };
}) (jQuery, 'smartresize');
function isDesktop() {
  if (jQuery('body').width() / 16 >= 49.125) {
    return true;
  } else {
    return false;
  }
}
function isTablet() {
  if (jQuery('body').width() / 16 >= 37.5) {
    return true;
  } else {
    return false;
  }
}
function tabsizing() {
  if (isDesktop() || isTablet()) {
    jQuery('.tabs').each(function () {
      jQuery(this).css('height', jQuery(this).find('.active > .element-content').height() + jQuery(this).find('.active').height());
    });
  }
}
function tabs2Akkordeon() {
  if (isDesktop() || isTablet()) {
    jQuery('.tabs').each(function () {
      var boxwidth = parseInt(jQuery(this).css('width'));
      var width = 0;
      jQuery(this).children('li').children('h3').each(function () {
        width += parseInt(jQuery(this).css('width')) + parseInt(jQuery(this).parent().css('margin-left')) + parseInt(jQuery(this).parent().css('margin-right'));
      });
      if (width >= boxwidth) {
        jQuery(this).toggleClass('akkordeon tabs').css('height', '');
      }
      if (width && !jQuery(this).data('width')) {
        jQuery(this).data('width', width);
      }
    });
    jQuery('.akkordeon').each(function () {
      var boxwidth = parseInt(jQuery(this).css('width'));
      var width = jQuery(this).data('width');
      if (width && (width < boxwidth)) {
        jQuery(this).toggleClass('akkordeon tabs');
        if (jQuery(this).find('li.active').length > 0) {
          jQuery(this).find('li.active').first().sibblings().removeClass('active');
        } else {
          jQuery(this).find('li').first().addClass('active');
        }
      }
      tabsizing();
    });
    jQuery('.tabs').each(function () {
      var $ul = jQuery(this);
      if ($ul.children('.active').length !== 1) {
        $ul.children().removeClass('active').first().addClass('active');
      }
    });
  }
}
function addOffset() {
  if (jQuery('.nav-third-levelplus').first().height() > jQuery('#inhalt').height() - 4) {
    jQuery('#inhalt').next('aside').addClass('offset-4');
  } else {
    jQuery('#inhalt').next('aside').removeClass('offset-4');
  }
}
function tabClicks($li) {
  if ($li.parent().hasClass('tabs') && (isTablet() || isDesktop())) {
    $li.addClass('active').siblings().removeClass('active');
    $li.parent().css('height', parseInt($li.css('height')) + parseInt($li.children('.element-content').css('height')));
  } else {
    $li.toggleClass('active');
  }
  addOffset();
}
function navTabs() {
  jQuery('.element > li > h3').click(function () {
    tabClicks(jQuery(this).parent());
  });
  jQuery(document).ready(function () {
    if (isTablet()) {
      jQuery('.tabs').css('height', parseInt(jQuery(this).find('.active > .element-content').css('height')) + parseInt(jQuery(this).find('.active').css('height')));
    } else {
      jQuery('.tabs').css('height', 'auto');
    }
  });
  jQuery('.tabs, .akkordeon').children('li').each(function (e) {
    var titleElements = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ];
    var headerCount = 1;
    jQuery(this).each(function () {
      var container = jQuery(this);
      if (container.children('h3:first-child').length < 1) {
        for (i = 0; i < titleElements.length; i++) {
          var titleElement = container.find(titleElements[i]).first();
          if (titleElement.length) {
            container.prepend('<h3>' + titleElement.detach().text() + '</h3>');
            container.children('h3').click(function () {
              tabClicks(jQuery(this).parent());
            });
            return;
          }
        }
        container.prepend('<h3>' + headerCount + '</h3>');
        container.children('h3').click(function () {
          tabClicks(jQuery(this).parent());
        });
        headerCount++;
      }
    });
  });
};
/* Functions are only relevant for the wwu page
function loadContact($node) {
  if ($node.children('.module-content').length < 1) {
    var uri = $node.find('a.nav-app-contact').attr('href').replace(/#.*$/, '');
    $.get(uri, function (responseText) {
      $node.append(($(responseText.replace(/<(img|source|link|script)\b[^>]*>([\s]*<\/\1>)?/gi, '')).find('#WWU_Ansprechpartner')));
    });
  }
}
function loadTermine($parent) {
  if ($parent.children('.module-content').length < 1) {
    var $node = $parent.children('a');
    var language = $node.data('language') || '';
    var id = $node.data('id') || '';
    var url = '/Rektorat/incl/toptermine';
    if (id || language) {
      url += '-' + id + language;
    }
    url += '.html';
    var $div = $('<div></div>');
    $div.load(url, function () {
      $parent.append($(this).html());
    });
  }
}
*/
function moveLangNav(dot) {
  if (jQuery('.nav-language-container').next().hasClass('nav-search'))
  return;
  if (dot === 1) {
    if (!jQuery('.nav-language-container').prev().hasClass('nav-audience')) {
      jQuery('.nav-language-container').detach().appendTo('.wrapper-complement-nav');
    }
  } else {
    if (!jQuery('.nav-language-container').prev().hasClass('nav-search-mobile')) {
      jQuery('.nav-language-container').detach().appendTo('.nav-mobile-menu');
    }
  }
}
function reorganizeContent() {
  var article_counter = 0;
  jQuery('#inhalt .module.short + .module.short').each(function () {
    if (jQuery(this).prev().prev().hasClass('extended')) {
      article_counter = 0;
    }
    article_counter++;
    if (article_counter > 1) {
      jQuery(this).css('clear', 'left');
      article_counter = 0;
    }
  });
};
(function ($) {
  var globalConfig = {
    navContainerSecond: 'nav-second-rollout',
    navContainer: 'nav-main-rollout',
    navContainerRef: $('.nav-container'),
    navMain: '.nav-main'
  };
  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    }
  }(function ($) {
    function columnCountSupported() {
      var elem = document.createElement('ch'),
      elemStyle = document.createElement('ch').style,
      domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
      prop = 'columnCount',
      uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1),
      props = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ');
      for (var i in props) {
        if (elemStyle[props[i]] !== undefined) {
          return true;
        }
      }
      return false;
    }
    $.fn.columnizeList = function (settings) {
      settings = $.extend($.fn.columnizeList.defaults, settings);
      if (!columnCountSupported()) {
        return this.each(function () {
          var $list = $(this),
          $listClone = $list.clone(),
          $items = $list.children('li'),
          itemsPerCol = Math.ceil($items.length / settings.columnCount),
          columnWidth,
          columnHeight,
          itemHeight = 0,
          widthCounter = 0;
          $listClone.css({
            position: 'absolute',
            left: '-4999px'
          });
          $('body').append($listClone);
          heightCounter = itemHeight = $listClone.find('li').first().outerHeight();
          columnHeight = itemsPerCol * itemHeight;
          columnWidth = Math.floor(100 / settings.columnCount);
          $items.each(function (i) {
            var $item = $(this);
            if (i > 0 && i % itemsPerCol == 0) {
              widthCounter += columnWidth;
              $item.css('margin-top', - columnHeight);
            }
            if (widthCounter > 0) {
              $item.css('margin-left', widthCounter + '%');
            }
          });
        });
      }
    };
    $.fn.columnizeList.defaults = {
      columnCount: 2,
      columnGap: 0
    };
  }) (jQuery);
  $('.nav-apps').columnizeList();
  if (isDesktop()) {
    moveLangNav(1);
  } else {
    moveLangNav(0);
  }
  function logoSizing() {
    $('#sublogo, #subsublogo').each(function () {
      var width = $(this).width();
      var height = $(this).height();
      var $container = $(this).find('.textmarke');
      if ($container.length > 0) {
        $container = $container.first();
        var fontsize = $container.css('font-size').replace(/\D/g, '');
        if (($container.height() > height) || ($container.width() > width)) {
          for (var i = 0; i < 100; i++) {
            fontsize *= 0.95;
            $container.css('font-size', fontsize);
            if (($container.height() <= height) && ($container.find('a').width() <= width)) {
              break;
            }
          }
        }
      }
      $container.css('visibility', 'visible')
    });
  }
  function jwplayerSizing() {
    $('.flv_container > div[style], .jwdownloaddisplay[style]').each(function () {
      var height = Math.max(parseInt($(this).attr('style').replace(/^(.*[^-])?height:\s*(\d+)px.*$/g, '$2')), 1)
      if (height != 30) {
        $(this).css('max-height', Math.round(Math.max(parseInt($(this).css('width')), 1) * height / Math.max(parseInt($(this).attr('style').replace(/^.*width:\s*(\d+)px.*$/g, '$1')), 1)) + 'px');
      }
    });
  }
  $(window).smartresize(function () {
    logoSizing();
    jwplayerSizing();
    tabs2Akkordeon();
    if (isDesktop()) {
      globalConfig.navContainerRef.css('visibility', 'visible');
      moveLangNav(1);
    } else {
      $('.tabs').css('height', 'auto');
      globalConfig.navContainerRef.css('visibility', 'hidden');
      $('.' + globalConfig.navContainer).hide();
      $('.nav-mobile-toggle, .nav-search-mobile-toggle, .nav-level-toggle, .nav-item-main').removeClass('active');
      moveLangNav(0);
    }
    tabsizing();
  });
  $('.owl-ctrl').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('left')) {
      $(this).parent().siblings('.owl-carousel').trigger('https://www.ercis.org/sites//all//themes//wwucd//assets//js//owl.prev');
    } else {
      $(this).parent().siblings('.owl-carousel').trigger('https://www.ercis.org/sites//all//themes//wwucd//assets//js//owl.next');
    }
  });
  var navComplement = function () {
    $('.nav-app > a').click(function (e) {
      $(this).blur();
      $(this).focusout();
      if ($(this).attr('href') !== '#')
      return;
      e.preventDefault();
      $(this).parent().toggleClass('active');
    });
  }();
  var navMain = function () {
    $('.nav-search-mobile-toggle').click(function (e) {
      if ($('.nav-search').css('visibility') === 'hidden') {
        $('.nav-search').css('visibility', 'visible');
        $('.nav-container').css('visibility', 'hidden');
      } else {
        $('.nav-search').css('visibility', 'hidden');
        $('.nav-item-main').removeClass('active');
      }
      $('.nav-mobile-toggle').removeClass('active');
      $('.nav-search-mobile-toggle').toggleClass('active');
      e.preventDefault();
    });
    $('.nav-container').on('touchend', function () {
      $node = $('.nav-container').find('.active');
      setTimeout(function () {
        if ($('.nav-container').css('visibility') == 'hidden') {
          $('.nav-container').css('visibility', 'visible');
          $node.addClass('active').find('.nav-main-rollout').show();
          $('.nav-mobile-toggle').addClass('active');
        }
      }, 250);
    });
    $('.nav-mobile-toggle').click(function (e) {
      if ($('.nav-container').css('visibility') === 'hidden') {
        $('.nav-container').css('visibility', 'visible');
        $('.nav-search').css('visibility', 'hidden');
      } else {
        $('.nav-container').css('visibility', 'hidden');
      }
      $('.nav-search-mobile-toggle').removeClass('active');
      $('.nav-mobile-toggle').toggleClass('active');
      e.preventDefault();
    });
    function bindClicks() {
      $('.nav-level-toggle').unbind('click');
      $('.nav-level-toggle').click(function (e) {
        e.preventDefault();
        $(this).blur()
        if ($(this).hasClass('nav-third')) {
          $('.nav-partial-ie').toggle();
          $(this).parent().toggleClass('active');
          $(this).toggleClass('active');
          return;
        }
        var m = false;
        var par = $(this).parent();
        if ((par.hasClass('nav-item-main') || par.hasClass('nav-item-audience')) && !isDesktop()) {
          doMenu($(this).parent(), false);
          m = true;
          if (!par.hasClass('active')) {
            $('.nav-container').find('.active').removeClass('active');
            $('.nav-second-rollout').hide();
          }
        }
        par.toggleClass('active');
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $(this).siblings('.' + globalConfig.navContainerSecond).hide();
          if (m)
          $('.' + globalConfig.navContainer).hide();
        } else {
          $(this).addClass('active');
          $(this).siblings('.nav-second-rollout').show();
          var _url = $(this).siblings('a').attr('href');
          var _query_container = 'div[data-menu=\'' + _url + '\']';
          if (_url === '#' || _url.length === 0 || !_url.trim()) {
            return;
          }
          if (!par.has('.nav-second-rollout').length && !m) {
            var _query = '<div data-menu="' + _url + '" class="nav-second-rollout"></div>';
            $(this).parent().append('<div class="throbber" style=""></div>').fadeIn();
            $(this).parent().append(_query);
            $.get(_url, function (responseText) {
              $(_query_container).html(($(responseText.replace(/<(img|source|link|script)\b[^>]*>([\s]*<\/\1>)?/gi, '')).find('.nav-partial')));
              $('.nav-second-rollout .nav-subhead').remove();
              $('.nav-second-rollout > nav').removeClass('module nav-level-nplusone');
              $('.nav-second-rollout > nav > ul').removeClass().removeAttr('id').addClass('nav-third-level');
              $('.nav-second-rollout > nav > ul').find('li.nav-item').removeClass('nav-item');
              $('.nav-third-level').find('.nav-level-toggle').remove();
              $('.throbber').fadeOut(function () {
                $(this).remove();
              });
            }).error(function () {
              $('.throbber').fadeOut(function () {
                $(this).remove();
              });
            });
          }
        }
        addOffset();
        $('.nav-third-level').removeClass('nav-second-level');
      });
    }
    function doMenu(thx, preload) {
      var _url,
      th;
      _url = thx.data('href');
      th = thx;
      if (!_url) {
        th = thx.children('a').first();
        _url = th.attr('href');
      }
      if (_url === '#' || _url.length === 0 || !_url.trim()) {
        return;
      }
      var _query_container = 'div[data-menu=\'' + _url + '\']';
      $('.' + globalConfig.navContainer).hide();
      if (!th.parent().has(_query_container).length) {
        var _query = '<div style="display: none"  data-menu="' + _url + '" class="' + globalConfig.navContainer + '"></div>';
        var $node = th.hasClass('current') ? th : th.parent();
        if (!preload) {
          $node.append('<div class="throbber"></div>');
        }
        $node.append(_query);
        $.get(_url, function (responseText) {
          $(_query_container).html(($(responseText.replace(/<(img|source|link|script)\b[^>]*>([\s]*<\/\1>)?/gi, '')).find('.nav-partial')));
          $('.nav-main-rollout .nav-subhead').remove();
          $('.nav-main-rollout .nav-partial').removeClass('module nav-level-nplusone');
          $('.nav-main-rollout .nav-partial ul').addClass('nav-second-level')
          $('.throbber').fadeOut(function () {
            $(this).remove();
          });
          if (!preload) {
            $(_query_container).show();
          }
          bindClicks();
          $(_query_container + ' .nav-close').click(function () {
            $(_query_container).fadeOut();
            $('.nav-container').find('.active').removeClass('active');
          });
          var first = $('div[data-menu="' + _url + '"] .nav-second-level');
          var lis = first.children();
          var elements = 4;
          for (var i = 0; i != 3; ++i) {
            first.children().slice(0, elements).insertBefore(first).wrapAll('<ul class=\'nav-second-level nav-column\'></ul>');
          }
          first.detach();
        }).error(function () {
          $('.throbber').fadeOut(function () {
            $(this).remove();
          });
          return;
        });
        $(_query_container).mouseleave(function () {
          if (!isDesktop()) {
            return;
          }
          $(this).fadeOut();
          $('.nav-container').find('.active').removeClass('active');
        });
      } else if (!$(_query_container).is(':empty')) {
        $(_query_container).show();
      }
    }
    function hideMenu() {
      if (!isDesktop()) {
        return;
      }
      $('.' + globalConfig.navContainer + ', .' + globalConfig.navContainer + ' .' + globalConfig.navContainerSecond).hide().find('.active').removeClass('active');
    }
    jQuery('.nav-main-rollout, #top').mouseleave(function () {
      hideMenu();
    });
    jQuery('#logos').mouseenter(function () {
      hideMenu();
    });
    function menuBinds(nclassname) {
      var timer;
      $(nclassname).on({
        'mouseover': function () {
          if (!isDesktop()) {
            return;
          }
          th = $(this);
          timer = setTimeout(function () {
            doMenu(th, false);
          }, 250);
        },
        'mouseout': function () {
          clearTimeout(timer);
        }
      });
    }
    menuBinds('.nav-item-main');
    menuBinds('.nav-item-audience.nav-item-rollout');
    bindClicks();
    $('.no-touch .nav-item-main, .no-touch .nav-item-audience.nav-item-rollout').each(function () {
      doMenu($(this), true);
    });
  }();
  var mainFull = function () {
    if (!$('.nav-third-levelplus').length && !$('.complement').length) {
      $('.main').removeClass('four').addClass('six');
    }
  }();
  navTabs();
  window.onload = function () {
    logoSizing();
    tabsizing();
  }
  $(document).ready(function () {
    $('#query').attr('placeholder', $('#query').data('empty'));
    $('#query').on('focus', function () {
      if ($(this).val() == $(this).data('empty')) {
        $(this).val('');
        $(this).removeClass('capitals');
      }
    });
    $('#query').on('blur', function () {
      if ($(this).val() == '') {
        $(this).val($(this).data('empty'));
        $(this).addClass('capitals');
      }
    });
    $('#query').val($('#query').data('empty'));
    $('table').each(function () {
      var $table = $(this);
      if (!$table.parent().hasClass('table-wrapper')) {
        $table.wrap('<div class="table-wrapper"></div>');
      }
    });
    addOffset();
    tabs2Akkordeon();
    $('.nav-footer li').each(function () {
      var width = parseInt($(this).css('width')) + 3;
      $(this).css({
        'width': width + 'px',
        'max-width': width + 'px',
        'text-align': 'center',
        'padding': 0
      });
    });
    reorganizeContent();
  });
  jwplayerSizing();
  /* Function is only relevant for the wwu page
  $('.nav-app.download').each(function () {
    var $node = $(this);
    $node.children('a').addClass('toggle');
    if ($node.hasClass('active')) {
      if ($node.find('a.nav-app-contact').length) {
        loadContact($node);
      } else if ($node.find('a.nav-app-termine').length) {
        loadTermine($node);
      }
    }
    $node.find('a.nav-app-contact').click(function (e) {
      e.preventDefault();
      $node.toggleClass('active');
      $(this).blur();
      loadContact($node);
    })
    $node.find('a.nav-app-termine').click(function (e) {
      e.preventDefault();
      $node.toggleClass('active');
      $(this).blur();
      loadTermine($node);
    });
  });
  */
}) (jQuery);
