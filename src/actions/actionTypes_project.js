export const PROJECT_LOAD_FROM_JSON = 'PROJECT_LOAD_FROM_JSON';
export const projectLoadJson = (payload) => {
    return {
        type: PROJECT_LOAD_FROM_JSON,
        payload
    }
};

export const PROJECT_TITLE_CHANGE = 'PROJECT_TITLE_CHANGE';
export const projectTitleChange = (title) => {
    return {
        type: PROJECT_TITLE_CHANGE,
        title
    }
};

export const PROJECT_CURRENT_PAGE = 'PROJECT_CURRENT_PAGE';
export const projectCurrentPage = (pageID) => {
    return {
        type: PROJECT_CURRENT_PAGE,
        pageID
    }
};