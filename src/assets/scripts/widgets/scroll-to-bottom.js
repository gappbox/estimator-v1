export default class ScrollBottom {
    constructor(options) {
        this.element = document.querySelector(options.element);
        this.elementParent = this.element.closest(options.elementParent);
    }

    getScrollHeight() {
        return this.elementParent.scrollHeight;
    }

    getClientHeight() {
        return this.elementParent.clientHeight;
    }

    scollBottom() {
        setTimeout(() => {
            if (this.getScrollHeight() > this.getClientHeight()) {
                this.elementParent.scrollTop = this.getScrollHeight();
            }
        }, 1);
    }
}