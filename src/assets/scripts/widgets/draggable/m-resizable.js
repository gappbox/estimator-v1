const selectionClass = 'no-selection';

export const mixinResize = {
    initResizeble: function () {
        var self = this;
        this.startX = 0;
        this.startY = 0;
        this.startW = parseInt(document.defaultView.getComputedStyle(this.element).width, 10);
        this.startH = parseInt(document.defaultView.getComputedStyle(this.element).height, 10);

        this.oninitDrag = function (event) {
            self.initDrag(event);
        };

        this.ondoDrag = function (event) {
            self.doDrag(event);
        };

        this.onstopDrag = function (event) {
            self.stopDrag(event);
        };

        this.elementSize.addEventListener('mousedown', this.oninitDrag, false);
    },
    initDrag: function(event) {
        this.startXX = event.pageX;
        this.startYY = event.pageY;
        this.startW = parseInt(document.defaultView.getComputedStyle(this.element).width, 10);
        this.startH = parseInt(document.defaultView.getComputedStyle(this.element).height, 10);
        window.addEventListener('mousemove', this.ondoDrag, false);
        window.addEventListener('mouseup',  this.onstopDrag, false);

        document.body.classList.add(selectionClass);
    },

    doDrag: function(event) {
        this.dragProps.width  = this.startW + event.pageX - this.startXX;
        this.dragProps.height = this.startH + event.pageY - this.startYY;

        this.element.style.width  = this.dragProps.width + 'px';
        this.element.style.height = this.dragProps.height + 'px';
    },

    stopDrag: function(event) {
        const blockID = this.element.getAttribute('data-id');
        const props = this.generateProps();

        window.removeEventListener('mousemove', this.ondoDrag, false);
        window.removeEventListener('mouseup',  this.onstopDrag, false);

        document.body.classList.remove(selectionClass);
        this.makeCallback('onDragEnd', this, blockID, props);
    },
};