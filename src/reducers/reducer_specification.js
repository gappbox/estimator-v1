import { _ } from 'vendors';
import {
    SPECIFICATION_LOAD_FROM_JSON,
    SPECIFICATION_ADD,
    SPECIFICATION_CHANGE,
    SPECIFICATION_UPDATE,
    SPECIFICATION_REMOVE,
    SPECIFICATION_REMOVE_COLLECTION
}  from 'actions';

export default function specification(state = [], action) {
    switch(action.type) {
        case SPECIFICATION_LOAD_FROM_JSON:
            return [...action.payload];

        case SPECIFICATION_ADD:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    pageID: action.pageID,
                    duration: action.duration,
                    comment: action.comment,
                    rect: action.rect
                }
            ];

        case SPECIFICATION_CHANGE:
            let newState = [...state];
            let current = _.find(newState, ['id', action.id]);

            current.rect = action.props;

            return newState;

        case SPECIFICATION_UPDATE:
            let newStates = [...state];
            let currents = _.find(newStates, ['id', action.id]);

            currents.name = action.name;
            currents.duration = action.duration;
            currents.comment = action.comment;

            return newStates;

        case SPECIFICATION_REMOVE:
            return _.filter([...state], (item) => item.id !== action.id);

        case SPECIFICATION_REMOVE_COLLECTION:
            return _.filter([...state], (item) => item.pageID !== action.id);

        default: return state;
    }
}