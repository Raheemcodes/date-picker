"use strict";
exports.__esModule = true;
exports.updateYearOnKeyDown = exports.updateActiveBtn = exports.goBack = exports.updateSelectedBtn = exports.updateYearOnClick = exports.updateRange = exports.getRange = exports.getYear = void 0;
var getYear = function (year, month, day) {
    var date = Date.UTC(year, month, day);
    return new Date(date).getFullYear();
};
exports.getYear = getYear;
var getRange = function (year) {
    var remaindar = year % 28;
    var from = year - remaindar + 1;
    var to = year - remaindar + 28;
    return { from: from, to: to };
};
exports.getRange = getRange;
var updateRange = function (nextYearEl, swipe) {
    var rangeEl = swipe.shadowRoot.querySelector('.year-view__range');
    rangeEl.textContent = "".concat(nextYearEl.id);
    swipe.currentTranslate = 0;
    swipe.transitioning = false;
};
exports.updateRange = updateRange;
var updateYearOnClick = function (event, swipe) {
    var btn = event.currentTarget;
    (0, exports.updateSelectedBtn)(btn, swipe);
};
exports.updateYearOnClick = updateYearOnClick;
var updateSelectedBtn = function (btn, swipe) {
    var _a, _b;
    var picker = swipe.picker;
    var AllBtn = (_b = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelectorAll('button');
    if (btn.classList.contains('limited'))
        return;
    AllBtn.forEach(function (el) {
        if (el.classList.contains('active') || el.classList.contains('selected')) {
            el.classList.remove('selected');
            el.classList.remove('active');
        }
    });
    btn.classList.add('active');
    btn.classList.add('selected');
    picker._selected.year = +btn.id.split('-')[1];
    picker._selected.day = 1;
    picker.navigate('month');
    window.removeEventListener('keydown', swipe.onKeydown);
};
exports.updateSelectedBtn = updateSelectedBtn;
var goBack = function (swipe) {
    window.removeEventListener('keydown', swipe.onKeydown);
    swipe.picker.navigate('calendar');
};
exports.goBack = goBack;
var updateActiveBtn = function (btn) {
    var _a, _b;
    var AllBtn = (_b = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelectorAll('button');
    AllBtn.forEach(function (el) {
        if (el.classList.contains('active'))
            el.classList.remove('active');
    });
    btn.classList.add('active');
};
exports.updateActiveBtn = updateActiveBtn;
var updateYearOnKeyDown = function (event, swipe) {
    if (!!swipe.transitioning)
        return;
    var parentEl = swipe.element.children[1];
    var activeBtn = parentEl.querySelector('.year-view__year.active');
    if (!activeBtn)
        return;
    var from = +parentEl.id.split('-')[0];
    var to = +parentEl.id.split('-')[1];
    var btn;
    var year = +activeBtn.id.split('-')[1];
    if (event.key == 'ArrowLeft') {
        year--;
        btn = navigateBack(year, parentEl.parentElement, from, swipe);
    }
    else if (event.key == 'ArrowRight') {
        year++;
        btn = navigateForward(year, parentEl.parentElement, to, swipe);
    }
    else if (event.key == 'ArrowUp') {
        year -= 4;
        btn = navigateBack(year, parentEl.parentElement, from, swipe);
    }
    else if (event.key == 'ArrowDown') {
        year += 4;
        btn = navigateForward(year, parentEl.parentElement, to, swipe);
    }
    else if (event.key == 'Enter') {
        btn = parentEl.querySelector('.year-view__year.active');
        (0, exports.updateSelectedBtn)(btn, swipe);
        return;
    }
    else
        return;
    if (btn.classList.contains('limited'))
        return;
    (0, exports.updateActiveBtn)(btn);
};
exports.updateYearOnKeyDown = updateYearOnKeyDown;
var navigateBack = function (year, parentEl, from, swipe) {
    if (year <= 0)
        return;
    if (year < from)
        swipe.left();
    var btn = parentEl.querySelector("#y-".concat(year));
    return btn;
};
var navigateForward = function (year, parentEl, to, swipe) {
    if (year > to)
        swipe.right();
    var btn = parentEl.querySelector("#y-".concat(year));
    return btn;
};
