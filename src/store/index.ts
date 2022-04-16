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
    currentsongInPlaylistId: 0,
  },
  mutations: {
  },
  actions: {
    playSong(state, payload){
      //если песня находятся в проигрываемом сейчас плейлисте
      console.log('play song function', payload);
      if(this.state.currentPlaylist && this.state.currentPlaylist.type 
      && this.state.currentPlaylist.type === payload.playlistToPlay.type
      && this.state.currentPlaylist.id === payload.playlistToPlay.id){
        
        this.state.currentsongInPlaylistId = payload.songInPlaylistId;
        console.log('songInPlaylistId changed', this.state.currentsongInPlaylistId);


      }else{

        this.state.currentPlaylist = payload.playlistToPlay,
        this.state.currentsongInPlaylistId = payload.songInPlaylistId
        console.log('playlist changed', this.state.currentPlaylist, this.state.currentsongInPlaylistId);

      }
    }
  },
  modules: {
  }
})
