export const fetching = () => ({
  type: 'FETCHING'
})

export const game_over = () => {
  return {
    type: 'GAME_OVER',
  }
}

export const set_words = (data) => {
  return (dispatch) => {
    dispatch(fetching())
    dispatch({
      type: 'SET_WORDS',
      payload: {
        words: data
      }
    })
  }
}

export const set_word = (data) => {
  return (dispatch) => {
    dispatch(fetching())
    dispatch({
      type: 'SET_WORD',
      payload: {
        word: data
      }
    })
  }
}

export const set_answer = (data) => {
  return (dispatch) => {
    dispatch(fetching())
    dispatch({
      type: 'SET_ANSWER',
      payload: {
        answer: data
      }
    })
  }
}

