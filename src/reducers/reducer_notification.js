import {
    NOTIFICATION_SHOW,
    NOTIFICATION_HIDE
} from 'actions';

const defaultState = {
    status : false,
    message: '',
    timeout: 1800,
    position: 'br'
};

export default function notification(state = defaultState, action) {
    switch(action.type) {
        case NOTIFICATION_SHOW:
            return {
                ...state,
                status : action.status,
                message: action.message
            };

        case NOTIFICATION_HIDE:
            return {
                ...state,
                status : action.status
            };

        default: return state;
    }
}