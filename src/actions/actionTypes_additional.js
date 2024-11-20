export const ADDITIONAL_LOAD_FROM_JSON = 'ADDITIONAL_LOAD_FROM_JSON';
export const additionalLoadJson = (payload) => {
    return {
        type: ADDITIONAL_LOAD_FROM_JSON,
        payload
    }
};

export const ADDITIONAL_UPDATE = 'ADDITIONAL_UPDATE';
export const additionalUpdate = (layout, frameworks, options, requirements, hours, summary) => {
    return {
        type: ADDITIONAL_UPDATE,
        layout,
        frameworks,
        options,
        requirements,
        hours,
        summary
    }
};

export const ADDITIONAL_REMOVE_FRAMEWORKS = 'ADDITIONAL_REMOVE_FRAMEWORKS';
export const additionalRemoveFrameworks = () => {
    return {
        type: ADDITIONAL_REMOVE_FRAMEWORKS
    }
};