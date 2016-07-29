var module = angular.module("ngGreensockDraggable", [])

/**
 * Defines the Component
 * For more informations, see https://greensock.com/docs/#/HTML5/GSAP/Utils/Draggable/
 */
module.component('ngGreensockDraggable', {
    scope: {},
    bindings: {
        type: '@',
        edgeResistance: '=?',
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
<div class="ngDraggable" style="position: absolute;">
    <div ng-transclude></div>
</div>`
});



/**
 * Defines the Controller
 */
function GreensockDraggableController($element) {

    /**
     * Component Root HTMLElement
     */
    this.$element = $element;

    /**
     * Draggable HTMLElement
     * @type {null}
     * @private
     */
    this._$draggableHTMLElement = null;

    /**
     * Draggable Object (applied to _$draggableHTMLElement)
     * @type {null}
     * @private
     */
    this._draggable = null;


    /**
     * Draggable Position on drag event
     * @type {{}}
     * @private
     */
    this._currentCoordinates = {};

    this._resistance = 0;

}

GreensockDraggableController.prototype.$onInit = function () {
    console.log('$onInit');

    //set the draggable HTMLElement
    this._$draggableHTMLElement = this.$element[0].getElementsByClassName('ngDraggable');
    console.log(this._$draggableHTMLElement);

    //create the draggable object
    Draggable.create('.ngDraggable', {
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

    this._draggable = Draggable.get('.ngDraggable');
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
GreensockDraggableController.prototype._onPress = function(e) {

    if (this.onPress) {
        this.onPress.call();
    }
};

GreensockDraggableController.prototype._onDragStart = function(e) {

    if (this.onDragStart) {
        this.onDragStart.call();
    }
};

GreensockDraggableController.prototype._onDrag = function(e) {

    this._currentCoordinates = this._getGestureCoordinates(e);

    if (this.onDrag) {
        this.onDrag.call();
    }
};
GreensockDraggableController.prototype._onRelease = function(e) {

    if (this.onRelease) {
        this.onRelease.call();
    }
};
GreensockDraggableController.prototype._onDragEnd = function(e) {

    var coordinatesAtEnd = this._getGestureCoordinates(e);
    var dLeft = coordinatesAtEnd.x - this._currentCoordinates.x;
    var dTop = coordinatesAtEnd.y - this._currentCoordinates.y;
    console.log('dLeft:' + dLeft);
    console.log('dTop:' + dTop);

    TweenLite.to(this._$draggableHTMLElement, 1, {
        left: dLeft * 3,
        top: dTop * 3,
        ease: Power4.easeOut,
        onUpdate: this._onTweenUpdate.bind(this)
    });

    if (this.onDragEnd) {
        this.onDragEnd.call();
    }
};

GreensockDraggableController.prototype._onTweenUpdate = function() {

}

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