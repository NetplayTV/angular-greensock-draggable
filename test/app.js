var app = angular.module('DemoApp', [
    'ngGreensockDraggable'
]);


/**
 * Main Controller
 */
function MainController($scope) {

    // /**
    //  * DRAG event handler
    //  */
    // $scope.onDrag = function(value) {
    //     $scope.currentRotation = value;
    // }
    //
    // /**
    //  * DRAG END event handler
    //  */
    // $scope.onDragEnd = function(value) {
    //
    //     $scope.currentRotation = value;
    //     console.log ("DRAG_END", value)
    // }

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