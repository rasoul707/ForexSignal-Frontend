import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import { authReducer, appReducer } from './reducers';

export default configureStore({
    reducer: combineReducers({
        auth: authReducer,
        app: appReducer,
    })
});