import { _ } from 'vendors';
import { mixinDrag } from './m-draggable';
import { mixinResize } from './m-resizable';

function Draggable(element, options) {
    this.element = element;
    this.options = options;
    this.init();
}

Draggable.prototype = {
    init: function() {
        if (!this.element.getAttribute('data-init')) {
             this.element.setAttribute('data-init', 'true');
             this.initStructure();
             this.initMixins();
        }
    },
    initStructure: function() {
        this.elementParent = this.element.closest(this.options.placeholder);
        this.elementSize = this.element.querySelector(this.options.iconSize);
        this.drag = this.element.querySelector(this.options.iconDrag);
        this.dragProps = {};

        for (let prop in this.options.coords) {
            this.element.style[prop] = this.options.coords[prop] + 'px';
        }
    },

    initMixins: function () {
        this.initDraggable();
        this.initResizeble();
    },

    getCoords: function(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    },

    generateProps: function() {
        let styles = this.element.style.cssText.split(/;\s/g);
        let props = {}, styleArray, propName, propValue;

        styles.forEach((style) => {
            styleArray = style.split(/:\s/g);
            propName = styleArray[0];
            propValue = parseFloat(styleArray[1]);
            props[propName] = propValue;
        });

        return props;
    },

    makeCallback: function(name) {
        let args;

        if (typeof this.options[name] === 'function') {
            args = Array.prototype.slice.call(arguments);
            args.splice(0, 1);
            this.options[name].apply(this, args);
        }
    }
};

_.assignIn(Draggable.prototype, mixinResize, mixinDrag);


export default Draggable;