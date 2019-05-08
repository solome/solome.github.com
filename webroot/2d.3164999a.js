(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 34:
/***/ (function(module, exports) {

var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var point = [
    { x: 40, y: 340 },
    { x: 360, y: 360 },
    { x: 20, y: 20 },
    { x: 340, y: 40 },
];
var drawBezierCurve = function (p) {
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    ctx.bezierCurveTo(p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y);
    ctx.stroke();
};
var drawPoint = function (ps, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    console.log(ps);
    ps.forEach(function (p) { return ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI); });
    ctx.fill();
};
drawBezierCurve(point);
drawPoint([point[0], point[3]], 'blue');
drawPoint([point[1], point[2]], 'red');


/***/ })

},[[34,0]]]);