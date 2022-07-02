import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import { authReducer, appReducer, panelReducer } from './reducers';

export default configureStore({
    reducer: combineReducers({
        auth: authReducer,
        app: appReducer,
        panel: panelReducer
    })
});