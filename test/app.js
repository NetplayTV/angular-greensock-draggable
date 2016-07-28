var app = angular.module('DemoApp', [
    'ngGreensockDraggable'
]);


/**
 * Main Controller
 */
function MainController($scope) {

    this.bounds1 = {minX:0, maxX: 100};
    this.bounds2 = document.getElementsByClassName('container');
}

MainController.prototype.onPress = function() {
    console.log('onPress');
}
MainController.prototype.onDragStart = function() {
    console.log('onDragStart');
}
MainController.prototype.onDrag = function() {
    console.log('onDrag');
}
MainController.prototype.onDragEnd = function() {
    console.log('onDragEnd');
}
app.controller('MainController', MainController);