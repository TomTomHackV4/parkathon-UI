import { GET_MAP_POINTS_ACTION_NAME } from '../actions'
const DEFAULT_STATE = []

const mapReducer = (state = DEFAULT_STATE, action) => {
    debugger
    switch (action.type) {
        case GET_MAP_POINTS_ACTION_NAME:
            console.log('get map points!')
            return action.data
        default:
            return state
    }
}

export default mapReducer