const initialState = {
  words: ['keyboard', 'mouse', 'chicken'],
  word: 'keyboard',
  answer: '',
  fetch: false,
  game: false,
  count: 0,
  collections: [],
  records: []
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
      return {...state, game: true, count: 0}
    case 'POST_RECORD':
      return {...state, collections: actions.payload.data, fetch: true }
    case 'GET_RECORD':
      return {...state, records: actions.payload.data, fetch: true}
    case 'REMOVE_WORD':
      return {...state, words: state.words.filter(kata => {
        return kata != actions.payload.word
      })}
    default:
      return state
  }
}
