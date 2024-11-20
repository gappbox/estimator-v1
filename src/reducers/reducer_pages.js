import { _ } from 'vendors';
import {
    PAGE_LOAD_FROM_JSON,
    PAGE_ADD,
    PAGE_REMOVE
} from 'actions';

export default function pages(state = [], action) {
    switch(action.type) {
        case PAGE_LOAD_FROM_JSON:
            return [...action.payload];

        case PAGE_ADD:
            let files = [...state];

            files = files.concat(action.payload);

            return files;

        case PAGE_REMOVE:
            return _.filter([...state], (item) => item.id !== action.id);

        default: return state;
    }
}