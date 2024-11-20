import { combineReducers } from 'redux';
import specification from './reducer_specification';
import project from './reducer_project';
import pages from './reducer_pages';
import additional from './reducer_additional';
import notification from './reducer_notification';

export default combineReducers({
    project,
    pages,
    specification,
    additional,
    notification
});