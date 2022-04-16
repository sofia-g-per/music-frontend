import { PlayingPlaylist } from '../interfaces/currentPlaylist';
import { createStore } from 'vuex'

export default createStore({
  state: {
    APIURL: "http://localhost:3000/api/",
    APIExtensions: {
      login: 'log-in',
      getFavouriteSongs: 'liked-songs', 
    },
    APIFilePaths:{
      avatars: 'avatars/',
      coverImg: 'coverImg/',
      songs: 'songs/',
    },
    currentPlaylist: new PlayingPlaylist,
    currentSongId: null,
  },
  mutations: {
  },
  actions: {
    handleClickSong(state, payload){
      //если песня находятся в проигрываемом сейчас плейлисте
      if(this.state.currentPlaylist && this.state.currentPlaylist.type 
      && this.state.currentPlaylist.type === payload.playlistToPlay.type
      && this.state.currentPlaylist.id === payload.playlistToPlay.id){
        
        this.state.currentSongId = payload.songInPlaylistId;

      }else{

        this.state.currentPlaylist = payload.playlistToPlay,
        this.state.currentSongId = payload.songInPlaylistId

      }
    },
    playSong(state, payload){
      //get current audiofile and play it
    }

  },
  getters: {
    filePath: (state)=> (fileCategory, fileName)=>{
      //nees to get actual file sent from backend
      // console.log(`http://localhost:3000/uploaded/${state.APIFilePaths[fileCategory]}${fileName}`);
      return `http://localhost:3000/${state.APIFilePaths[fileCategory]}${fileName}`;
    }
  },
  modules: {
  }
})
