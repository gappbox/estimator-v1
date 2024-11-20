import { _ } from 'vendors';
import models from 'models/prices';
import {
    ADDITIONAL_LOAD_FROM_JSON,
    ADDITIONAL_UPDATE,
    ADDITIONAL_REMOVE_FRAMEWORKS
} from 'actions';

const stateDefault = {
    layout: {
        id: 'r2',
        name: 'Responsive at our discretion',
        count: '0.5'
    },
    frameworks: {},
    options: models.options,
    requirements: models.requirements,
    hours: 0,
    summary: '',
    date: ''
};

export default function additional(state = stateDefault, action) {
    switch(action.type) {
        case ADDITIONAL_LOAD_FROM_JSON:
            return {...action.payload};

        case ADDITIONAL_REMOVE_FRAMEWORKS:
            return {...state, frameworks: {} };

        case ADDITIONAL_UPDATE:
            return {
                ...state,
                layout: action.layout,
                frameworks: action.frameworks,
                options: action.options,
                requirements: action.requirements,
                summary: action.summary,
                hours: action.hours,
                date: new Date()
            };

        default: return state;
    }
}