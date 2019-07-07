import { combineReducers } from 'redux';

// import all reducers
import notes from './notes';

// combine them
const appReducer = combineReducers({
    notes
})

export default appReducer;