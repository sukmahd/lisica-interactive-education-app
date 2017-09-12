import axios from 'axios'

export const fetching = () => ({
  type: 'FETCHING'
})

export const game_over = () => {
  return {
    type: 'GAME_OVER',
  }
}

export const reset_game = () => {
  return {
    type: 'RESET_GAME'
  }
}

export const try_again = () => {
  return{
    type: 'TRY_AGAIN'
  }
}

export const setModalVisible = () => {
  console.log('Masuk action reducer, cuy!')
  return {
    type: 'SET_MODAL_VISIBLE'
  }
}

export const set_username = (name) => {
  return {
    type: 'SET_NAME',
    payload: {
      data: name
    }
  }
}

export const setModalHide = () => {
  return {
    type: 'SET_MODAL_HIDE'
  }
}

export const loggingUserOut = () => {
  console.log('Harusnya log out kalo masuk sini')
  return {
    type: 'LOG_OUT'
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

export const user_login = (email, password) => {
  return (dispatch, getState) => {
    dispatch(fetching())
    console.log('Masuk user_login')
    console.log(`Props dari component: ${email} dan ${password}`)
    axios.post('https://reactchallengeapi.appspot.com/user/login', {
      email: email,
      password: password
    })
    .then(resp => {
      console.log('Resp data KEY (user_uid): ',resp.data.uid)
      console.log('Email user from uid: ',resp.data.providerData[0].uid)
      dispatch({
        type: 'USER_LOGIN',
        payload: {
          data: resp.data
        }
      })
    })
    .catch(err => {
      console.log('Error nih: ', err)
      dispatch({
        type: 'GAGAL_LOGIN'
      })
    })
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

export const get_record = (email) => {
  return (dispatch) => {
    dispatch(fetching())
    axios.get(`http://reactchallengeapi.appspot.com/records/${email}`)
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
