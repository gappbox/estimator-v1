const selectionClass = 'no-selection';

export const mixinDrag = {
    initDraggable: function () {
        this.isDrag = false;

        var self = this;

        this.onDragStart = function (event) {
            self.startDrag(event);
        };

        this.onDragMove = function (event) {
            self.moveDrag(event);
        };

        this.onDragEnd = function (event) {
            self.stopDrage(event);
        };

        this.drag.addEventListener('mousedown', this.onDragStart, false);
    },
    startDrag: function (event) {
        if (event.which !== 1) return;

        window.addEventListener('mousemove', this.onDragMove, false);
        window.addEventListener('mouseup', this.onDragEnd, false);

        this.isDrag = true;
        this.startX = event.pageX - this.getCoords(this.element).left;
        this.startY = event.pageY - this.getCoords(this.element).top;
        document.body.classList.add(selectionClass);
    },
    moveDrag: function (event) {
        this.dragProps.left = event.pageX - this.startX - this.getCoords(this.elementParent).left;
        this.dragProps.top  = event.pageY - this.startY - this.getCoords(this.elementParent).top;

        if (Math.abs(event.pageX - this.startX) < 2 && Math.abs(event.pageY - this.startY) < 2 || !this.isDrag) {
            return;
        }

        if (this.dragProps.left <= 0) {
            this.dragProps.left = 0;
        }

        if (this.dragProps.left >= parseFloat(getComputedStyle(this.elementParent).width) - parseFloat(getComputedStyle(this.element).width)) {
            this.dragProps.left =  parseFloat(getComputedStyle(this.elementParent).width) - parseFloat(getComputedStyle(this.element).width);
        }

        if (this.dragProps.top <= 0) {
            this.dragProps.top = 0;
        }

        if (this.dragProps.top >= parseFloat(getComputedStyle(this.elementParent).height) - parseFloat(getComputedStyle(this.element).height)) {
            this.dragProps.top =  parseFloat(getComputedStyle(this.elementParent).height) - parseFloat(getComputedStyle(this.element).height);
        }

        this.element.style.left = this.dragProps.left + 'px';
        this.element.style.top  = this.dragProps.top + 'px';
    },
    stopDrage: function (event) {
        const blockID = this.element.getAttribute('data-id');
        const props = this.generateProps();

        this.isDrag = false;
        document.body.classList.remove(selectionClass);
        window.removeEventListener('mousemove', this.onDragMove, false);
        window.removeEventListener('mouseup', this.onDragEnd, false);


        this.makeCallback('onDragEnd', this, blockID, props);
    }
};