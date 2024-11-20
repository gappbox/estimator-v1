export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';
export const notification_show = (status, message) => {
    return {
        type: NOTIFICATION_SHOW,
        status,
        message
    }
};

export const NOTIFICATION_HIDE = 'NOTIFICATION_HIDE';
export const notification_hide = (status) => {
    return {
        type: NOTIFICATION_HIDE,
        status
    }
};