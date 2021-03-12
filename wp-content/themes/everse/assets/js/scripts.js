"use strict";

var DEOTHEMES = DEOTHEMES || {};

(function () {
  // Detect Browser Width
  (function () {
    if (Modernizr.mq('(min-width: 0px)')) {
      // Browsers that support media queries
      minWidth = function minWidth(width) {
        return Modernizr.mq('(min-width: ' + width + 'px)');
      };
    } else {
      // Fallback for browsers that does not support media queries
      minWidth = function minWidth(width) {
        return window.width() >= width;
      };
    }
  })();

  DEOTHEMES.initialize = {
    init: function init() {
      DEOTHEMES.initialize.scrollToTop();
      DEOTHEMES.initialize.menuAccessibility();
      DEOTHEMES.initialize.mobileAccessibility();
      DEOTHEMES.initialize.mobileNavigation();
      DEOTHEMES.initialize.onepageNavbar();
      DEOTHEMES.initialize.menuSearch();
      DEOTHEMES.initialize.socialShare();
      DEOTHEMES.initialize.responsiveTables();
      DEOTHEMES.initialize.skipLinkFocus();
      DEOTHEMES.initialize.detectMobile();
      DEOTHEMES.initialize.detectIE();
    },
    preloader: function preloader() {
      var loaderMask = document.querySelector('.loader-mask');
      var loader = document.querySelector('.loader');

      if (loader) {
        loader.style.opacity = '0';
        setTimeout(function () {
          loaderMask.style.opacity = '0';
        }, 350);
        loaderMask.style.opacity = '0';
        loaderMask.addEventListener('transitionend', function () {
          loaderMask.remove();
          loaderMask.classList.add('preloader--loaded');
        });
      }
    },
    triggerResize: function triggerResize() {
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
    },
    scrollToTopScroll: function scrollToTopScroll() {
      var scroll = window.scrollY;

      if (!backToTop) {
        return;
      }

      if (scroll >= 50) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    },
    scrollToTop: function scrollToTop() {
      if (!backToTop) {
        return;
      }

      backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        if (document.scrollingElement.scrollTop === 0) return;
        var totalScrollDistance = document.scrollingElement.scrollTop;
        var scrollY = totalScrollDistance,
            oldTimestamp = null;

        function step(newTimestamp) {
          if (oldTimestamp !== null) {
            scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / 350;
            if (scrollY <= 0) return document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollTop = scrollY;
          }

          oldTimestamp = newTimestamp;
          window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
      });
    },
    menuAccessibility: function menuAccessibility() {
      // Get all the link elements within the primary menu.
      var i,
          links = document.querySelectorAll('.eversor-nav-menu__item, .nav__menu a'),
          menu = document.querySelectorAll('.eversor-nav-menu__list, .nav__menu');

      if (0 === menu.length) {
        return false;
      } // Each time a menu link is focused or blurred, toggle focus.


      for (i = 0; i < links.length; i++) {
        links[i].addEventListener('focus', toggleFocus, true);
        links[i].addEventListener('blur', toggleFocus, true);
      }

      function hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
      } // Sets or removes the .focus class on an element.


      function toggleFocus() {
        var self = this;
        menu = hasClass(self, 'eversor-nav-menu__item') ? 'eversor-nav-menu__list' : 'nav__menu'; // Move up through the ancestors of the current link until we hit menu list class.

        while (-1 === self.className.indexOf(menu)) {
          // On li elements toggle the class .focus.
          if ('li' === self.tagName.toLowerCase()) {
            if (-1 !== self.className.indexOf('focus')) {
              self.className = self.className.replace(' focus', '');
            } else {
              self.className += ' focus';
            }
          }

          self = self.parentElement;
        }
      }
    },
    mobileAccessibility: function mobileAccessibility() {
      document.addEventListener('keydown', function (e) {
        var tabKey, shiftKey, selectors, elements, mobileMenu, activeEl, lastEl, firstEl;

        if (body.classList.contains('showing-modal')) {
          var trapFocus = function trapFocus(firstEl, lastEl) {
            tabKey = e.key === 'Tab' || e.keyCode === 9;
            shiftKey = e.shiftKey;

            if (!shiftKey && tabKey && lastEl === activeEl) {
              e.preventDefault();
              firstEl.focus();
            }

            if (shiftKey && tabKey && firstEl === activeEl) {
              e.preventDefault();
              lastEl.focus();
            }
          };

          selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
          activeEl = document.activeElement; // Search

          if (body.classList.contains('showing-search-modal')) {
            var search = document.querySelectorAll('.everse-menu-search');

            for (var i = 0; i < search.length; i++) {
              firstEl = search[i].querySelector('.search-input');
              lastEl = search[i].querySelector('.everse-menu-search-modal__close');
              trapFocus(firstEl, lastEl);
            }
          } // Nav


          if (body.classList.contains('showing-nav-modal')) {
            mobileMenu = document.querySelector('.nav__wrap');
            firstEl = document.querySelector('#nav__icon-toggle');
            elements = mobileMenu.querySelectorAll(selectors);
            elements = Array.prototype.slice.call(elements);
            elements = elements.filter(function (element) {
              return null !== element.offsetParent;
            });
            lastEl = elements[elements.length - 1];
            trapFocus(firstEl, lastEl);
          }
        }
      });
    },
    stickyNavbar: function stickyNavbar() {
      var navSticky = document.querySelector('.nav--sticky');

      if (!navSticky) {
        return;
      }

      if (window.scrollY > 190) {
        navSticky.classList.add('sticky');
      } else {
        navSticky.classList.remove('sticky');
      }

      if (window.scrollY > 200) {
        navSticky.classList.add('offset');
      } else {
        navSticky.classList.remove('offset');
      }

      if (window.scrollY > 500) {
        navSticky.classList.add('scrolling');
      } else {
        navSticky.classList.remove('scrolling');
      }
    },
    stickyNavbarRemove: function stickyNavbarRemove() {
      var navSticky = document.querySelector('.nav--sticky');

      if (!navSticky) {
        return;
      }

      var navDropDownMenu = document.querySelector('.nav__dropdown-menu');

      if (!minWidth(tabletBreakpoint)) {
        navSticky.classList.remove('sticky', 'offset', 'scrolling');
      }

      if (minWidth(tabletBreakpoint) && navDropDownMenu) {
        navDropDownMenu.style.display = '';
      }
    },
    mobileNavigation: function mobileNavigation() {
      // Mobile toggle
      (function () {
        var navIconToggle = document.querySelectorAll('.nav__icon-toggle');

        for (var i = 0; i < navIconToggle.length; i++) {
          navIconToggle[i].addEventListener('click', function () {
            body.classList.toggle('showing-modal');
            body.classList.toggle('showing-nav-modal');
            this.classList.toggle('nav__icon-toggle--is-opened');
          });
        }
      })(); // Dropdowns


      var navDropdown = document.querySelector('.nav__dropdown');
      var navDropdownMenu = document.querySelector('.nav__dropdown-menu');
      var navDropdownTrigger = document.querySelectorAll('.nav__dropdown-trigger');

      if (navDropdownTrigger) {
        for (var i = 0; i < navDropdownTrigger.length; i++) {
          navDropdownTrigger[i].addEventListener('click', function () {
            this.classList.toggle('nav__dropdown-trigger--is-open');
            DOMAnimations.slideToggle(this.nextElementSibling);
            var attr = this.getAttribute('aria-expanded');

            if (attr == 'true') {
              this.setAttribute('aria-expanded', 'false');
            } else {
              this.setAttribute('aria-expanded', 'true');
            }
          });
        }
      }

      if (html.classList.contains('mobile')) {
        body.addEventListener('click', function () {
          navDropdownMenu.classList.add('hide-dropdown');
        });
        navDropdown.addEventListener('click', '> a', function (e) {
          e.preventDefault();
        });
        navDropdown.addEventListener('click', function (e) {
          e.stopPropagation();
          navDropdownMenu.classList.remove('hide-dropdown');
        });
      }
    },
    onepageNavbar: function onepageNavbar() {
      var header = document.querySelector('.nav--onepage');
      var links = document.querySelectorAll('.nav__wrap a[href^="#"]');
      var navIconToggle = document.querySelector('#nav__icon-toggle');

      if (!header) {
        return;
      }

      for (var i = 0; links.length > i; i++) {
        links[i].addEventListener('click', function (e) {
          var iconDisplay = window.getComputedStyle(navIconToggle, null).display;

          if ('block' === iconDisplay) {
            navIconToggle.click();
          }
        });
      }
    },
    menuSearch: function menuSearch() {
      var search = document.querySelectorAll('.everse-menu-search:not(.eversor-menu-search)');

      if (!search.length > 0) {
        return;
      }

      var _loop = function _loop() {
        var trigger = search[i].querySelector('.everse-menu-search__trigger'),
            modal = search[i].querySelector('.everse-menu-search-modal'),
            inner = search[i].querySelector('.everse-menu-search-modal__inner'),
            input = search[i].querySelector('.search-input'),
            close = search[i].querySelector('.everse-menu-search-modal__close');
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          bodyScrollLock.disableBodyScroll(modal);
          body.classList.toggle('showing-modal');
          body.classList.toggle('showing-search-modal');
          modal.classList.add('everse-menu-search-modal--is-open');
          modal.removeAttribute('aria-hidden');
          modal.setAttribute('aria-modal', true);
          modal.setAttribute('role', 'dialog');
          setTimeout(function () {
            input.focus();
          }, 200);
        });
        inner.addEventListener('click', function (e) {
          e.stopPropagation();
        });
        modal.addEventListener('click', function (e) {
          closeModal(this);
        });
        close.addEventListener('click', function (e) {
          closeModal(modal);
        });
        /*
        * Close on click or on esc.
        */

        document.addEventListener('keyup', function (e) {
          if (27 === e.keyCode) {
            closeModal(modal);
          }
        });
      };

      for (var i = 0; i < search.length; i++) {
        _loop();
      }

      function closeModal(modal) {
        bodyScrollLock.enableBodyScroll(modal);
        body.classList.remove('showing-modal');
        body.classList.remove('showing-search-modal');
        modal.classList.remove('everse-menu-search-modal--is-open');
        modal.setAttribute('aria-hidden', true);
        modal.removeAttribute('aria-modal');
        modal.removeAttribute('role');
      }
    },
    socialShare: function socialShare() {
      var social = document.querySelector('.entry__share-social');
      var width = window.innerWidth;
      var height = window.innerHeight;

      if (!social) {
        return;
      }

      social.addEventListener('click', function (e) {
        if (700 < width && 500 < height) {
          var url = this.getAttribute('href');
          window.open(url, '', 'width=700, height=500,left=' + (width / 2 - 350) + ',top=' + (height / 2 - 250) + ',scrollbars=yes');
          e.preventDefault();
        }
      });
    },
    responsiveTables: function responsiveTables() {
      var table = document.querySelector('.wp-block-table');

      if (table) {
        table.wrap('<div class="table-responsive"></div>');
      }
    },
    skipLinkFocus: function skipLinkFocus() {
      var isIe = /(trident|msie)/i.test(navigator.userAgent);

      if (isIe && document.getElementById && window.addEventListener) {
        window.addEventListener('hashchange', function () {
          var id = location.hash.substring(1),
              element;

          if (!/^[A-z0-9_-]+$/.test(id)) {
            return;
          }

          element = document.getElementById(id);

          if (element) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
              element.tabIndex = -1;
            }

            element.focus();
          }
        }, false);
      }
    },
    detectMobile: function detectMobile() {
      if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
        html.classList.add('mobile');
      } else {
        html.classList.remove('mobile');
      }
    },
    detectIE: function detectIE() {
      if (Function('/*@cc_on return document.documentMode===10@*/')()) {
        html.addClass('ie');
      }
    }
  };
  var DOMAnimations = {
    /**
      * SlideUp
      *
      * @param {HTMLElement} element
      * @param {Number} duration
      * @returns {Promise<boolean>}
      */
    slideUp: function slideUp(element) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      return new Promise(function (resolve, reject) {
        element.style.height = element.offsetHeight + 'px';
        element.style.transitionProperty = "height, margin, padding";
        element.style.transitionDuration = duration + 'ms';
        element.offsetHeight;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        window.setTimeout(function () {
          element.style.display = 'none';
          element.style.removeProperty('height');
          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');
          element.style.removeProperty('overflow');
          element.style.removeProperty('transition-duration');
          element.style.removeProperty('transition-property');
          resolve(false);
        }, duration);
      });
    },

    /**
    * SlideDown
    *
    * @param {HTMLElement} element
    * @param {Number} duration
    * @returns {Promise<boolean>}
    */
    slideDown: function slideDown(element) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      return new Promise(function (resolve, reject) {
        element.style.removeProperty('display');
        var display = window.getComputedStyle(element).display;
        if (display === 'none') display = 'block';
        element.style.display = display;
        var height = element.offsetHeight;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        element.offsetHeight;
        element.style.transitionProperty = "height, margin, padding";
        element.style.transitionDuration = duration + 'ms';
        element.style.height = height + 'px';
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        window.setTimeout(function () {
          element.style.removeProperty('height');
          element.style.removeProperty('overflow');
          element.style.removeProperty('transition-duration');
          element.style.removeProperty('transition-property');
        }, duration);
      });
    },

    /**
    * SlideToggle
    *
    * @param {HTMLElement} element
    * @param {Number} duration
    * @returns {Promise<boolean>}
    */
    slideToggle: function slideToggle(element) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      if (window.getComputedStyle(element).display === 'none') {
        return this.slideDown(element, duration);
      } else {
        return this.slideUp(element, duration);
      }
    }
  };
  DEOTHEMES.documentOnReady = {
    init: function init() {
      DEOTHEMES.initialize.init();
    }
  };
  DEOTHEMES.windowOnLoad = {
    init: function init() {
      DEOTHEMES.initialize.preloader();
      DEOTHEMES.initialize.triggerResize();
    }
  };
  DEOTHEMES.windowOnResize = {
    init: function init() {
      DEOTHEMES.initialize.stickyNavbarRemove(); //DEOTHEMES.initialize.mobileAccessibility();			
    }
  };
  DEOTHEMES.windowOnScroll = {
    init: function init() {
      DEOTHEMES.initialize.scrollToTopScroll();
      DEOTHEMES.initialize.stickyNavbar();
    }
  };
  var html = document.querySelector('html'),
      body = document.body,
      backToTop = document.getElementById('back-to-top'),
      tabletBreakpoint = 1025,
      resizeEvent = window.document.createEvent('UIEvents'),
      minWidth;
  document.addEventListener('DOMContentLoaded', DEOTHEMES.documentOnReady.init);
  window.addEventListener('load', DEOTHEMES.windowOnLoad.init);
  window.addEventListener('resize', DEOTHEMES.windowOnResize.init);
  window.addEventListener('scroll', DEOTHEMES.windowOnScroll.init);
})();