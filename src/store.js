import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state(){
    return {
      // name : 'kim',
      // age : 20,
      likes : [30, 40, 50],
      likeon : [false, false, false],
      more : {},
      postText : '',
      nickname : '',
      img : '',
    }
  },
  mutations : {
    // changename(state) {
    //   state.name = 'park'
    // },
    // changeage(state, payload) {
    //   state.age += payload
    // },
    changelike(state, data) {
      if(state.likeon[data] == false) {
        state.likes[data] += 1
        state.likeon[data] = true
      } else {
        state.likes[data] -= 1
        state.likeon[data] = false
      }
    },
    setMore(state, post) {
      state.more = post
    },
    addPost(state) {
      state.likes.unshift(0)
      state.likeon.unshift(false)
    },
    resetText(state) {
      state.postText = ''
    },
    changeName(state, name) {
      state.nickname = name
    },
    changeImg(state, url) {
      state.img = url
    },
  },
  actions : {
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more0.json`)
      .then((a) => {
        console.log(a.data)
        context.commit('setMore', a.data)
      })
    },
  }
})

export default store