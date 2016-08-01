var app = angular.module('DemoApp', [
    'ngGreensockDraggable'
]);


/**
 * Main Controller
 */
function MainController($timeout) {

    var self = this;

    //set the bounds
    this.customBounds = document.getElementsByClassName('container');

    // //set new bounds after 5 seconds
    // $timeout(function() {
    //     self.customBounds = {minX:0, maxX: 100};
    // }, 5000);
    //
    // //set new bounds after 10 seconds
    // $timeout(function() {
    //     self.customBounds = document.getElementsByClassName('container');
    // }, 10000)
}

MainController.prototype.onPress = function() {
    console.log('MainController.onPress');
}
MainController.prototype.onDragStart = function() {
    console.log('MainController.onDragStart');
}
MainController.prototype.onDrag = function() {
    console.log('MainController.onDrag');
}
MainController.prototype.onDragEnd = function() {
    console.log('MainController.onDragEnd');
}
MainController.prototype.onRelease = function() {
    console.log('MainController.onRelease');
}
MainController.prototype.onLockAxis = function() {
    console.log('MainController.onLockAxis');
}
MainController.prototype.onClick = function() {
    console.log('MainController.onClick');
}
app.controller('MainController', MainController);