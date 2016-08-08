# Angular Greensock Draggable

Use Greensock Draggable library directly in Angular ( > 1.5 )



##Installation

1. Import the Greensock Draggable Library
```javascript
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/utils/Draggable.min.js"></script>
```

2. Import the TweenLite Library if you set the Draggable Configuration 'throw' to true (optional)
```javascript
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
```

3. Import the module 'ngGreensockDraggable'
```javascript
var app = angular.module('yourModule', [
    'ngGreensockDraggable'
]);
```

4. (Optional) If you are using ESLint, you have to specify the plugins in .eslintrc file
```javascript
{
  "extends": "eslint:recommended",
  "plugins": ["angular" , "Draggable" , "TweenLite"],
  "env": {
    "browser": true,
    "jasmine": true
  },
  "globals": {
    "angular": true,
    "module": true,
    "inject": true
  }
}

```

##Component
The component allows you to drag some objects vertically, horizontally or both.

ThrowProps can be used by setting **'throw-props'** to true. 
Otherwise, this component contains a throw effect (in beta version). To use it, set **'throw'** to true.

The component provides some **callbacks**:
- **postLink** (called after this controller's element and its children have been linked (transclude included). For more information, see https://docs.angularjs.org/guide/component)
- **onPress**
- **onDragStart**
- **onDrag** (this callback returns also the delta dX, dY between the dragStart and the drag coordinates)
- **onDragEnd**
- **onRelease**
- **onLockAxis**
- **onClick**


All these callbacks returns the gesture event (MouseEvent, TouchEvent)


The drag can be **enabled** / **disabled** on the fly by updating the value of the 'enable' property.

For more informations about the Draggable configuration, navigate to the [Greensock Draggable Docs](https://greensock.com/docs/#/HTML5/GSAP/Utils/Draggable/)

Example:
```html
 <ng-greensock-draggable
    identifier="myDraggableElement1"
    type="x,y"
    enable="enableDrag"
    edge-resistance="0.65"
    bounds="main.customBounds"
    z-index-boost="false"
    throw-props="false"
    throw="true"
    on-init="main.onInit()"
    on-press="main.onPress(event)"
    on-drag-start="main.onDragStart(event)"
    on-drag="main.onDrag(event, dX, dY)"
    on-drag-end="main.onDragEnd(event)"
    on-release="main.onRelease(event)"
    on-lock-axis="main.onLockAxis()"
    on-click="main.onClick(event)">
    
    <div>
        Your draggable element
    </div>
 </ng-greensock-draggable>
```

