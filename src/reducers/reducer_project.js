import {
    PROJECT_LOAD_FROM_JSON,
    PROJECT_TITLE_CHANGE,
    PROJECT_CURRENT_PAGE
} from 'actions';

const stateDefault = {
    title: '',
    pageID: ''
};

export default function project(state = stateDefault, action) {
    switch(action.type) {
        case PROJECT_LOAD_FROM_JSON:
            return {...action.payload};

        case PROJECT_TITLE_CHANGE:
            return {
                ...state,
                title: action.title
            };

        case PROJECT_CURRENT_PAGE:
            return {
                ...state,
                pageID: action.pageID
            };

        default: return state;
    }
}