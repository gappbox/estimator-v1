export default class Confirm {
    constructor() {
        this.isOpened = false;
    }

    create(message) {
        this.popover = this.template(message);
        this.popoverWrap = document.createElement('div');
        this.popoverWrap.id = 'confirm';
        this.popoverWrap.classList.add('confirm');
        this.popoverWrap.innerHTML = this.popover;

        document.body.appendChild(this.popoverWrap);

        this.btnY = this.popoverWrap.querySelector('.ok');
        this.btnN = this.popoverWrap.querySelector('.no');
    }

    template(message) {
        return `
            <div class="confirm__content">
                <div class="confirm__outer">
                    <div class="confirm__inner">
                        <div class="confirm__message">
                            ${message}                        
                        </div>
                        <div class="confirm__footer">
                            <button class="button ok">Ok</button>
                            <button class="button no">No</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="confirm__overlay"></div>
        `;
    }

    open(message) {
        if (this.isOpened) return;

        return new Promise((resolve) => {
            this.isOpened = true;
            this.create(message);

            this.btnY.addEventListener('click', () => {
                resolve(true);
                this.hide();
            });

            this.btnN.addEventListener('click', () => {
                resolve(false);
                this.hide();
            });
        });
    }

    hide() {
        if (!this.popoverWrap) return;

        this.isOpened = false;
        this.popoverWrap.remove();
    }
}