import locationReducer from './locationReducer'
import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'

const rootReducer = combineReducers({
  locationReducer: locationReducer,
  reduxTokenAuth: reduxTokenAuthReducer,
})

export default rootReducer
