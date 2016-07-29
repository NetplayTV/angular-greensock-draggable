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
MainController.prototype.onRelease = function() {
    console.log('onRelease');
}
MainController.prototype.onLockAxis = function() {
    console.log('onLockAxis');
}
MainController.prototype.onClick = function() {
    console.log('onClick');
}
app.controller('MainController', MainController);