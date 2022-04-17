import { PlayingPlaylist } from '../interfaces/currentPlaylist';
import { createStore } from 'vuex'
import {Howl, Howler} from 'howler';

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
    currentSongId: 0,
    currentSongAudio: new Howl({
      src: [null],
      format: 'mp3',
      html5: true
    }),
    currentSongDefined: false,
  },
  mutations: {
  },
  actions: {
    embedNewAudio(state, {filePath}){
      console.log('filepath', filePath)
      this.state.currentSongAudio = new Howl({
        src: [filePath],
        onend: ()=> {this.dispatch('playNextSong')}
      })
    },
    handleClickSong(state, payload){
      //если песня находятся в проигрываемом сейчас плейлисте
      if(this.state.currentPlaylist && this.state.currentPlaylist.type 
      && this.state.currentPlaylist.type === payload.playlistToPlay.type
      && this.state.currentPlaylist.id === payload.playlistToPlay.id){
        
        this.state.currentSongId = payload.songInPlaylistId;
        
        if(this.state.currentSongId){
          this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        }

      }else{

        this.state.currentPlaylist = payload.playlistToPlay;
        this.state.currentSongId = payload.songInPlaylistId;

        if(this.state.currentSongId){
          
          this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        }

        this.state.currentSongDefined = true;

      }
    },
    playCurrentSong(){
      console.log(this.state.currentSongDefined)
      if(this.state.currentSongDefined){
        console.log(this!.state!.currentSongAudio!)
        this!.state!.currentSongAudio!.play();
      }
    },
    playNextSong(){
      if(this.state.currentSongDefined){
        this!.state!.currentSongId! as number;
        this!.state!.currentSongId! += 1;
        //проверитт есть ли следующая песня
        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.dispatch('playCurrentSong');
      }
    }

  },
  getters: {
    filePath: (state)=> (fileCategory, fileName)=>{
      console.log()
      return `http://localhost:3000/${state.APIFilePaths[fileCategory]}${fileName}`;
    },
    currentAudioPath: (state, getters)=> {
      if(state.currentSongId){
        console.log('song in getter', state.APIFilePaths, state.APIFilePaths.songs);
        const currentSong = state.currentPlaylist.playlist[state.currentSongId] as any;
        return getters.filePath('songs', currentSong.song.filePath)
    }else{
      return false;
    }
  }
  },
  modules: {
  }
})
