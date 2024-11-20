import { $ } from 'vendors';

/*
 * jQuery open close plugin
 */
;(function($, window, exportName) {
    'use strict';

    var doc = $(document);
    var OpenClose = function(options) {
        this.options = $.extend({}, OpenClose.DEFAULTS, options);
        this.init();
    };

    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch || /Windows Phone/.test(navigator.userAgent);

    // default options
    OpenClose.DEFAULTS = {
        opener: '.opener',
        closer: '.closer',
        slider: '.slider',
        effect: 'slide',
        eventMode: 'click', // click, hover
        activeClass: 'active',
        hiddenClass: 'openclose-hidden',
        hideOnClickOutside: true,
        redirect: false,
        animDuration: 400,
        delay: 50,

        // callbacks
        onInit: null,
        onBeforeShow: null,
        onBeforeHide: null,
        onAfterShow: null,
        onAfterHide: null,
        onDestroy: null
    };

    OpenClose.prototype = {
        init: function() {
            if (this.options.holder) {
                this.initStructure();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        initStructure: function() {
            this.holder = $(this.options.holder);
            this.opener = this.holder.find(this.options.opener);
            this.slider = this.holder.find(this.options.slider).addClass(this.options.hiddenClass);
            this.closer = this.holder.find(this.options.closer);
            this.isCollapsed = false;
            this.clickMode  = isTouchDevice ? 'click' : this.options.eventMode;
        },
        attachEvents: function() {
            var self = this;

            this.onCollapseSlide = function(event) {
                self.collapseSlide();
                event.preventDefault();
            };

            this.onCloseSlide = function(event) {
                self.hideSlide();
                event.preventDefault();
            };

            this.hideOnClickOutSide = function(event) {
                var target = $(event.target);

                if (self.options.hideOnClickOutside) {
                    if (!target.closest(self.options.holder).length && !target.closest(self.options.slider).length) {
                        self.hideSlide();
                    }
                }
            };

            this.onMouseEnter = function() {
                self.delayedFunc(self.showSlide);
            };

            this.onMouseLeave = function() {
                self.delayedFunc(self.hideSlide);
            };

            if (this.clickMode === 'hover') {
                this.holder.on('mouseenter', this.onMouseEnter);
                this.holder.on('mouseleave', this.onMouseLeave);
            } else {
                this.holder.on(this.clickMode, this.options.opener, this.onCollapseSlide);
                this.holder.on(this.clickMode, this.options.closer, this.onCloseSlide);
            }
        },
        delayedFunc: function(callback) {
            var self = this;

            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                if ($.isFunction(callback)) {
                    callback.call(self);
                }
            }, this.options.delay);
        },
        collapseSlide: function() {
            if (this.isCollapsed) {
                if (this.options.redirect) {
                    location.href = this.opener.attr('href');
                    return;
                }

                this.hideSlide();
            } else {
                this.showSlide();
            }
        },
        showSlide: function() {
            var self = this;

            this.holder.addClass(this.options.activeClass);
            this.slider.removeClass(this.options.hiddenClass);
            this.isCollapsed = true;
            this.makeCallback('onBeforeShow', this);

            OpenClose.effects[this.options.effect].show({
                slide: this.slider,
                speed: this.options.animDuration,
                complete: function() {
                    self.makeCallback('onAfterShow', self);
                }
            });

            if (this.options.hideOnClickOutside) {
                doc.on('click touchstart', this.hideOnClickOutSide);
            }
        },
        hideSlide: function() {
            var self = this;

            this.holder.removeClass(this.options.activeClass);
            this.isCollapsed = false;
            this.makeCallback('onBeforeHide', this);

            OpenClose.effects[this.options.effect].hide({
                slide: this.slider,
                speed: this.options.animDuration,
                complete: function() {
                    self.slider.addClass(self.options.hiddenClass);
                    self.makeCallback('onAfterHide', self);
                }
            });

            if (this.options.hideOnClickOutside) {
                doc.off('click touchstart', this.hideOnClickOutSide);
            }
        },
        destroy: function() {
            doc.off('click touchstart', this.hideOnClickOutSide);
            this.opener.off(this.clickMode, this.onCollapseSlide);
            this.closer.off(this.clickMode, this.onCloseSlide);
            this.holder.off('mouseenter', this.onMouseEnter);
            this.holder.off('mouseleave', this.onMouseLeave);
            this.holder.removeClass(this.options.activeClass);
            this.holder.removeData('OpenClose');
            this.slider.removeClass(this.options.hiddenClass).removeAttr('style');
            this.makeCallback('onDestroy', this);
        },
        makeCallback: function(name) {
            var args;

            if ($.isFunction(this.options[name])) {
                args = Array.prototype.slice.call(arguments);
                args.splice(0, 1);
                this.options[name].apply(this, args);
            }
        }
    };

    OpenClose.effects = {
        none: {
            show: function(obj) {
                obj.slide.show(0, obj.complete);
            },
            hide: function(obj) {
                obj.slide.hide(0, obj.complete);
            }
        },
        fade: {
            show: function(obj) {
                obj.slide.hide().stop().fadeIn(obj.speed, obj.complete);
            },
            hide: function(obj) {
                obj.slide.stop().fadeOut(obj.speed, obj.complete);
            }
        },
        slide: {
            show: function(obj) {
                obj.slide.hide().stop().slideDown(obj.speed, obj.complete);
            },
            hide: function(obj) {
                obj.slide.stop().slideUp(obj.speed, obj.complete);
            }
        }
    };

    $.fn.openClose = function(options) {
        return this.each(function() {
            var elements = $(this);
            var instance = elements.data('OpenClose');
            var settings;

            if (!instance) {
                settings = $.extend({}, options, { holder: this });
                elements.data('OpenClose', new OpenClose(settings));
            }
        });
    };

    // export module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = OpenClose;
    } else {
        window[exportName] = OpenClose;
    }
}($, window, 'OpenClose'));