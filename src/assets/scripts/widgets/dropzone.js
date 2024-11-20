const dragClass = 'dragover';

export default class Dropzone {
    constructor(element, callback) {
        this.element = element;
        this.callback = callback;
        this.attachEvents();
    }

    attachEvents() {
        this.onDragover = (event) => { this.dragover(event); };
        this.onDragleave = (event) => { this.dragleave(event); };
        this.onDrop = (event) => { this.drop(event); };

        this.element.addEventListener('dragover', this.onDragover, false);
        this.element.addEventListener('dragleave', this.onDragleave, false);
        this.element.addEventListener('drop', this.onDrop, false);
    }

    dragover(event) {
        this.element.classList.add(dragClass);

        event.preventDefault();
        event.stopPropagation();
    }

    dragleave(event) {
        this.element.classList.remove(dragClass);

        event.preventDefault();
        event.stopPropagation();
    }

    drop(event) {
        this.element.classList.remove(dragClass);

        event.preventDefault();
        event.stopPropagation();

        if (typeof this.callback.onDrop === 'function') {
            this.callback.onDrop(event);
        }
    }

    destroy() {
        this.element.classList.remove(dragClass);
        this.element.removeEventListener('dragover', this.onDragover, false);
        this.element.removeEventListener('dragleave', this.onDragleave, false);
        this.element.removeEventListener('drop', this.onDrop, false);
    }
}