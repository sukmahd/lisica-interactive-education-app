const initialState = {
  words: ['keyboard', 'mouse', 'chicken'],
  word: 'keyboard',
  answer: '',
  fetch: false,
  game: false
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
    case 'GAME_OVER': 
      return {..state, game: true}
    default:
      return state
  }
}