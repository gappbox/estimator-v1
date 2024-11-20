import { _ } from 'vendors';

export default class BitmapCanvas {
    constructor() {
        this.collection = {};
    }

    getCollection() {
        return this.collection;
    }

    findOneFromCollection(pageID) {
        return _.find(this.getCollection(), ['id', pageID]);
    }

    addToCollection(canvasID, canvasStore) {
        this.collection[canvasID] = canvasStore;
    }

    deleteFromCollection(canvasID) {
        delete this.collection[canvasID];
    }

    initialize(data) {
        let canvasID = data.id;
        let canvas = document.querySelector(`[data-id="${canvasID}"]`);
        let cache = {};

        if (canvas && !canvas.getAttribute('data-init')) {
            canvas.setAttribute('data-init', true);

            cache.id = canvasID;
            cache.title = data.title;
            cache.element = canvas;
            cache.filename = data.fileName;
            this.addToCollection(canvasID, cache);
            this.drawImage(canvas, data.fileBase64);
        }
    }

    redrawImage(data) {
        let canvasID = data.id;
        let canvas = document.querySelector(`[data-id="${canvasID}"]`);

        if (canvas && canvas.getAttribute('data-init')) {
            this.drawImage(canvas, data.fileBase64);
        }
    }

    drawImage(canvas, imageBase64) {
        let image = new Image(), ratio;

        function loadImage() {
            ratio = image.height / image.width;

            image.width = 1000;
            image.height = image.width * ratio;

            canvas.width = image.width;
            canvas.height = image.height;
            canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
        }

        image.onload = loadImage;
        image.src = imageBase64;
    }

    drawRect(data, index) {
        let canvas = this.findOneFromCollection(data.pageID);
        let ctx, poxX;

        if (!canvas) {
            throw "Widget::Bitmap Canvas. Can't get collections pages";
        }

        ctx =  canvas.element.getContext('2d');
        poxX = (index + 1) < 10 ? 10 : 7 ;

        ctx.beginPath();
        ctx.rect(data.rect.left,data.rect.top,data.rect.width,data.rect.height);
        ctx.fillStyle = 'rgba(127,167,37,0.37)';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(data.rect.left,data.rect.top,data.rect.width,data.rect.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#7ea624';
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(data.rect.left,data.rect.top, 26, 26);
        ctx.fillStyle = '#7ea624';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.font = '11px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText((index + 1), data.rect.left + poxX, data.rect.top + 17);
        ctx.stroke();
    }
}

