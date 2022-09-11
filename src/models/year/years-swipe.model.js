"use strict";
exports.__esModule = true;
exports.YearSwipe = void 0;
var years_view_1 = require("../../views/year/years.view");
var years_models_1 = require("./years.models");
var YearSwipe = /** @class */ (function () {
    function YearSwipe(picker) {
        var _this = this;
        this.isDragging = false;
        this.startPosX = 0;
        this.startPosY = 0;
        this.curIdx = 0;
        this.prevTranslate = [-352, 0, 352];
        this.currentTranslate = 0;
        this.prevIdx = 0;
        this.transitioning = false;
        this.onKeydown = function (e) {
            var postion = _this.element.getBoundingClientRect();
            if (postion.top >= 0 && postion.bottom <= innerHeight) {
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                    e.preventDefault();
                }
                (0, years_models_1.updateYearOnKeyDown)(e, _this);
            }
        };
        this.picker = picker;
        this.shadowRoot = picker.shadowRoot;
        var element = this.shadowRoot.querySelector('.year-view__slide');
        this.initialize(element);
        this.addListeners();
    }
    YearSwipe.prototype.getPositionX = function (event) {
        return event.touches[0].clientX;
    };
    YearSwipe.prototype.getPositionY = function (event) {
        return event.touches[0].clientY;
    };
    YearSwipe.prototype.touchStart = function (event) {
        this.isDragging = true;
        this.startPosX = this.getPositionX(event);
        this.startPosY = this.getPositionY(event);
    };
    YearSwipe.prototype.touchMove = function (event) {
        if (this.isDragging && !this.transitioning) {
            var currentPosition = this.getPositionX(event);
            var currentTranslateX = this.getPositionX(event) - this.startPosX;
            var currentTranslateY = this.getPositionY(event) - this.startPosY;
            if (Math.abs(currentTranslateY) < Math.abs(currentTranslateX)) {
                if (event.cancelable)
                    event.preventDefault();
                this.currentTranslate = currentPosition - this.startPosX;
                this.setSliderPosition();
            }
        }
    };
    YearSwipe.prototype.touchEnd = function () {
        this.isDragging = false;
        var movedBy = this.currentTranslate;
        if (movedBy == 0)
            return;
        if (movedBy < -this.threshold)
            this.curIdx++;
        if (movedBy > this.threshold)
            this.curIdx--;
        this.setPositionByIndex();
    };
    YearSwipe.prototype.initialize = function (element) {
        this.element = element;
        this.width = this.element.firstElementChild.clientWidth;
        this.threshold = this.width / 5;
    };
    YearSwipe.prototype.addListeners = function () {
        var dropdown = this.shadowRoot.querySelector('.year-view__btn');
        var left = this.shadowRoot.querySelector('.year-view__up-btn');
        var right = this.shadowRoot.querySelector('.year-view__down-btn');
        dropdown === null || dropdown === void 0 ? void 0 : dropdown.addEventListener('click', years_models_1.goBack.bind(this, this));
        left === null || left === void 0 ? void 0 : left.addEventListener('click', this.left.bind(this));
        right === null || right === void 0 ? void 0 : right.addEventListener('click', this.right.bind(this));
        this.element.addEventListener('touchstart', this.touchStart.bind(this), {
            passive: false
        });
        this.element.addEventListener('touchmove', this.touchMove.bind(this), {
            passive: false
        });
        this.element.addEventListener('touchend', this.touchEnd.bind(this), {
            passive: false
        });
        this.addListenersToBtn(this.element);
        window.addEventListener('keydown', this.onKeydown);
    };
    YearSwipe.prototype.addListenersToBtn = function (element) {
        var _this = this;
        element.querySelectorAll('button').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                (0, years_models_1.updateYearOnClick)(e, _this);
            });
        });
    };
    YearSwipe.prototype.left = function () {
        if (this.transitioning)
            return;
        this.curIdx--;
        this.setPositionByIndex();
    };
    YearSwipe.prototype.right = function () {
        if (this.transitioning)
            return;
        this.curIdx++;
        this.setPositionByIndex();
    };
    YearSwipe.prototype.slideLeft = function () {
        var _this = this;
        var childEl = this.element.children[1];
        var id = childEl.id.split('-');
        var nextElement = childEl.nextElementSibling;
        var newEl = (0, years_view_1.generateNewYear)(+id[0], 'left', this.picker);
        setTimeout(function () {
            _this.element.removeChild(_this.element.firstElementChild);
            _this.element.insertAdjacentHTML('beforeend', newEl);
            _this.addListenersToBtn(_this.element.children[2]);
            (0, years_models_1.updateRange)(nextElement, _this);
        }, 300);
    };
    YearSwipe.prototype.slideRight = function () {
        var _this = this;
        var childEl = this.element.children[1];
        var id = childEl.id.split('-');
        var nextElement = childEl.previousElementSibling;
        var newEl = (0, years_view_1.generateNewYear)(+id[0], 'right', this.picker);
        setTimeout(function () {
            _this.element.removeChild(_this.element.lastElementChild);
            _this.element.insertAdjacentHTML('afterbegin', newEl);
            _this.addListenersToBtn(_this.element.children[0]);
            (0, years_models_1.updateRange)(nextElement, _this);
        }, 300);
    };
    YearSwipe.prototype.setSliderPosition = function () {
        var _this = this;
        Array.from(this.element.children).forEach(function (child, index) {
            var childEl = child;
            childEl.style.left = "".concat((_this.prevTranslate[index] + _this.currentTranslate) / 16, "rem");
            _this.prevIdx = _this.curIdx;
        });
    };
    YearSwipe.prototype.setPositionByIndex = function () {
        var minyYear = this.picker.min.split('-')[0];
        var maxyYear = this.picker.max.split('-')[0];
        var min = +minyYear;
        var max = +maxyYear;
        var firstArr = this.element.firstElementChild.id.split('-');
        var lastArr = this.element.lastElementChild.id.split('-');
        var lastChildId = +lastArr[lastArr.length - 1] - 27;
        var firstChildId = +firstArr[firstArr.length - 1];
        if (this.prevIdx < this.curIdx &&
            !this.transitioning &&
            lastChildId <= max) {
            this.transitioning = true;
            this.currentTranslate = -352;
            this.slideLeft();
        }
        else if (this.prevIdx > this.curIdx &&
            !this.transitioning &&
            firstChildId >= min) {
            this.transitioning = true;
            this.currentTranslate = 352;
            this.slideRight();
        }
        else {
            this.currentTranslate = 0;
        }
        this.setSliderPosition();
    };
    return YearSwipe;
}());
exports.YearSwipe = YearSwipe;
