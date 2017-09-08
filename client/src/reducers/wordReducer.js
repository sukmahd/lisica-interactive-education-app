const initialState = {
  words: [],
  word: '',
  answer: '',
  fetch: ''
}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case 'SET_WORDS':
      return {...state, words: actions.payload.words, fetch: true}
    case 'SET_WORD':
      return {...state, word: actions.payload.word, fetch: true}
    case 'SET_ANSWER':
      return {...state, answer: actions.payload.answer, fetch: true}
    case 'FETCHING': 
      return {...state, fetch: false}
    default:
      return state
  }
}