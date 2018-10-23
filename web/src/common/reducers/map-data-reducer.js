import { GET_PARKING_SPOTS_RESOURCE_NAME } from '../actions'
const DEFAULT_STATE = []

const mapReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_PARKING_SPOTS_RESOURCE_NAME:
            return action.data
        default:
            return state
    }
}

export default mapReducer