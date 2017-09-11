import axios from 'axios'

export const fetching = () => ({
  type: 'FETCHING'
})

export const game_over = () => {
  return {
    type: 'GAME_OVER',
  }
}

export const try_again = () => {
  return{
    type: 'TRY_AGAIN'
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

export const post_record = (data, status) => {
  return (dispatch, getState) => {
    dispatch(fetching())
    console.log(data, 'kjhjhjh');
    axios.post('http://reactchallengeapi.appspot.com/records', {
      email: getState().wordStore.email,
      success: status,
      repeat: getState().wordStore.try,
      word: data,
      answer: getState().wordStore.answer,
      data: new Date()
    })
    .then(resp => {
      console.log(resp);
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
