"use strict";
function app(s) {
    if (l === null || l === void 0 ? void 0 : l.innerHTML) {
        l.innerHTML = "";
    }
    l === null || l === void 0 ? void 0 : l.append(s);
}
function app1(s) {
    if (l1 === null || l1 === void 0 ? void 0 : l1.innerHTML) {
        l1.innerHTML = "";
    }
    l1 === null || l1 === void 0 ? void 0 : l1.append(s);
}
function nP(a, b) {
    return parseInt(a / b + "");
}
function Draw_f(x, y, type) {
    var ctx = canavas.getContext("2d");
    if (ctx == null) {
        return;
    }
    ctx.fillStyle = type;
    ctx.fillRect(x * 5, y * 5, 5, 5);
}
function distance(a, b) {
    var s = (a.x - b.x) * (a.x - b.x);
    var d = (a.y - b.y) * (a.y - b.y);
    return Math.sqrt(s + d);
}
function minPointStar(a, b) {
    var c = a.distanceLastPoint + a.distanceFisrtPoint;
    var d = b.distanceLastPoint + b.distanceFisrtPoint;
    return c < d;
}
function minPointDistra(a, b) {
    var c = a.distanceFisrtPoint;
    var d = b.distanceFisrtPoint;
    return c < d;
}
