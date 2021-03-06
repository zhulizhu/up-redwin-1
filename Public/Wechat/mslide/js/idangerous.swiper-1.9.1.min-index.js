/*
 * Swiper 1.9.1 - Mobile Touch Slider
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012-2013, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Updated on: April 7, 2013
*/
var Swiper = function(f, b) {
    function g() {
        var c = y - l;
        b.loop && (c -= l);
        b.scrollContainer && (c = p - l, 0 > c && (c = 0));
        b.slidesPerSlide > a.slides.length && (c = 0);
        return c
    }
    function j(c) {
        a.allowLinks || c.preventDefault()
    }
    function s(c) {
        if (a.isTouched || b.onlyExternal) return ! 1;
        a.isTouched = !0;
        u = "touchstart" == c.type;
        if (!u || 1 == c.targetTouches.length) {
            a.callPlugins("onTouchStartBegin");
            b.loop && a.fixLoop();
            u || (c.preventDefault ? c.preventDefault() : c.returnValue = !1);
            var d = u ? c.targetTouches[0].pageX: c.pageX || c.clientX;
            c = u ? c.targetTouches[0].pageY: c.pageY || c.clientY;
            a.touches.startX = a.touches.currentX = d;
            a.touches.startY = a.touches.currentY = c;
            a.touches.start = a.touches.current = h ? a.touches.startX: a.touches.startY;
            a.setTransition(0);
            a.positions.start = a.positions.current = h ? a.getTranslate("x") : a.getTranslate("y");
            h ? a.setTransform(a.positions.start, 0, 0) : a.setTransform(0, a.positions.start, 0);
            a.times.start = (new Date).getTime();
            w = void 0;
            if (b.onSlideClick || b.onSlideTouch) {
                var e = a.container,
                f = e.getBoundingClientRect(),
                g = document.body,
                d = d - f.left + (e.clientLeft || g.clientLeft || 0) - (window.pageXOffset || e.scrollLeft);
                c = c - f.top - (e.clientTop || g.clientTop || 0) - (window.pageYOffset || e.scrollTop);
                d = h ? d: c;
                c = -Math.round(a.positions.current / p);
                c = d = Math.floor(d / p) + c;
                b.loop && (c = d - b.slidesPerSlide, 0 > c && (c = a.slides.length + c - 2 * b.slidesPerSlide));
                a.clickedSlideIndex = c;
                a.clickedSlide = a.getSlide(d);
                b.onSlideTouch && (b.onSlideTouch(a), a.callPlugins("onSlideTouch"))
            }
            0 < b.moveStartThreshold && (D = !1);
            if (b.onTouchStart) b.onTouchStart(a);
            a.callPlugins("onTouchStartEnd")
        }
    }
    function v(c) {
        if (a.isTouched && !b.onlyExternal && !(u && "mousemove" == c.type)) {
            var d = u ? c.targetTouches[0].pageX: c.pageX || c.clientX,
            e = u ? c.targetTouches[0].pageY: c.pageY || c.clientY;
            "undefined" === typeof w && h && (w = !!(w || Math.abs(e - a.touches.startY) > Math.abs(d - a.touches.startX)));
            "undefined" === typeof w && !h && (w = !!(w || Math.abs(e - a.touches.startY) < Math.abs(d - a.touches.startX)));
            if (!w) if (c.assignedToSwiper) a.isTouched = !1;
            else if (c.assignedToSwiper = !0, b.preventLinks && (a.allowLinks = !1), b.autoPlay && a.stopAutoPlay(), !u || 1 == c.touches.length) {
                a.callPlugins("onTouchMoveStart");
                c.preventDefault ? c.preventDefault() : c.returnValue = !1;
                a.touches.current = h ? d: e;
                a.positions.current = (a.touches.current - a.touches.start) * b.ratio + a.positions.start;
                if (b.resistance) {
                    if (0 < a.positions.current && (!b.freeMode || b.freeModeFluid)) b.loop ? (c = 1, 0 < a.positions.current && (a.positions.current = 0)) : c = (2 * l - a.positions.current) / l / 2,
                    a.positions.current = 0.5 > c ? l / 2 : a.positions.current * c;
                    if (a.positions.current < -g() && (!b.freeMode || b.freeModeFluid)) b.loop ? (c = 1, d = a.positions.current, e = -g() - l) : (d = (a.touches.current - a.touches.start) * b.ratio + (g() + a.positions.start), c = (l + d) / l, d = a.positions.current - d * (1 - c) / 2, e = -g() - l / 2),
                    a.positions.current = d < e || 0 >= c ? e: d
                }
                if (b.followFinger) {
                    b.moveStartThreshold ? Math.abs(a.touches.current - a.touches.start) > b.moveStartThreshold || D ? (D = !0, h ? a.setTransform(a.positions.current, 0, 0) : a.setTransform(0, a.positions.current, 0)) : a.positions.current = a.positions.start: h ? a.setTransform(a.positions.current, 0, 0) : a.setTransform(0, a.positions.current, 0);
                    b.freeMode && a.updateActiveSlide(a.positions.current);
                    b.onSlideClick && a.clickedSlide && (a.clickedSlide = !1);
                    b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grabbing", a.container.style.cursor = "-moz-grabbin", a.container.style.cursor = "-webkit-grabbing");
                    a.callPlugins("onTouchMoveEnd");
                    if (b.onTouchMove) b.onTouchMove(a);
                    return ! 1
                }
            }
        }
    }
    function r() {
        if (!b.onlyExternal && a.isTouched) {
            a.isTouched = !1;
            b.preventLinks && setTimeout(function() {
                a.allowLinks = !0
            },
            10);
            b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grab", a.container.style.cursor = "-moz-grab", a.container.style.cursor = "-webkit-grab");
            b.onSlideClick && a.clickedSlide && (b.onSlideClick(a), a.callPlugins("onSlideClick")); ! a.positions.current && 0 !== a.positions.current && (a.positions.current = a.positions.start);
            b.followFinger && (h ? a.setTransform(a.positions.current, 0, 0) : a.setTransform(0, a.positions.current, 0));
            a.times.end = (new Date).getTime();
            a.touches.diff = a.touches.current - a.touches.start;
            a.touches.abs = Math.abs(a.touches.diff);
            a.positions.diff = a.positions.current - a.positions.start;
            a.positions.abs = Math.abs(a.positions.diff);
            var c = a.positions.diff,
            d = a.positions.abs;
            5 > d && a.swipeReset();
            var e = y - l;
            b.scrollContainer && (e = p - l);
            0 < a.positions.current ? a.swipeReset() : a.positions.current < -e ? a.swipeReset() : b.freeMode ? (300 > a.times.end - a.times.start && b.freeModeFluid && (d = a.positions.current + 2 * a.touches.diff, d < -1 * e && (d = -e), 0 < d && (d = 0), h ? a.setTransform(d, 0, 0) : a.setTransform(0, d, 0), a.setTransition(2 * (a.times.end - a.times.start)), a.updateActiveSlide(d)), (!b.freeModeFluid || 300 <= a.times.end - a.times.start) && a.updateActiveSlide(a.positions.current)) : (x = 0 > c ? "toNext": "toPrev", "toNext" == x && 300 >= a.times.end - a.times.start && (30 > d || !b.shortSwipes ? a.swipeReset() : a.swipeNext(!0)), "toPrev" == x && 300 >= a.times.end - a.times.start && (30 > d || !b.shortSwipes ? a.swipeReset() : a.swipePrev(!0)), e = p * b.slidesPerGroup, "toNext" == x && 300 < a.times.end - a.times.start && (d >= 0.5 * e ? a.swipeNext(!0) : a.swipeReset()), "toPrev" == x && 300 < a.times.end - a.times.start && (d >= 0.5 * e ? a.swipePrev(!0) : a.swipeReset()));
            if (b.onTouchEnd) b.onTouchEnd(a);
            a.callPlugins("onTouchEnd")
        }
    }
    function E() {
        a.callPlugins("onSlideChangeStart");
        if (b.onSlideChangeStart) b.onSlideChangeStart(a);
        b.onSlideChangeEnd && a.transitionEnd(b.onSlideChangeEnd)
    }
    window.addEventListener || (window.Element || (Element = function() {}), Element.prototype.addEventListener = HTMLDocument.prototype.addEventListener = addEventListener = function(a, b) {
        this.attachEvent("on" + a, b)
    },
    Element.prototype.removeEventListener = HTMLDocument.prototype.removeEventListener = removeEventListener = function(a, b) {
        this.detachEvent("on" + a, b)
    });
    if (document.body.__defineGetter__ && HTMLElement) {
        var q = HTMLElement.prototype;
        q.__defineGetter__ && q.__defineGetter__("outerHTML",
        function() {
            return (new XMLSerializer).serializeToString(this)
        })
    }
    window.getComputedStyle || (window.getComputedStyle = function(a) {
        this.el = a;
        this.getPropertyValue = function(b) {
            var e = /(\-([a-z]){1})/g;
            "float" == b && (b = "styleFloat");
            e.test(b) && (b = b.replace(e,
            function(a, c, b) {
                return b.toUpperCase()
            }));
            return a.currentStyle[b] ? a.currentStyle[b] : null
        };
        return this
    });
    if (f.nodeType || document.querySelectorAll && 0 != document.querySelectorAll(f).length) {
        var a = this;
        a.touches = {};
        a.positions = {
            current: 0
        };
        a.id = (new Date).getTime();
        a.container = f.nodeType ? f: document.querySelectorAll(f)[0];
        a.times = {};
        a.isTouched = !1;
        a.realIndex = 0;
        a.activeSlide = 0;
        a.previousSlide = null;
        a.langDirection = window.getComputedStyle(a.container, null).getPropertyValue("direction");
        a.support = {
            touch: a.isSupportTouch(),
            threeD: a.isSupport3D()
        };
        a.use3D = a.support.threeD;
        q = {
            mode: "horizontal",
            ratio: 1,
            speed: 300,
            freeMode: !1,
            freeModeFluid: !1,
            slidesPerSlide: 1,
            slidesPerGroup: 1,
            simulateTouch: !0,
            followFinger: !0,
            shortSwipes: !0,
            moveStartThreshold: !1,
            autoPlay: !1,
            onlyExternal: !1,
            createPagination: !0,
            pagination: !1,
            resistance: !0,
            scrollContainer: !1,
            preventLinks: !0,
            initialSlide: 0,
            keyboardControl: !1,
            mousewheelControl: !1,
            resizeEvent: "auto",
            useCSS3Transforms: !0,
            slideElement: "div",
            slideClass: "swiper-slide",
            wrapperClass: "swiper-wrapper",
            paginationClass: "swiper-pagination-switch",
            paginationActiveClass: "swiper-active-switch"
        };
        b = b || {};
        for (var m in q) m in b || (b[m] = q[m]);
        a.params = b;
        b.scrollContainer && (b.freeMode = !0, b.freeModeFluid = !0);
        var z = !1;
        "auto" == b.slidesPerSlide && (z = !0, b.slidesPerSlide = 1);
        var n, h, p, k, y, x, w, l;
        for (m = a.container.childNodes.length - 1; 0 <= m; m--) if (a.container.childNodes[m].className) for (var q = a.container.childNodes[m].className.split(" "), F = 0; F < q.length; F++) q[F] === b.wrapperClass && (n = a.container.childNodes[m]);
        a.wrapper = n;
        h = "horizontal" == b.mode;
        a.touchEvents = {
            touchStart: a.support.touch || !b.simulateTouch ? "touchstart": a.ie10 ? "MSPointerDown": "mousedown",
            touchMove: a.support.touch || !b.simulateTouch ? "touchmove": a.ie10 ? "MSPointerMove": "mousemove",
            touchEnd: a.support.touch || !b.simulateTouch ? "touchend": a.ie10 ? "MSPointerUp": "mouseup"
        };
        a._extendSwiperSlide = function(b) {
            b.append = function() {
                a.wrapper.appendChild(b);
                a.reInit();
                return b
            };
            b.prepend = function() {
                a.wrapper.insertBefore(b, a.wrapper.firstChild);
                a.reInit();
                return b
            };
            b.insertAfter = function(d) {
                if ("undefined" === typeof d) return ! 1;
                a.wrapper.insertBefore(b, a.slides[d + 1]);
                a.reInit();
                return b
            };
            b.clone = function() {
                return a._extendSwiperSlide(b.cloneNode(!0))
            };
            b.remove = function() {
                a.wrapper.removeChild(b);
                a.reInit()
            };
            b.html = function(a) {
                if ("undefined" === typeof a) return b.innerHTML;
                b.innerHTML = a;
                return b
            };
            b.index = function() {
                for (var d, e = a.slides.length - 1; 0 <= e; e--) b == a.slides[e] && (d = e);
                return d
            };
            b.isActive = function() {
                return b.index() == a.activeSlide ? !0 : !1
            };
            b.swiperSlideDataStorage || (b.swiperSlideDataStorage = {});
            b.getData = function(a) {
                return b.swiperSlideDataStorage[a]
            };
            b.setData = function(a, e) {
                b.swiperSlideDataStorage[a] = e;
                return b
            };
            b.data = function(a, e) {
                return e ? (b.setAttribute("data-" + a, e), b) : b.getAttribute("data-" + a)
            };
            return b
        };
        a._calcSlides = function() {
            var c = a.slides ? a.slides.length: !1;
            a.slides = [];
            for (var d = 0; d < a.wrapper.childNodes.length; d++) if (a.wrapper.childNodes[d].className) for (var e = a.wrapper.childNodes[d].className.split(" "), f = 0; f < e.length; f++) e[f] === b.slideClass && a.slides.push(a.wrapper.childNodes[d]);
            for (d = a.slides.length - 1; 0 <= d; d--) a._extendSwiperSlide(a.slides[d]);
            c && (c != a.slides.length && a.createPagination) && (a.createPagination(), a.callPlugins("numberOfSlidesChanged"))
        };
        a._calcSlides();
        a.createSlide = function(c, d, e) {
            d = d || a.params.slideClass;
            e = e || b.slideElement;
            e = document.createElement(e);
            e.innerHTML = c || "";
            e.className = d;
            return a._extendSwiperSlide(e)
        };
        a.appendSlide = function(b, d, e) {
            if (b) return b.nodeType ? a._extendSwiperSlide(b).append() : a.createSlide(b, d, e).append()
        };
        a.prependSlide = function(b, d, e) {
            if (b) return b.nodeType ? a._extendSwiperSlide(b).prepend() : a.createSlide(b, d, e).prepend()
        };
        a.insertSlideAfter = function(b, d, e, f) {
            return ! b ? !1 : b.nodeType ? a._extendSwiperSlide(b).insertAfter(b) : a.createSlide(d, e, f).insertAfter(b)
        };
        a.removeSlide = function(b) {
            return a.slides[b] ? (a.slides[b].remove(), !0) : !1
        };
        a.removeLastSlide = function() {
            return 0 < a.slides.length ? (a.slides[a.slides.length - 1].remove(), !0) : !1
        };
        a.removeAllSlides = function() {
            for (var b = a.slides.length - 1; 0 <= b; b--) a.slides[b].remove()
        };
        a.getSlide = function(b) {
            return a.slides[b]
        };
        a.getLastSlide = function() {
            return a.slides[a.slides.length - 1]
        };
        a.getFirstSlide = function() {
            return a.slides[0]
        };
        a.currentSlide = function() {
            return a.slides[a.activeSlide]
        };
        var A = [],
        t;
        for (t in a.plugins) b[t] && (m = a.plugins[t](a, b[t])) && A.push(m);
        a.callPlugins = function(a, b) {
            b || (b = {});
            for (var e = 0; e < A.length; e++) if (a in A[e]) A[e][a](b)
        };
        a.ie10 && !b.onlyExternal && (h ? a.wrapper.classList.add("swiper-wp8-horizontal") : a.wrapper.classList.add("swiper-wp8-vertical"));
        if (b.loop && (k = a.slides.length, 0 != a.slides.length)) {
            m = t = "";
            for (q = 0; q < b.slidesPerSlide; q++) t += a.slides[q].outerHTML;
            for (q = k - b.slidesPerSlide; q < k; q++) m += a.slides[q].outerHTML;
            n.innerHTML = m + n.innerHTML + t;
            a._calcSlides();
            a.callPlugins("onCreateLoop")
        }
        var B = !1;
        a.reInit = function() {
            a.init(!0)
        };
        a.init = function(c) {
            var d = window.getComputedStyle(a.container, null).getPropertyValue("width"),
            e = window.getComputedStyle(a.container, null).getPropertyValue("height"),
            f = parseInt(d, 10),
            g = parseInt(e, 10);
			if (isNaN(f) || a.ie8 && 0 < d.indexOf("%")) f = a.container.offsetWidth - parseInt(window.getComputedStyle(a.container, null).getPropertyValue("padding-left"), 10) - parseInt(window.getComputedStyle(a.container, null).getPropertyValue("padding-right"), 10);
			if (isNaN(g) || a.ie8 && 0 < e.indexOf("%")) g = a.container.offsetHeight - parseInt(window.getComputedStyle(a.container, null).getPropertyValue("padding-top"), 10) - parseInt(window.getComputedStyle(a.container, null).getPropertyValue("padding-bottom"), 10);
            if (c || !(a.width == f && a.height == g)) {
                
				if (c || B) a._calcSlides(),
                b.pagination && a.updatePagination();
                a.width = f;
                a.height = g;
                d = h ? 1 : b.slidesPerSlide;
                c = h ? b.slidesPerSlide: 1;
                k = a.slides.length;
                b.scrollContainer ? (h || (n.style.width = "", n.style.height = "", a.slides[0].style.width = "", a.slides[0].style.height = ""), c = a.slides[0].offsetWidth, d = a.slides[0].offsetHeight, l = h ? a.width: a.height, p = h ? c: d, e = c, f = d) : (z ? (c = a.slides[0].offsetWidth, d = a.slides[0].offsetHeight) : (c = a.width / c, d = a.height / d), l = h ? a.width: a.height, p = h ? c: d, e = h ? k * c: a.width, f = h ? a.height: k * d, z && (b.slidesPerSlide = Math.round(l / p)));
                y = h ? e: f;
                for (g = 0; g < a.slides.length; g++) {
                    var j = a.slides[g];
                    z || (j.style.width = c + "px", j.style.height = c - (c*0.28) + "px");
                    if (b.onSlideInitialize) b.onSlideInitialize(a, j)
                }
                n.style.width = e + "px";
                n.style.height = c - (c*0.28) + "px";
                0 < b.initialSlide && (b.initialSlide < k && !B) && (a.realIndex = a.activeSlide = b.initialSlide, b.loop && (a.activeSlide = a.realIndex - b.slidesPerSlide), h ? (a.positions.current = -b.initialSlide * c, a.setTransform(a.positions.current, 0, 0)) : (a.positions.current = -b.initialSlide * d, a.setTransform(0, a.positions.current, 0)));
                B ? a.callPlugins("onInit") : a.callPlugins("onFirstInit");
                B = !0
            }
        };
        a.init();
        a.updatePagination = function() {
            if (! (2 > a.slides.length)) {
                var c = document.querySelectorAll(b.pagination + " ." + b.paginationActiveClass);
                if (c) {
                    for (var d = 0; d < c.length; d++) c.item(d).className = b.paginationClass;
                    for (var c = document.querySelectorAll(b.pagination + " ." + b.paginationClass).length, e = b.loop ? a.realIndex - b.slidesPerSlide: a.realIndex, f = e + (b.slidesPerSlide - 1), d = e; d <= f; d++) {
                        var g = d;
                        g >= c && (g -= c);
                        0 > g && (g = c + g);
                        g < k && (document.querySelectorAll(b.pagination + " ." + b.paginationClass).item(g).className = b.paginationClass + " " + b.paginationActiveClass);
                        d == e && (document.querySelectorAll(b.pagination + " ." + b.paginationClass).item(g).className += " swiper-activeslide-switch")
                    }
                }
            }
        };
        a.createPagination = function() {
            if (b.pagination && b.createPagination) {
                for (var c = "",
                d = a.slides.length,
                d = b.loop ? d - 2 * b.slidesPerSlide: d, e = 0; e < d; e++) c += '<span class="' + b.paginationClass + '"></span>';
                document.querySelectorAll(b.pagination)[0].innerHTML = c;
                a.updatePagination();
                a.callPlugins("onCreatePagination")
            }
        };
        a.createPagination();
        a.resizeEvent = "auto" === b.resizeEvent ? "onorientationchange" in window ? "orientationchange": "resize": b.resizeEvent;
        a.resizeFix = function() {
            a.callPlugins("beforeResizeFix");
            a.init();
            if (b.scrollContainer) {
                if ((h ? a.getTranslate("x") : a.getTranslate("y")) < -g()) {
                    var c = h ? -g() : 0,
                    d = h ? 0 : -g();
                    a.setTransition(0);
                    a.setTransform(c, d, 0)
                }
            } else a.swipeTo(a.activeSlide, 0, !1);
            a.callPlugins("afterResizeFix")
        };
        b.disableAutoResize || window.addEventListener(a.resizeEvent, a.resizeFix, !1);
        var C;
        a.startAutoPlay = function() {
            b.autoPlay && !b.loop ? C = setInterval(function() {
                var b = a.realIndex + 1;
                b == k && (b = 0);
                a.swipeTo(b)
            },
            b.autoPlay) : b.autoPlay && b.loop && (C = setInterval(function() {
                a.fixLoop();
                a.swipeNext(!0)
            },
            b.autoPlay));
            a.callPlugins("onAutoPlayStart")
        };
        a.stopAutoPlay = function() {
            C && clearInterval(C);
            a.callPlugins("onAutoPlayStop")
        };
        b.autoPlay && a.startAutoPlay();
        a.ie10 ? (n.addEventListener(a.touchEvents.touchStart, s, !1), document.addEventListener(a.touchEvents.touchMove, v, !1), document.addEventListener(a.touchEvents.touchEnd, r, !1)) : (a.support.touch && (n.addEventListener("touchstart", s, !1), n.addEventListener("touchmove", v, !1), n.addEventListener("touchend", r, !1)), b.simulateTouch && (n.addEventListener("mousedown", s, !1), document.addEventListener("mousemove", v, !1), document.addEventListener("mouseup", r, !1)));
        a.destroy = function(c) { (!1 === c ? c: 1) && window.removeEventListener(a.resizeEvent, a.resizeFix, !1);
            a.ie10 ? (n.removeEventListener(a.touchEvents.touchStart, s, !1), document.removeEventListener(a.touchEvents.touchMove, v, !1), document.removeEventListener(a.touchEvents.touchEnd, r, !1)) : (a.support.touch && (n.removeEventListener("touchstart", s, !1), n.removeEventListener("touchmove", v, !1), n.removeEventListener("touchend", r, !1)), n.removeEventListener("mousedown", s, !1), document.removeEventListener("mousemove", v, !1), document.removeEventListener("mouseup", r, !1));
            b.keyboardControl && document.removeEventListener("keydown", G, !1);
            b.mousewheelControl && a._wheelEvent && a.container.removeEventListener(a._wheelEvent, H, !1);
            b.autoPlay && a.stopAutoPlay();
            a.callPlugins("onDestroy")
        };
        a.allowLinks = !0;
        if (b.preventLinks) {
            t = a.container.querySelectorAll("a");
            for (m = 0; m < t.length; m++) t[m].addEventListener("click", j, !1)
        }
        if (b.keyboardControl) {
            var G = function(b) {
                var d = b.keyCode || b.charCode;
                h ? ((37 == d || 39 == d) && b.preventDefault(), 39 == d && a.swipeNext(), 37 == d && a.swipePrev()) : ((38 == d || 40 == d) && b.preventDefault(), 40 == d && a.swipeNext(), 38 == d && a.swipePrev())
            };
            document.addEventListener("keydown", G, !1)
        }
        a._wheelEvent = !1;
        if (b.mousewheelControl) {
            void 0 !== document.onmousewheel && (a._wheelEvent = "mousewheel");
            try {
                WheelEvent("wheel"),
                a._wheelEvent = "wheel"
            } catch(J) {}
            a._wheelEvent || (a._wheelEvent = "DOMMouseScroll");
            var H = function(c) {
                c.preventDefault && c.preventDefault();
                var d = a._wheelEvent,
                e;
                c.detail ? e = -c.detail: "mousewheel" == d ? e = c.wheelDelta: "DOMMouseScroll" == d ? e = -c.detail: "wheel" == d && (e = Math.abs(c.deltaX) > Math.abs(c.deltaY) ? -c.deltaX: -c.deltaY);
                b.freeMode ? (h ? a.getTranslate("x") : a.getTranslate("y"), h ? (d = a.getTranslate("x") + e, e = a.getTranslate("y"), 0 < d && (d = 0), d < -g() && (d = -g())) : (d = a.getTranslate("x"), e = a.getTranslate("y") + e, 0 < e && (e = 0), e < -g() && (e = -g())), a.setTransition(0), a.setTransform(d, e, 0)) : 0 > e ? a.swipeNext() : a.swipePrev();
                c.preventDefault();
                return ! 1
            };
            a._wheelEvent && a.container.addEventListener(a._wheelEvent, H, !1)
        }
        b.grabCursor && (a.container.style.cursor = "move", a.container.style.cursor = "grab", a.container.style.cursor = "-moz-grab", a.container.style.cursor = "-webkit-grab");
        var u = !1,
        D;
        a.swipeNext = function(c) { ! c && b.loop && a.fixLoop(); ! c && b.autoPlay && a.stopAutoPlay();
            a.callPlugins("onSwipeNext");
            c = h ? a.getTranslate("x") : a.getTranslate("y");
            var d = p * b.slidesPerGroup,
            d = Math.floor(Math.abs(c) / Math.floor(d)) * d + d;
            c = Math.abs(c);
            if (d != y && (!(c >= g()) || b.loop)) return d > g() && !b.loop && (d = g()),
            b.loop && d >= g() + l && (d = g() + l),
            h ? a.setTransform( - d, 0, 0) : a.setTransform(0, -d, 0),
            a.setTransition(b.speed),
            a.updateActiveSlide( - d),
            E(),
            !0
        };
        a.swipePrev = function(c) { ! c && b.loop && a.fixLoop(); ! c && b.autoPlay && a.stopAutoPlay();
            a.callPlugins("onSwipePrev");
            c = h ? a.getTranslate("x") : a.getTranslate("y");
            var d = p * b.slidesPerGroup;
            c = (Math.ceil( - c / d) - 1) * d;
            0 > c && (c = 0);
            h ? a.setTransform( - c, 0, 0) : a.setTransform(0, -c, 0);
            a.setTransition(b.speed);
            a.updateActiveSlide( - c);
            E();
            return ! 0
        };
        a.swipeReset = function() {
            a.callPlugins("onSwipeReset");
            var c = h ? a.getTranslate("x") : a.getTranslate("y"),
            d = p * b.slidesPerGroup,
            d = 0 > c ? Math.round(c / d) * d: 0,
            e = -g();
            b.scrollContainer && (d = 0 > c ? c: 0, e = l - p);
            d <= e && (d = e);
            b.scrollContainer && l > p && (d = 0);
            "horizontal" == b.mode ? a.setTransform(d, 0, 0) : a.setTransform(0, d, 0);
            a.setTransition(b.speed);
            a.updateActiveSlide(d);
            if (b.onSlideReset) b.onSlideReset(a);
            return ! 0
        };
        var I = !0;
        a.swipeTo = function(c, d, e) {
            c = parseInt(c, 10);
            a.callPlugins("onSwipeTo", {
                index: c,
                speed: d
            });
            if (! (c > k - 1) && (!(0 > c) || b.loop)) return e = !1 === e ? !1 : e || !0,
            d = 0 === d ? d: d || b.speed,
            b.loop && (c += b.slidesPerSlide),
            c > k - b.slidesPerSlide && (c = k - b.slidesPerSlide),
            c = -c * p,
            I && (b.loop && 0 < b.initialSlide && b.initialSlide < k) && (c -= b.initialSlide * p, I = !1),
            h ? a.setTransform(c, 0, 0) : a.setTransform(0, c, 0),
            a.setTransition(d),
            a.updateActiveSlide(c),
            e && E(),
            !0
        };
        a.updateActiveSlide = function(c) {
            a.previousSlide = a.realIndex;
            a.realIndex = Math.round( - c / p);
            b.loop ? (a.activeSlide = a.realIndex - b.slidesPerSlide, a.activeSlide >= k - 2 * b.slidesPerSlide && (a.activeSlide = k - 2 * b.slidesPerSlide - a.activeSlide), 0 > a.activeSlide && (a.activeSlide = k - 2 * b.slidesPerSlide + a.activeSlide)) : a.activeSlide = a.realIndex;
            a.realIndex == k && (a.realIndex = k - 1);
            0 > a.realIndex && (a.realIndex = 0);
            b.pagination && a.updatePagination()
        };
        a.fixLoop = function() {
            if (a.realIndex < b.slidesPerSlide) {
                var c = k - 3 * b.slidesPerSlide + a.realIndex;
                a.swipeTo(c, 0, !1)
            }
            a.realIndex > k - 2 * b.slidesPerSlide && (c = -k + a.realIndex + b.slidesPerSlide, a.swipeTo(c, 0, !1))
        };
        b.loop && a.swipeTo(0, 0, !1)
    }
};
Swiper.prototype = {
    plugins: {},
    transitionEnd: function(f, b) {
        var g = this,
        j = g.wrapper,
        s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
        if (f) for (var v = function() {
            f(g);
            if (!b) for (var r = 0; r < s.length; r++) j.removeEventListener(s[r], v, !1)
        },
        r = 0; r < s.length; r++) j.addEventListener(s[r], v, !1)
    },
    isSupportTouch: function() {
        return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
    },
    isSupport3D: function() {
        var f = document.createElement("div");
        f.id = "test3d";
        var b = !1;
        "webkitPerspective" in f.style && (b = !0);
        "MozPerspective" in f.style && (b = !0);
        "OPerspective" in f.style && (b = !0);
        "MsPerspective" in f.style && (b = !0);
        "perspective" in f.style && (b = !0);
        if (b && "webkitPerspective" in f.style) {
            var g = document.createElement("style");
            g.textContent = "@media (-webkit-transform-3d), (transform-3d), (-moz-transform-3d), (-o-transform-3d), (-ms-transform-3d) {#test3d{height:5px}}";
            document.getElementsByTagName("head")[0].appendChild(g);
            document.body.appendChild(f);
            b = 5 === f.offsetHeight;
            g.parentNode.removeChild(g);
            f.parentNode.removeChild(f)
        }
        return b
    },
    getTranslate: function(f) {
        var b = this.wrapper,
        g, j;
        g = (window.WebKitCSSMatrix ? new WebKitCSSMatrix(window.getComputedStyle(b, null).webkitTransform) : window.getComputedStyle(b, null).MozTransform || window.getComputedStyle(b, null).OTransform || window.getComputedStyle(b, null).MsTransform || window.getComputedStyle(b, null).msTransform || window.getComputedStyle(b, null).transform || window.getComputedStyle(b, null).getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(",");
        this.params.useCSS3Transforms ? ("x" == f && (j = 16 == g.length ? parseInt(g[12], 10) : parseInt(g[4], 10)), "y" == f && (j = 16 == g.length ? parseInt(g[13], 10) : parseInt(g[5], 10))) : ("x" == f && (j = parseInt(b.style.left, 10) || 0), "y" == f && (j = parseInt(b.style.top, 10) || 0));
        return j
    },
    setTransform: function(f, b, g) {
        var j = this.wrapper.style;
        f = f || 0;
        b = b || 0;
        g = g || 0;
        this.params.useCSS3Transforms ? this.support.threeD ? j.webkitTransform = j.MsTransform = j.msTransform = j.MozTransform = j.OTransform = j.transform = "translate3d(" + f + "px, " + b + "px, " + g + "px)": (j.webkitTransform = j.MsTransform = j.msTransform = j.MozTransform = j.OTransform = j.transform = "translate(" + f + "px, " + b + "px)", this.ie8 && (j.left = f + "px", j.top = b + "px")) : (j.left = f + "px", j.top = b + "px");
        this.callPlugins("onSetTransform", {
            x: f,
            y: b,
            z: g
        })
    },
    setTransition: function(f) {
        var b = this.wrapper.style;
        b.webkitTransitionDuration = b.MsTransitionDuration = b.msTransitionDuration = b.MozTransitionDuration = b.OTransitionDuration = b.transitionDuration = f / 1E3 + "s";
        this.callPlugins("onSetTransition", {
            duration: f
        })
    },
    ie8: function() {
        var f = -1;
        "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (f = parseFloat(RegExp.$1));
        return - 1 != f && 9 > f
    } (),
    ie10: window.navigator.msPointerEnabled
};
if (window.jQuery || window.Zepto)(function(f) {
    f.fn.swiper = function(b) {
        b = new Swiper(f(this)[0], b);
        f(this).data("swiper", b);
        return b
    }
})(window.jQuery || window.Zepto);