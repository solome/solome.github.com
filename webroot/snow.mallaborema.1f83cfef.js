(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return snow; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

var randomRange = function (min, max) { return ((Math.random() * (max - min)) + min); };
function snow() {
    var camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 100;
    var scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    var textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]();
    var map = textureLoader.load('//vrlab-image4.ljcdn.com/release/web/snow.png');
    var material = new three__WEBPACK_IMPORTED_MODULE_0__["SpriteMaterial"]({ map: map });
    var amount = 360;
    var fallSpeen = 2;
    var halfX = window.innerWidth / 2;
    var halfY = window.innerHeight / 2;
    var mouseX = 0;
    var mouseY = 0;
    var particles = [];
    for (var i = 0; i < amount; i++) {
        var particle = new three__WEBPACK_IMPORTED_MODULE_0__["Sprite"](material);
        var randomScale = randomRange(10, 20);
        particle.position.x = randomRange(-1000, 1000);
        particle.position.y = randomRange(-1000, 1000);
        particle.position.z = randomRange(-1000, 1000);
        particle.scale.x = particle.scale.y = particle.scale.z = randomScale;
        particle.userData.v = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, -fallSpeen, 0);
        particle.userData.v.z = (1 * randomRange(-1, 1));
        particle.userData.v.x = (1 * randomRange(-1, 1));
        particles.push(particle);
        scene.add(particle);
    }
    var renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    var container = document.createElement('div');
    container.setAttribute('style', 'position: absolute;pointer-events: none;top: 0;left: 0;width: 100%;height: 100%;');
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);
    var mouseHandler = function (e) {
        mouseX = e.clientX - halfX;
        mouseY = e.clientY - halfY;
    };
    var touchHandler = function (e) {
        e.preventDefault();
        mouseX = e.touches[0].pageX - halfX;
        mouseY = e.touches[0].pageY - halfY;
    };
    document.addEventListener('mousemove', mouseHandler, false);
    document.addEventListener('touchstart', touchHandler, false);
    document.addEventListener('touchmove', touchHandler, false);
    var render = function () {
        for (var _i = 0, particles_1 = particles; _i < particles_1.length; _i++) {
            var particle = particles_1[_i];
            var pp = particle.position;
            pp.add(particle.userData.v);
            if (pp.y < -1000) {
                pp.y = 1000;
            }
            if (pp.x > 1000) {
                pp.x = -1000;
            }
            else if (pp.x < -1000) {
                pp.x = 1000;
            }
            if (pp.z > 1000) {
                pp.z = -1000;
            }
            else if (pp.z < -1000) {
                pp.z = 1000;
            }
        }
        camera.position.x += (mouseX - camera.position.x) * 0.0005;
        camera.position.y += (-mouseY - camera.position.y) * 0.0005;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    };
    var animate = function () {
        requestAnimationFrame(animate);
        render();
    };
    animate();
}


/***/ })

}]);