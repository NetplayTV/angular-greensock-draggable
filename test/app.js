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

MainController.prototype.onPress = function(event) {
    console.log('MainController.onPress', event);
};
MainController.prototype.onDragStart = function(event) {
    console.log('MainController.onDragStart', event);
};
MainController.prototype.onDrag = function(event, dX, dY) {
    console.log('MainController.onDrag' , event, dX , dY);
};
MainController.prototype.onDragEnd = function(event) {
    console.log('MainController.onDragEnd', event);
};
MainController.prototype.onRelease = function(event) {
    console.log('MainController.onRelease', event);
};
MainController.prototype.onLockAxis = function() {
    console.log('MainController.onLockAxis');
};
MainController.prototype.onClick = function(event) {
    console.log('MainController.onClick', event);
};
app.controller('MainController', MainController);