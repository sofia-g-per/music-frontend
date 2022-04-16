import { PlayingPlaylist } from '../interfaces/currentPlaylist';
import { createStore } from 'vuex'

export default createStore({
  state: {
    APIURL: "http://localhost:3000/api/",
    APIExtensions: {
      login: 'log-in',
      getFavouriteSongs: 'liked-songs', 
    },

    currentPlaylist: new PlayingPlaylist,
    currentSongId: null,
  },
  mutations: {
  },
  actions: {
    playSong(state, payload){
      console.log('state changed')
      //если песня находятся в проигрываемом сейчас плейлисте
      if(this.state.currentPlaylist && this.state.currentPlaylist.type 
      && this.state.currentPlaylist.type === payload.playlistToPlay.type
      && this.state.currentPlaylist.id === payload.playlistToPlay.id){
        
        this.state.currentSongId = payload.songInPlaylistId;

      }else{

        this.state.currentPlaylist = payload.playlistToPlay,
        this.state.currentSongId = payload.songInPlaylistId

      }
    }
  },
  modules: {
  }
})
