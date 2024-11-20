export const PAGE_LOAD_FROM_JSON = 'PAGE_LOAD_FROM_JSON';
export const pageLoadJson = (payload) => {
    return {
        type: PAGE_LOAD_FROM_JSON,
        payload
    }
};

export const PAGE_ADD = 'PAGE_ADD';
export const pageAdd = (payload) => {
    return {
        type: PAGE_ADD,
        payload
    }
};

export const PAGE_REMOVE = 'PAGE_REMOVE';
export const pageRemove = (id) => {
    return {
        type: PAGE_REMOVE,
        id
    }
};