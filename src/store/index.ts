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
    currentSongId: 0,
  },
  mutations: {
  },
  actions: {
    playSong(state, {songId, songPlaylist}){
      //если песня находятся в проигрываемом сейчас плейлисте
      console.log('play song function', songId, songPlaylist);
      if(this.state.currentPlaylist && this.state.currentPlaylist.type 
      && this.state.currentPlaylist.type === songPlaylist.type
      && this.state.currentPlaylist.id === songPlaylist.id){
        
        this.state.currentSongId = songId;
        console.log('songid changed', this.state.currentSongId);


      }else{

        this.state.currentPlaylist = songPlaylist,
        this.state.currentSongId = songId
        console.log('playlist changed', this.state.currentPlaylist, this.state.currentSongId);

      }
    }
  },
  modules: {
  }
})
