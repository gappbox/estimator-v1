export const SPECIFICATION_LOAD_FROM_JSON = 'SPECIFICATION_LOAD_FROM_JSON';
export const specificationLoadJson = (payload) => {
    return {
        type: SPECIFICATION_LOAD_FROM_JSON,
        payload
    }
};

export const SPECIFICATION_ADD = 'SPECIFICATION_ADD';
export const specificationAdd = ({pageID, rect}) => {
    return {
        type: SPECIFICATION_ADD,
        id: `UID${Date.now()}`,
        pageID,
        name: 'Element',
        duration: 0.22,
        rect
    }
};

export const SPECIFICATION_CHANGE = 'SPECIFICATION_CHANGE';
export const specificationChange = (id, props) => {
    return {
        type: SPECIFICATION_CHANGE,
        id,
        props
    }
};

export const SPECIFICATION_UPDATE = 'SPECIFICATION_UPDATE';
export const specificationUpdate = (id, name, duration, comment) => {
    return {
        type: SPECIFICATION_UPDATE,
        id,
        name,
        duration,
        comment
    }
};

export const SPECIFICATION_REMOVE = 'SPECIFICATION_REMOVE';
export const specificationRemove = (id) => {
    return {
        type: SPECIFICATION_REMOVE,
        id
    }
};

export const SPECIFICATION_REMOVE_COLLECTION = 'SPECIFICATION_REMOVE_COLLECTION';
export const specificationRemoveCollection = (id) => {
    return {
        type: SPECIFICATION_REMOVE_COLLECTION,
        id
    }
};