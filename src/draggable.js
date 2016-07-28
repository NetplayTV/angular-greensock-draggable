var module = angular.module("ngGreensockDraggable", [])

/**
 * Defines the component
 */
module.component('ngGreensockDraggable', {
    scope: {},
    bindings: {

        //May be x | y | x,y | rotation | scroll | scrollTop | scrollLeft | top | left | top,left
        type: '@',
        edgeResistance: '@?',
        bounds: '<?',
        throwProps: '=?',
        onPress: '&?',
        onDragStart: '&?',
        onDrag: '&?',
        onDragEnd: '&?',
    },
    transclude: true,
    controller: GreensockDraggableController,
    template: `
<div class="draggable-container" style="position: absolute;">
    <div ng-transclude></div>
</div>`
});

/**
 * Defines the controller
 */
function GreensockDraggableController($element) {

    this.$element = $element;

    this._initialMousedownEvent = {};
    this._initialDragMouseEvent = {};
    this._currentDragMouseEvent = {};
    this._draggable = null;
    this._dYThreshold = 20;
    this._chipToDrag = null;
}

GreensockDraggableController.prototype.$onChanges = function (changes) {
    console.log('$onChanges');
    console.log(changes);
    console.log(this.bounds)

    //Update the draggable bounds
    if (this._draggable) {
        if ( changes.hasOwnProperty('bounds')) {
            var currentBounds = changes.bounds.currentValue;
            if ( currentBounds instanceof HTMLCollection) {
                this._draggable.vars.bounds = currentBounds;
            }else {
                this._draggable.vars.bounds = {};
                if (currentBounds.hasOwnProperty('minX')) {
                    this._draggable.vars.bounds.minX = currentBounds.minX;
                }
                if (currentBounds.hasOwnProperty('maxX')) {
                    this._draggable.vars.bounds.maxX = currentBounds.maxX;
                }
            }
        }
    }
}
GreensockDraggableController.prototype.$onInit = function () {
    console.log('$onInit');

    Draggable.create('.draggable-container', {
        type: this.type,
        edgeResistance: this.edgeResistance,
        bounds: this.bounds,
        throwProps: this.throwProps,
        onPress: this._onPress.bind(this),
        onDragStart: this._onDragStart.bind(this),
        onDrag: this._onDrag.bind(this),
        onDragEnd: this._onDragEnd.bind(this)
    });

    this._draggable = Draggable.get('.draggable-container')
    // console.log(this._draggable);
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

    console.log(this._draggable.vars);
    if (this.onDragEnd) {
        this.onDragEnd.call();
    }
};