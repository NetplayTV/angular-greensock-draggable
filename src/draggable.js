var module = angular.module("ngGreensockDraggable", [])

/**
 * Define the component
 */
module.component('ngGreensockDraggable', {
    bindings: {
        type: '@',
        edgeResistance: '=',
        onPress: '&',
        onDragStart: '&',
        onDrag: '&',
        onDragEnd: '&',
    },
    transclude: true,
    template: '<div class="draggable-container"><div ng-transclude></div></div>',
    controller: GreensockDraggableController
});

/**
 * Define the controller
 */
function GreensockDraggableController() {

    this._initialMousedownEvent = {};
    this._initialDragMouseEvent = {};
    this._currentDragMouseEvent = {};
    this._draggable = null;
    this._dYThreshold = 20;
    this._chipToDrag = null;
}

GreensockDraggableController.prototype.$onInit = function () {
    console.log('$onInit');

    Draggable.create(".draggable-container", {
            type: this.type,
            edgeResistance: this.edgeResistance,
            onPress: this._onPress.bind(this),
            onDragStart: this._onDragStart.bind(this),
            onDrag: this._onDrag.bind(this),
            onDragEnd: this._onDragEnd.bind(this),
        }
    );

    this._draggable = Draggable.get('.draggable-container')
    console.log(this._draggable);
}

GreensockDraggableController.prototype._onPress = function() {
    if (this.onPress) {
        this.onPress.call();
    }
};

GreensockDraggableController.prototype._onDragStart = function() {
    if (this.onDragStart) {
        this.onDragStart.call();
    }
};

GreensockDraggableController.prototype._onDrag = function() {
    if (this.onDrag) {
        this.onDrag.call();
    }
};

GreensockDraggableController.prototype._onDragEnd = function() {
    if (this.onDragEnd) {
        this.onDragEnd.call();
    }
};