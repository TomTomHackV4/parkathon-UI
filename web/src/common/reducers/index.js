import { combineReducers } from 'redux'
import mapReducer from './map-data-reducer'

export default combineReducers({ mapPoints: mapReducer })