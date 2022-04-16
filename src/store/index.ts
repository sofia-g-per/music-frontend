import { createStore } from 'vuex'

export default createStore({
  state: {
    APIURL: "http://localhost:3000/api/",
    APIExtensions: {
      login: 'log-in',
      getFavouriteSongs: 'liked-songs', 
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
