/* eslint-disable */
/**
 * This file was copied from https://github.com/Blasz/popper.js/blob/v1.0.10/dist/popper.es5.min.js which contains a patch
 * to 1.0.8 containing a fix to stop repainting before popper flipping.
 * License below.
 */
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.0.10
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e }; (function (e, t) { 'object' === ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t() })(this, function () { 'use strict'; function e(ue) { var ge = ue.offsetParent, be = ge && ge.nodeName; return be && 'BODY' !== be && 'HTML' !== be ? ge : window.document.documentElement } function t(ue, ge) { if (1 !== ue.nodeType) return []; var be = window.getComputedStyle(ue, null); return ge ? be[ge] : be } function o(ue) { return 'HTML' === ue.nodeName ? ue : ue.parentNode || ue.host } function r(ue) { if (!ue || -1 !== ['HTML', 'BODY', '#document'].indexOf(ue.nodeName)) return window.document.body; var ge = t(ue), be = ge.overflow, ye = ge.overflowX, we = ge.overflowY; return /(auto|scroll)/.test(be + we + ye) ? ue : r(o(ue)) } function s(ue) { var ge = ue.nodeName; return 'BODY' === ge || 'HTML' === ge ? !1 : 'fixed' === t(ue, 'position') || s(o(ue)) } function p(ue) { var ge = e(ue), be = s(ge); return be ? 'fixed' : 'absolute' } function f(ue, ge) { var be = 'x' === ge ? 'Left' : 'Top', ye = 'Left' == be ? 'Right' : 'Bottom'; return +ue['border' + be + 'Width'].split('px')[0] + +ue['border' + ye + 'Width'].split('px')[0] } function d(ue) { var be, ge = -1 !== navigator.appVersion.indexOf('MSIE 10'); if (ge) try { be = ue.getBoundingClientRect() } catch (Le) { be = {} } else be = ue.getBoundingClientRect(); var ye = { left: be.left, top: be.top, right: be.right, bottom: be.bottom, width: be.right - be.left, height: be.bottom - be.top }; if ('HTML' === ue.nodeName && ge) { var we = window.document.documentElement, xe = we.scrollTop, ve = we.scrollLeft; ye.top -= xe, ye.bottom -= xe, ye.left -= ve, ye.right -= ve } var Ee = be.width - (ue.clientWidth || be.right - be.left), Oe = be.height - (ue.clientHeight || be.bottom - be.top); if (Ee || Oe) { var Se = t(ue); Ee -= f(Se, 'x'), Oe -= f(Se, 'y') } return ye.right -= Ee, ye.width -= Ee, ye.bottom -= Oe, ye.height -= Oe, ye } function l(ue) { var ge = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top', be = 'top' === ge ? 'scrollTop' : 'scrollLeft', ye = ue.nodeName; if ('BODY' === ye || 'HTML' === ye) { var we = window.document.documentElement, xe = window.document.scrollingElement || we; return xe[be] } return ue[be] } function m(ue, ge) { var be = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], ye = l(ge, 'top'), we = l(ge, 'left'), xe = be ? -1 : 1; return ue.top += ye * xe, ue.bottom += ye * xe, ue.left += we * xe, ue.right += we * xe, ue } function h(ue, ge) { var be = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], ye = 3 < arguments.length && void 0 !== arguments[3] && arguments[3], we = r(ge), xe = d(ue), ve = d(ge), Ee = { top: xe.top - ve.top, left: xe.left - ve.left, bottom: xe.top - ve.top + xe.height, right: xe.left - ve.left + xe.width, width: xe.width, height: xe.height }; be && !ye ? Ee = m(Ee, we, !0) : e(ue).contains(we) && 'BODY' !== we.nodeName && (Ee = m(Ee, ge)); var Oe = t(ge), Se = +Oe.borderTopWidth.split('px')[0], Le = +Oe.borderLeftWidth.split('px')[0]; return Ee.top -= Se, Ee.bottom -= Se, Ee.left -= Le, Ee.right -= Le, Ee } function c() { var ue = window.document.body, ge = window.document.documentElement; return { height: Math.max(ue.scrollHeight, ue.offsetHeight, ge.clientHeight, ge.scrollHeight, ge.offsetHeight), width: Math.max(ue.scrollWidth, ue.offsetWidth, ge.clientWidth, ge.scrollWidth, ge.offsetWidth) } } function u(ue) { var ge; if ('HTML' === ue.nodeName) { var be = c(), ye = be.width, we = be.height; ge = { width: ye, height: we, left: 0, top: 0 } } else ge = { width: ue.offsetWidth, height: ue.offsetHeight, left: ue.offsetLeft, top: ue.offsetTop }; return ge.right = ge.left + ge.width, ge.bottom = ge.top + ge.height, ge } function g(ue) { var ge = u(ue); if ('HTML' !== ue.nodeName) { var be = e(ue), ye = g(be), we = { width: ge.offsetWidth, height: ge.offsetHeight, left: ge.left + ye.left, top: ge.top + ye.top, right: ge.right - ye.right, bottom: ge.bottom - ye.bottom }; return we } return ge } function w(ue) { var ge = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top', be = r(ue), ye = l(be, ge); return -1 === ['BODY', 'HTML'].indexOf(be.nodeName) ? ye + w(o(be), ge) : ye } function v(ue, ge, be) { var ye = { top: 0, left: 0 }, we = e(ue); if ('viewport' === be) { var xe = g(we), ve = xe.left, Ee = xe.top, Oe = window.document.documentElement, Se = Oe.clientWidth, Le = Oe.clientHeight; if (s(ue) || 'fixed' === p(ue)) ye.right = Se, ye.bottom = Le; else { var Pe = w(ue, 'left'), Ne = w(ue, 'top'); ye = { top: 0 - Ee, right: Se - ve + Pe, bottom: Le - Ee + Ne, left: 0 - ve } } } else { var Te; if (Te = 'scrollParent' === be ? r(o(ue)) : 'window' === be ? window.document.body : be, 'BODY' === Te.nodeName) { var We = c(), Be = We.height, He = We.width; ye.right = He, ye.bottom = Be } else ye = h(Te, we, s(ue)) } return ye.left += ge, ye.top += ge, ye.right -= ge, ye.bottom -= ge, ye } function E(ue, ge, be) { if (-1 === ue.indexOf('auto')) return ue; var ye = v(be, 0, 'scrollParent'), we = { top: ge.top - ye.top, right: ye.right - ge.right, bottom: ye.bottom - ge.bottom, left: ge.left - ye.left }, xe = Object.keys(we).sort(function (Ee, Oe) { return we[Oe] - we[Ee] })[0], ve = ue.split('-')[1]; return xe + (ve ? '-' + ve : '') } function L(ue, ge) { return Array.prototype.find ? ue.find(ge) : ue.filter(ge)[0] } function P(ue, ge, be) { if (Array.prototype.findIndex) return ue.findIndex(function (we) { return we[ge] === be }); var ye = L(ue, function (we) { return we[ge] === be }); return ue.indexOf(ye) } function N(ue) { return le({}, ue, { right: ue.left + ue.width, bottom: ue.top + ue.height }) } function T(ue) { var ge = window.getComputedStyle(ue), be = parseFloat(ge.marginTop) + parseFloat(ge.marginBottom), ye = parseFloat(ge.marginLeft) + parseFloat(ge.marginRight), we = { width: ue.offsetWidth + ye, height: ue.offsetHeight + be }; return we } function W(ue) { var ge = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }; return ue.replace(/left|right|bottom|top/g, function (be) { return ge[be] }) } function B(ue, ge, be, ye) { ye = ye.split('-')[0]; var we = T(ge), xe = { position: ue, width: we.width, height: we.height }, ve = -1 !== ['right', 'left'].indexOf(ye), Ee = ve ? 'top' : 'left', Oe = ve ? 'left' : 'top', Se = ve ? 'height' : 'width', Le = ve ? 'width' : 'height'; return xe[Ee] = be[Ee] + be[Se] / 2 - we[Se] / 2, xe[Oe] = ye === Oe ? be[Oe] - we[Le] : be[W(Oe)], xe } function H(ue, ge, be) { var ye = 'fixed' === ue.position, we = ue.isParentTransformed, xe = e(ye && we ? be : ge); return h(be, xe, ye, we) } function k(ue) { for (var ge = [!1, 'ms', 'webkit', 'moz', 'o'], be = ue.charAt(0).toUpperCase() + ue.slice(1), ye = 0; ye < ge.length - 1; ye++) { var we = ge[ye], xe = we ? '' + we + be : ue; if ('undefined' != typeof window.document.body.style[xe]) return xe } return null } function D(ue) { return ue && '[object Function]' === {}.toString.call(ue) } function C(ue, ge) { return ue.some(function (be) { var ye = be.name, we = be.enabled; return we && ye === ge }) } function R(ue, ge, be) { var ye = L(ue, function (we) { var xe = we.name; return xe === ge }); return !!ye && ue.some(function (we) { return we.name === be && we.enabled && we.order < ye.order }) } function M(ue) { return '' !== ue && !isNaN(parseFloat(ue)) && isFinite(ue) } function A(ue) { return 'BODY' !== ue.nodeName && ('none' !== t(ue, 'transform') || (o(ue) ? A(o(ue)) : ue)) } function Y(ue, ge) { return window.removeEventListener('resize', ge.updateBound), ge.scrollParents.forEach(function (be) { be.removeEventListener('scroll', ge.updateBound) }), ge.updateBound = null, ge.scrollParents = [], ge.scrollElement = null, ge.eventsEnabled = !1, ge } function I(ue, ge, be) { var ye = void 0 === be ? ue : ue.slice(0, P(ue, 'name', be)); return ye.forEach(function (we) { we.enabled && D(we.function) && (ge = we.function(ge, we)) }), ge } function U(ue, ge) { Object.keys(ge).forEach(function (be) { var ye = ge[be]; !1 === ye ? ue.removeAttribute(be) : ue.setAttribute(be, ge[be]) }) } function q(ue, ge) { Object.keys(ge).forEach(function (be) { var ye = ''; -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(be) && M(ge[be]) && (ye = 'px'), ue.style[be] = ge[be] + ye }) } function z(ue, ge, be, ye) { var we = 'BODY' === ue.nodeName, xe = we ? window : ue; xe.addEventListener(ge, be, { passive: !0 }), we || z(r(xe.parentNode), ge, be, ye), ye.push(xe) } function F(ue, ge, be, ye) { be.updateBound = ye, window.addEventListener('resize', be.updateBound, { passive: !0 }); var we = r(ue); return z(we, 'scroll', be.updateBound, be.scrollParents), be.scrollElement = we, be.eventsEnabled = !0, be } function X(ue) { return 'end' === ue ? 'start' : 'start' === ue ? 'end' : ue } for (var te = 'undefined' != typeof window && 'undefined' != typeof window.document, oe = ['Edge', 'Trident', 'Firefox'], ie = 0, re = 0; re < oe.length; re += 1)if (te && 0 <= navigator.userAgent.indexOf(oe[re])) { ie = 1; break } var ne = te && window.Promise, se = ne ? function (ue) { var ge = !1; return function () { ge || (ge = !0, Promise.resolve().then(function () { ge = !1, ue() })) } } : function (ue) { var ge = !1; return function () { ge || (ge = !0, setTimeout(function () { ge = !1, ue() }, ie)) } }, pe = function classCallCheck(ue, ge) { if (!(ue instanceof ge)) throw new TypeError('Cannot call a class as a function') }, fe = function () { function ue(ge, be) { for (var we, ye = 0; ye < be.length; ye++)we = be[ye], we.enumerable = we.enumerable || !1, we.configurable = !0, 'value' in we && (we.writable = !0), Object.defineProperty(ge, we.key, we) } return function (ge, be, ye) { return be && ue(ge.prototype, be), ye && ue(ge, ye), ge } }(), de = function defineProperty(ue, ge, be) { return ge in ue ? Object.defineProperty(ue, ge, { value: be, enumerable: !0, configurable: !0, writable: !0 }) : ue[ge] = be, ue }, le = Object.assign || function (ue) { for (var be, ge = 1; ge < arguments.length; ge++)for (var ye in be = arguments[ge], be) Object.prototype.hasOwnProperty.call(be, ye) && (ue[ye] = be[ye]); return ue }, ce = function () { function ue(ge, be) { var ye = this, we = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}; pe(this, ue), this.scheduleUpdate = function () { return requestAnimationFrame(ye.update) }, this.update = se(this.update.bind(this)), this.options = le({}, ue.Defaults, we), this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }, this.reference = ge.jquery ? ge[0] : ge, this.popper = be.jquery ? be[0] : be, this.modifiers = Object.keys(ue.Defaults.modifiers).map(function (ve) { return le({ name: ve }, ue.Defaults.modifiers[ve]) }), this.modifiers = this.modifiers.map(function (ve) { var Ee = we.modifiers && we.modifiers[ve.name] || {}; return le({}, ve, Ee) }), we.modifiers && (this.options.modifiers = le({}, ue.Defaults.modifiers, we.modifiers), Object.keys(we.modifiers).forEach(function (ve) { if (void 0 === ue.Defaults.modifiers[ve]) { var Ee = we.modifiers[ve]; Ee.name = ve, ye.modifiers.push(Ee) } })), this.state.position = p(this.reference), this.modifiers = this.modifiers.sort(function (ve, Ee) { return ve.order - Ee.order }), this.modifiers.forEach(function (ve) { ve.enabled && D(ve.onLoad) && ve.onLoad(ye.reference, ye.popper, ye.options, ve, ye.state) }), this.state.isParentTransformed = A(this.popper.parentNode), this.update(); var xe = this.options.eventsEnabled; xe && this.enableEventListeners(), this.state.eventsEnabled = xe } return fe(ue, [{ key: 'update', value: function () { if (!this.state.isDestroyed) { var be = { instance: this, styles: {}, attributes: {}, flipped: !1, offsets: {} }; this.state.position = p(this.reference), q(this.popper, { position: this.state.position }), be.offsets.reference = H(this.state, this.popper, this.reference), be.placement = E(this.options.placement, be.offsets.reference, this.popper), be.originalPlacement = this.options.placement, be.offsets.popper = B(this.state, this.popper, be.offsets.reference, be.placement), be = I(this.modifiers, be), this.state.isCreated ? this.options.onUpdate(be) : (this.state.isCreated = !0, this.options.onCreate(be)) } } }, { key: 'destroy', value: function () { return this.state.isDestroyed = !0, C(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[k('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this } }, { key: 'enableEventListeners', value: function () { this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate)) } }, { key: 'disableEventListeners', value: function () { this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = Y(this.reference, this.state)) } }]), ue }(); return ce.Utils = { computeAutoPlacement: E, debounce: se, findIndex: P, getBordersSize: f, getBoundaries: v, getBoundingClientRect: d, getClientRect: N, getOffsetParent: e, getOffsetRect: u, getOffsetRectRelativeToCustomParent: h, getOuterSizes: T, getParentNode: o, getPopperOffsets: B, getPosition: p, getReferenceOffsets: H, getScroll: l, getScrollParent: r, getStyleComputedProperty: t, getSupportedPropertyName: k, getTotalScroll: w, getWindowSizes: c, includeScroll: m, isFixed: s, isFunction: D, isModifierEnabled: C, isModifierRequired: R, isNumeric: M, isTransformed: A, removeEventListeners: Y, runModifiers: I, setAttributes: U, setStyles: q, setupEventListeners: F }, ce.placements = ['auto', 'auto-start', 'auto-end', 'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'], ce.Defaults = { placement: 'bottom', eventsEnabled: !0, onCreate: function () { }, onUpdate: function () { }, modifiers: { shift: { order: 100, enabled: !0, function: function (ue) { var ge = ue.placement, be = ge.split('-')[0], ye = ge.split('-')[1]; if (ye) { var we = ue.offsets.reference, xe = N(ue.offsets.popper), ve = -1 !== ['bottom', 'top'].indexOf(be), Ee = ve ? 'left' : 'top', Oe = ve ? 'width' : 'height', Se = { start: de({}, Ee, we[Ee]), end: de({}, Ee, we[Ee] + we[Oe] - xe[Oe]) }; ue.offsets.popper = le({}, xe, Se[ye]) } return ue } }, offset: { order: 200, enabled: !0, function: function (ue, ge) { var we, be = ue.placement, ye = ue.offsets.popper; return M(ge.offset) ? we = [ge.offset, 0] : (we = ge.offset.split(' '), we = we.map(function (xe, ve) { var Ee = xe.match(/(\d*\.?\d*)(.*)/), Oe = +Ee[1], Se = Ee[2], Le = -1 !== be.indexOf('right') || -1 !== be.indexOf('left'); 1 === ve && (Le = !Le); var Pe = Le ? 'height' : 'width'; if (0 === Se.indexOf('%')) { var Ne; switch (Se) { case '%p': Ne = ue.offsets.popper; break; case '%': case '$r': default: Ne = ue.offsets.reference; }var Te = N(Ne), We = Te[Pe]; return We / 100 * Oe } if ('vh' === Se || 'vw' === Se) { var Be; return Be = 'vh' === Se ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0), Be / 100 * Oe } return 'px' === Se ? +Oe : +xe })), -1 === ue.placement.indexOf('left') ? -1 === ue.placement.indexOf('right') ? -1 === ue.placement.indexOf('top') ? -1 !== ue.placement.indexOf('bottom') && (ye.left += we[0], ye.top += we[1] || 0) : (ye.left += we[0], ye.top -= we[1] || 0) : (ye.top += we[0], ye.left += we[1] || 0) : (ye.top += we[0], ye.left -= we[1] || 0), ue }, offset: 0 }, preventOverflow: { order: 300, enabled: !0, function: function (ue, ge) { var be = ge.boundariesElement || e(ue.instance.popper), ye = v(ue.instance.popper, ge.padding, be); ge.boundaries = ye; var we = ge.priority, xe = N(ue.offsets.popper), ve = { primary: function (Oe) { var Se = xe[Oe]; return xe[Oe] < ye[Oe] && !ge.escapeWithReference && (Se = Math.max(xe[Oe], ye[Oe])), de({}, Oe, Se) }, secondary: function (Oe) { var Se = 'right' === Oe ? 'left' : 'top', Le = xe[Se]; return xe[Oe] > ye[Oe] && !ge.escapeWithReference && (Le = Math.min(xe[Se], ye[Oe] - ('right' === Oe ? xe.width : xe.height))), de({}, Se, Le) } }; return we.forEach(function (Ee) { var Oe = -1 === ['left', 'top'].indexOf(Ee) ? 'secondary' : 'primary'; xe = le({}, xe, ve[Oe](Ee)) }), ue.offsets.popper = xe, ue }, priority: ['left', 'right', 'top', 'bottom'], padding: 5, boundariesElement: 'scrollParent' }, keepTogether: { order: 400, enabled: !0, function: function (ue) { var ge = N(ue.offsets.popper), be = ue.offsets.reference, ye = ue.placement.split('-')[0], we = Math.floor, xe = -1 !== ['top', 'bottom'].indexOf(ye), ve = xe ? 'right' : 'bottom', Ee = xe ? 'left' : 'top', Oe = xe ? 'width' : 'height'; return ge[ve] < we(be[Ee]) && (ue.offsets.popper[Ee] = we(be[Ee]) - ge[Oe]), ge[Ee] > we(be[ve]) && (ue.offsets.popper[Ee] = we(be[ve])), ue } }, arrow: { order: 500, enabled: !0, function: function (ue, ge) { if (!R(ue.instance.modifiers, 'arrow', 'keepTogether')) return console.warn('WARNING: `keepTogether` modifier is required by arrow modifier in order to work, be sure to include it before `arrow`!'), ue; var be = ge.element; if ('string' == typeof be) { if (be = ue.instance.popper.querySelector(be), !be) return ue; } else if (!ue.instance.popper.contains(be)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), ue; var ye = ue.placement.split('-')[0], we = N(ue.offsets.popper), xe = ue.offsets.reference, ve = -1 !== ['left', 'right'].indexOf(ye), Ee = ve ? 'height' : 'width', Oe = ve ? 'top' : 'left', Se = ve ? 'left' : 'top', Le = ve ? 'bottom' : 'right', Pe = T(be)[Ee]; xe[Le] - Pe < we[Oe] && (ue.offsets.popper[Oe] -= we[Oe] - (xe[Le] - Pe)), xe[Oe] + Pe > we[Le] && (ue.offsets.popper[Oe] += xe[Oe] + Pe - we[Le]); var Ne = xe[Oe] + xe[Ee] / 2 - Pe / 2, Te = Ne - N(ue.offsets.popper)[Oe]; return Te = Math.max(Math.min(we[Ee] - Pe, Te), 0), ue.arrowElement = be, ue.offsets.arrow = {}, ue.offsets.arrow[Oe] = Te, ue.offsets.arrow[Se] = '', ue }, element: '[x-arrow]' }, flip: { order: 600, enabled: !0, function: function (ue, ge) { if (C(ue.instance.modifiers, 'inner')) return ue; if (ue.flipped && ue.placement === ue.originalPlacement) return ue; var be = v(ue.instance.popper, ge.padding, ge.boundariesElement), ye = ue.placement.split('-')[0], we = W(ye), xe = ue.placement.split('-')[1] || '', ve = []; return ve = 'flip' === ge.behavior ? [ye, we] : ge.behavior, ve.forEach(function (Ee, Oe) { if (ye !== Ee || ve.length === Oe + 1) return ue; ye = ue.placement.split('-')[0], we = W(ye); var Se = N(ue.offsets.popper), Le = ue.offsets.reference, Pe = Math.floor, Ne = 'left' === ye && Pe(Se.right) > Pe(Le.left) || 'right' === ye && Pe(Se.left) < Pe(Le.right) || 'top' === ye && Pe(Se.bottom) > Pe(Le.top) || 'bottom' === ye && Pe(Se.top) < Pe(Le.bottom), Te = Pe(Se.left) < Pe(be.left), We = Pe(Se.right) > Pe(be.right), Be = Pe(Se.top) < Pe(be.top), He = Pe(Se.bottom) > Pe(be.bottom), ke = 'left' === ye && Te || 'right' === ye && We || 'top' === ye && Be || 'bottom' === ye && He, De = -1 !== ['top', 'bottom'].indexOf(ye), Ce = !!ge.flipVariations && (De && 'start' === xe && Te || De && 'end' === xe && We || !De && 'start' === xe && Be || !De && 'end' === xe && He); (Ne || ke || Ce) && (ue.flipped = !0, (Ne || ke) && (ye = ve[Oe + 1]), Ce && (xe = X(xe)), ue.placement = ye + (xe ? '-' + xe : ''), ue.offsets.popper = B(ue.instance.state.position, ue.instance.popper, ue.offsets.reference, ue.placement), ue = I(ue.instance.modifiers, ue, 'flip')) }), ue }, behavior: 'flip', padding: 5, boundariesElement: 'viewport' }, inner: { order: 700, enabled: !1, function: function (ue) { var ge = ue.placement, be = ge.split('-')[0], ye = N(ue.offsets.popper), we = N(ue.offsets.reference), xe = -1 !== ['left', 'right'].indexOf(be), ve = -1 === ['top', 'left'].indexOf(be); return ye[xe ? 'left' : 'top'] = we[ge] - (ve ? ye[xe ? 'width' : 'height'] : 0), ue.placement = W(ge), ue.offsets.popper = N(ye), ue } }, hide: { order: 800, enabled: !0, function: function (ue) { if (!R(ue.instance.modifiers, 'hide', 'preventOverflow')) return console.warn('WARNING: preventOverflow modifier is required by hide modifier in order to work, be sure to include it before hide!'), ue; var ge = ue.offsets.reference, be = L(ue.instance.modifiers, function (ye) { return 'preventOverflow' === ye.name }).boundaries; if (ge.bottom < be.top || ge.left > be.right || ge.top > be.bottom || ge.right < be.left) { if (!0 === ue.hide) return ue; ue.hide = !0, ue.attributes['x-out-of-boundaries'] = '' } else { if (!1 === ue.hide) return ue; ue.hide = !1, ue.attributes['x-out-of-boundaries'] = !1 } return ue } }, applyStyle: { order: 900, enabled: !0, gpuAcceleration: !0, function: function (ue, ge) { var be = { position: ue.offsets.popper.position }, ye = { 'x-placement': ue.placement }, we = Math.round(ue.offsets.popper.left), xe = Math.round(ue.offsets.popper.top), ve = k('transform'); return ge.gpuAcceleration && ve ? (be[ve] = 'translate3d(' + we + 'px, ' + xe + 'px, 0)', be.top = 0, be.left = 0, be.willChange = 'transform') : (be.left = we, be.top = xe, be.willChange = 'top, left'), q(ue.instance.popper, le({}, be, ue.styles)), U(ue.instance.popper, le({}, ye, ue.attributes)), ue.offsets.arrow && q(ue.arrowElement, ue.offsets.arrow), ue }, onLoad: function (ue, ge, be, ye, we) { var xe = H(we, ge, ue); return be.placement = E(be.placement, xe, ge), ge.setAttribute('x-placement', be.placement), be } } } }, ce });

//# sourceMappingURL=popper.es5.min.js.map
