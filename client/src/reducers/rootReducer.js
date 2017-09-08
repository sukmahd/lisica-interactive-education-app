import { combineReducers } from 'redux'

import wordReducer from './wordReducer'

const rootReducer = combineReducers({
  wordStore: wordReducer
})

export default rootReducer