export default class DrawSelection {
    constructor(element, callback) {
        this.element = element;
        this.callback = callback;
        this.isInitialize();
    }

    isInitialize() {
        if (!this.element.getAttribute('data-init')) {
             this.element.setAttribute('data-init', 'true');
             this.initStructure();
             this.attachEvents();
        }
    }

    initStructure() {
        this.props = {};
    }

    attachEvents() {
        this.onPrepareDimension = (event) => { this.prepareDimension(event) };
        this.onChangeDimension = (event) => { this.changeDimension(event) };
        this.onClearDimension = (event) => { this.clearDimension(event) };

        this.element.addEventListener('contextmenu', (event) => { event.preventDefault();}, false);
        this.element.addEventListener('mousedown', this.onPrepareDimension, false);
    }

    createFakeElement(event) {
        let x = event.pageX - this.element.getBoundingClientRect().left - pageXOffset;
        let y = event.pageY - this.element.getBoundingClientRect().top  - pageYOffset;

        this.fake = document.createElement('div');
        this.fake.classList.add('paint__item-fake');
        this.fake.style.left = x + 'px';
        this.fake.style.top  = y + 'px';
        this.element.appendChild(this.fake);
    }

    prepareDimension(event) {
        if (event.target.classList.contains('paint__item') || event.target.closest('.paint__item')) {
            return;
        }

        this.createFakeElement(event);
        this.props.top  = event.pageY;
        this.props.left = event.pageX;
        this.props.width  = parseInt(getComputedStyle(this.fake).width, 10);
        this.props.height = parseInt(getComputedStyle(this.fake).height, 10);

        event.preventDefault();

        window.addEventListener('mousemove', this.onChangeDimension, false);
        window.addEventListener('mouseup',   this.onClearDimension, false);
    }

    changeDimension(event) {
        let w = this.props.width  + event.pageX - this.props.left;
        let h = this.props.height + event.pageY - this.props.top;

        this.fake.style.height = h +'px';
        this.fake.style.width  = w +'px';
    }

    clearDimension() {
        const props = this.generateProps();

        setTimeout(() => {
            if (this.fake) {
                this.fake.parentNode.removeChild(this.fake);
            }
        }, 5);

        if (typeof this.callback.onClearDimension === 'function') {
            this.callback.onClearDimension(props);
        }

        window.removeEventListener('mousemove', this.onChangeDimension, false);
        window.removeEventListener('mouseup',   this.onClearDimension, false);
    }

    generateProps() {
        let styles = this.fake.style.cssText.split(/;\s/g);
        let props = {}, styleArray, propName, propValue;

        styles.forEach((style) => {
            styleArray = style.split(/:\s/g);
            propName = styleArray[0];
            propValue = parseFloat(styleArray[1]);
            props[propName] = propValue;
        });

        return props;
    }

    destroy() {
        this.props = {};
        this.element.removeAttribute('data-init');
        this.element.removeEventListener('mousedown', this.onPrepareDimension, false);
        this.clearDimension();
    }
}