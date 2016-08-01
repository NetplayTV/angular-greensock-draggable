var module = angular.module("ngGreensockDraggable", [])

/**
 * Defines the Component
 * For more informations, see https://greensock.com/docs/#/HTML5/GSAP/Utils/Draggable/
 */
module.component('ngGreensockDraggable', {
    scope: {},
    bindings: {
        type: '@',
        enable: '<?',
        edgeResistance: '=?',
        bounds: '<?',
        zIndexBoost: '=?',
        throwProps: '=?',
        throw: '=?', // Custom throw effect (beta). To use it, make sure that throwProps is not set to true
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
    this._dragCoordinates = {};

}

GreensockDraggableController.prototype.$onInit = function () {

    //set the draggable HTMLElement
    this._$draggableHTMLElement = this.$element[0].getElementsByClassName('ngDraggable');

    //create the draggable object
    Draggable.create('.ngDraggable', {
        type: this.type,
        enable: this.enable,
        edgeResistance: this.edgeResistance,
        bounds: this.bounds,
        throwProps: this.throwProps,
        zIndexBoost: this.zIndexBoost,
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

        if ( changes.hasOwnProperty('enable')) {
            if (changes.enable.currentValue) {
                this._draggable.enable();
            }else {
                this._draggable.disable();
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

    this._dragCoordinates = [];

    if (this.onDragStart) {
        this.onDragStart.call();
    }
};

GreensockDraggableController.prototype._onDrag = function(e) {

    this._dragCoordinates.push(this._getGestureCoordinates(e));

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

    if (this.throw && this.throwProps == false) {

        //get relevant coordinates to calculate the delta
        var relevantCoordinates = this._dragCoordinates[this._dragCoordinates.length - 1];
        if (this._dragCoordinates.length > 1) {
            relevantCoordinates = this._dragCoordinates[this._dragCoordinates.length - 2];
        }

        //computes the delta
        var dX = 0;
        var dY = 0;
        var coordinatesAtEnd = this._getGestureCoordinates(e);
        if (this.type === 'x' || this.type === 'x,y') {
            dX = coordinatesAtEnd.x - relevantCoordinates.x;
        }
        if (this.type === 'y' || this.type === 'x,y') {
            dY = coordinatesAtEnd.y - relevantCoordinates.y;
        }

        //animation
        TweenLite.to(this._$draggableHTMLElement, 1, {
            x: "+=" + (dX * 3),
            y: "+=" + (dY * 3),
            ease: Power4.easeOut,
            onUpdate: this._onThrownUpdate.bind(this)
        });
    }


    if (this.onDragEnd) {
        this.onDragEnd.call();
    }
};

GreensockDraggableController.prototype._onThrownUpdate = function() {

    //constraint maxX
    if (this._draggable.x > this._draggable.maxX) {
        TweenLite.set(this._$draggableHTMLElement,{ x: this._draggable.maxX} );

    //constraint minX
    }else if (this._draggable.x < this._draggable.minX) {
        TweenLite.set(this._$draggableHTMLElement,{ x: this._draggable.minX} );

    //constraint maxY
    }else if (this._draggable.y > this._draggable.maxY) {
        TweenLite.set(this._$draggableHTMLElement,{ y: this._draggable.maxY} );

    //constraint minY
    }else if (this._draggable.y < this._draggable.minY) {
        TweenLite.set(this._$draggableHTMLElement, {y: this._draggable.minY});
    }

    this._draggable.update();
}

/**
 * Returns the gesture coordinates {x,y} regarding the gesture event type (MouseEvent, TouchEvent)
 * @param gestureEvent
 * @returns {{x: number, y: number}}
 * @private
 */
GreensockDraggableController.prototype._getGestureCoordinates = function(gestureEvent) {

    var coordinates = {x: 0, y: 0};
    if (gestureEvent instanceof TouchEvent) {

        if(gestureEvent.targetTouches && gestureEvent.targetTouches.length) {
            var touch = gestureEvent.targetTouches[0];
            coordinates.x = touch.pageX;
            coordinates.y = touch.pageY;
        }else if(gestureEvent.changedTouches && gestureEvent.changedTouches.length) {
            var touch = gestureEvent.changedTouches[0];
            coordinates.x = touch.pageX;
            coordinates.y = touch.pageY;
        }
    }else if (gestureEvent instanceof MouseEvent) {
        coordinates.x = gestureEvent.x;
        coordinates.y = gestureEvent.y;
    }

    return coordinates;
};