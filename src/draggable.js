var module = angular.module("ngGreensockDraggable", [])

/**
 * Defines the component
 * see https://greensock.com/docs/#/HTML5/GSAP/Utils/Draggable/ for more informations.
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
        onRelease: '&?',
        onClick: '&?',
    },
    transclude: true,
    controller: GreensockDraggableController,
    template: `
<div class="draggableContainer" style="position: absolute;">
    <div ng-transclude></div>
</div>`
});

/**
 * Defines the controller
 */
function GreensockDraggableController($element) {

    this.$element = $element;

    this._$draggableContainer = null;

    this._initialMousedownEvent = {};
    this._initialDragMouseEvent = {};
    this._currentPosition = {};
    this._draggable = null;
    this._dYThreshold = 20;
    this._chipToDrag = null;
}

GreensockDraggableController.prototype.$onInit = function () {
    console.log('$onInit');

    Draggable.create('.draggableContainer', {
        type: this.type,
        edgeResistance: this.edgeResistance,
        bounds: this.bounds,
        throwProps: this.throwProps,
        onPress: this._onPress.bind(this),
        onDragStart: this._onDragStart.bind(this),
        onDrag: this._onDrag.bind(this),
        onDragEnd: this._onDragEnd.bind(this),
        onRelease: this._onRelease.bind(this),
        onLockAxis: this._onLockAxis.bind(this),
        onClick: this._onClick.bind(this),
    });

    this._$draggableContainer = this.$element[0].getElementsByClassName('draggableContainer');

    console.log(this._draggableContainer);
    this._draggable = Draggable.get('.draggableContainer');
}

GreensockDraggableController.prototype.$onChanges = function (changes) {
    //Update the draggable bounds
    if (this._draggable) {
        if ( changes.hasOwnProperty('bounds')) {
            var currentBounds = changes.bounds.currentValue;
            if ( currentBounds instanceof HTMLCollection) {
                this._draggable.vars.bounds = currentBounds;
            }else {
                this._draggable.vars.bounds = {};
                this._draggable.vars.bounds = currentBounds;
            }
        }
    }
}


GreensockDraggableController.prototype._onPress = function(e) {

    if (this.onPress) {
        this.onPress.call();
    }
};

GreensockDraggableController.prototype._onDragStart = function(e) {

    this._initialDragMouseEvent = e;

    if (this.onDragStart) {
        this.onDragStart.call();
    }
};

GreensockDraggableController.prototype._onDrag = function(e) {

    this._currentPosition = this._getGestureCoordinates(e).x;

    if (this.onDrag) {
        this.onDrag.call();
    }
};

GreensockDraggableController.prototype._onRelease = function(e) {

    if (this.onRelease) {
        this.onRelease.call();
    }
};
GreensockDraggableController.prototype._onLockAxis = function(e) {

    if (this.onLockAxis) {
        this.onLockAxis.call();
    }
};
GreensockDraggableController.prototype._onClick = function(e) {

    if (this.onClick) {
        this.onClick.call();
    }
};

GreensockDraggableController.prototype._onDragEnd = function(e) {

    var endPosition = this._getGestureCoordinates(e).x;
    var dLeft = endPosition - this._currentPosition;
    console.log('_currentPosition:' + this._currentPosition)
    console.log('endPosition:' + endPosition)
    console.log('dLeft:' + dLeft);

    TweenLite.to(this._$draggableContainer, 0.5, {
        left: dLeft * 3,
        ease: Power4.easeOut
    });

    if (this.onDragEnd) {
        this.onDragEnd.call();
    }
};

GreensockDraggableController.prototype._getGestureCoordinates = function(gestureEvent) {

    var coordinates = {x: 0, y: 0};
    if (gestureEvent.type == 'touchmove' || gestureEvent.type == 'touchend') {
        if(gestureEvent.targetTouches && gestureEvent.targetTouches.length) {
            var touch = gestureEvent.targetTouches[0];
            coordinates.x = touch.pageX;
            coordinates.y = touch.pageY;
        }else if(gestureEvent.changedTouches && gestureEvent.changedTouches.length) {
            var touch = gestureEvent.changedTouches[0];
            coordinates.x = touch.pageX;
            coordinates.y = touch.pageY;
        }
    }else if (gestureEvent.type == 'mousemove' || gestureEvent.type == 'mouseup') {
        coordinates.x = gestureEvent.x;
        coordinates.y = gestureEvent.y;
    }

    return coordinates;
};