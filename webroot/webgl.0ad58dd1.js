(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ 21:
/***/ (function(module, exports) {

// WebGL Demos
function main() {
    var canvas = document.querySelector('#webgl-canvas');
    var gl = canvas.getContext('webgl');
    gl.clearColor(0, 1, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    console.log('gl', gl);
}
document.addEventListener('DOMContentLoaded', main);


/***/ })

},[[21,0]]]);