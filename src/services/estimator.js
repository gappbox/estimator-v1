import { _, calc } from 'vendors';

export default class Estimator {
    constructor() {
        this.pages = [];
        this.specification = [];
        this.additional = {};
    }

    create() {
        return this.template();
    }

    setValues(pages, specification, additional) {
        this.pages = pages;
        this.specification = specification;
        this.additional = additional;
    }

    requirementsList() {
        let { requirements, options } = this.additional;
        let cache = [];

        function selectedRequirements(prop){
            for (let i = 0; i < prop.length; i++) {
                if (prop[i].isChecked) {
                    cache.push(prop[i].name);
                }
            }
        }

        selectedRequirements(requirements);
        selectedRequirements(options);

        return cache;
    }

    elementsList() {
        let elements = ``;

        for (let i = 0, max = this.specification.length; i < max; i++) {
            let current = this.specification[i];
            let pageTitle = _.find(this.pages, ['id', current.pageID]).title;
            elements += `\n|               | # ${i + 1}`;
            elements += `\n|               | Name: ${current.name}`;
            elements += `\n|               | Duration: ${current.duration}h`;
            elements += `\n|               | Page: ${pageTitle}`;
            elements += `\n|               | Comment: ${current.comment || ''}`;
            elements += `\n|               |`;
        }

        return elements;
    }

    template() {
        return `
|------------------------------------------------------------------------------------------------------------------------|
| Hours:        | ${calc.getHours()} h
|------------------------------------------------------------------------------------------------------------------------|
| Pages:        | ${this.pages.length}
|------------------------------------------------------------------------------------------------------------------------|
| Blocks:       | ${calc.getBlocks()}
|------------------------------------------------------------------------------------------------------------------------|
| Days:         | (7h) without QA: ${calc.getDays().seven} days
|               | (6h) without QA: ${calc.getDays().six} days
|               | (5h) without QA: ${calc.getDays().five} days
|------------------------------------------------------------------------------------------------------------------------|
| Layout:       | ${this.additional.layout.name}
|------------------------------------------------------------------------------------------------------------------------|
| Frameworks:   | ${this.additional.frameworks.name || ''}
|------------------------------------------------------------------------------------------------------------------------|
| Requirements: | ${this.requirementsList().join('\n|               | ')}
|------------------------------------------------------------------------------------------------------------------------|
| Elements:     | ${this.elementsList()}
|------------------------------------------------------------------------------------------------------------------------|
| Summary:      |
|------------------------------------------------------------------------------------------------------------------------|
 
${this.additional.summary}`;
    }
}