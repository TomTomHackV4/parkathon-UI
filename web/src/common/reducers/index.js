import { combineReducers } from 'redux'
import mapReducer from './map-data-reducer'
import appStatusReducer from './app-status-reducer'

export default combineReducers({
    mapPoints: mapReducer,
    appState: appStatusReducer
})