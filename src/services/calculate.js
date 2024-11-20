import { _ } from 'vendors';

export default class Calculate {
    constructor() {
        this.additional = {};
        this.specification = [];
    }

    setValues(newSpecification, newAdditional) {
        this.additional = newAdditional;
        this.specification = newSpecification;
    }

    estimate() {
        return _.sumBy(this.specification, (item) => parseFloat(item.duration));
    }

    layout() {
        return this.estimate() * (1 +  parseFloat(this.additional.layout.count)) || 0;
    }

    framework() {
        return parseFloat(this.additional.frameworks.count) || 0;
    }

    requirements() {
        return _.sumBy(_.filter(this.additional.requirements, (n) => n.isChecked), (item) => parseFloat(item.count)) || 0;
    }

    options() {
        return _.sumBy(_.filter(this.additional.options, (n) => n.isChecked), (item) => parseFloat(item.duration)) || 0;
    }

    getBlocks() {
        return this.specification.length;
    }

    getHours() {
        return (this.additional.hours + this.layout() * (1 + this.framework() + this.requirements()) + this.options()).toFixed(1);
    }

    getDays() {
        const hours = this.getHours();

        return {
            seven: (hours / 7).toFixed(1),
            six  : (hours / 6).toFixed(1),
            five : (hours / 5).toFixed(1)
        };
    }
}