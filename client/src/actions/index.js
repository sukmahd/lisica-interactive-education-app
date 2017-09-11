import axios from 'axios'

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

export const remove_word = (data) => {
  return {
    type: 'REMOVE_WORD',
    payload: {
      word: data
    }
  }
}

export const post_record = (data) => {
  return (dispatch) => {
    dispatch(fetching())
    axios.post('http://reactchallengeapi.appspot.com/records', {
      email: data.email,
      success: data.success,
      repeat: data.repeat,
      word: data.word,
      answer: data.answer,
      data: new Date()
    })
    .then(resp => {
      dispatch({
        type: 'POST_RECORD',
        payload: {
          data: resp.data
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const get_record = () => {
  return (dispatch) => {
    dispatch(fetching())
    axios.get('http://reactchallengeapi.appspot.com/records')
    .then(resp => {
      dispatch({
        type: 'GET_RECORD',
        payload: {
          data: resp.data
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
}
