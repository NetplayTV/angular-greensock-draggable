var app = angular.module('DemoApp', [
    'ngGreensockDraggable'
]);


/**
 * Main Controller
 */
function MainController($timeout) {

    this.customBounds = document.getElementsByClassName('container');

    var self = this;
    $timeout(function() {
        self.customBounds = {minX:0, maxX: 100};
    }, 5000);

    $timeout(function() {
        self.customBounds = document.getElementsByClassName('container');
    }, 10000)
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