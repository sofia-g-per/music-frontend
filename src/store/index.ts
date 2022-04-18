import { PlayingPlaylist } from '../interfaces/currentPlaylist';
import { createStore } from 'vuex'
import {Howl, Howler} from 'howler';
import { UserDto } from '@/dtos/userDto.dto'
export default createStore({
  state: {
    APIURL: "http://localhost:3000/api/",
    APIExtensions: {
      login: 'log-in',
      getFavouriteSongs: 'liked-songs', 
      searchFavouriteSongs: 'search-liked-songs',
      getGenres: 'genres'
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
      html5: true,
      autoplay: false
    }),
    currentSongDefined: false,

    user: new UserDto,
  },
  mutations: {
  },
  actions: {
    embedNewAudio(state, {filePath}){
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
        
        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.dispatch('playCurrentSong');


      }else{

        this.state.currentPlaylist = payload.playlistToPlay;
        this.state.currentSongId = payload.songInPlaylistId;

        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.dispatch('playCurrentSong');

        this.state.currentSongDefined = true;

      }
    },
    playCurrentSong(){
      if(this.state.currentSongDefined){
        this.state.currentSongAudio!.play();
      }
    },
    playNextSong(){
      if(this.state.currentSongDefined){
        this.state.currentSongId as number;
        if(this.state.currentSongId < this.state.currentPlaylist.playlist.length - 1){
          this.state.currentSongId += 1;
        }else{
          this.state.currentSongId = 0;
        }
        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.dispatch('playCurrentSong');
      }
    },

    saveUser(state, {user}){
      this.state.user = user;
    },
    authorizedGuard(){
      if(!this.state.user.id){
        return {name: 'login'};
      }
    },
    isArtistGuard(){
      if(!this.state.user.artist){
        //change
        return {name: 'login'}
      }
    }

  },
  getters: {
    filePath: (state)=> (fileCategory, fileName)=>{
      return `http://localhost:3000/${state.APIFilePaths[fileCategory]}${fileName}`;
    },
    currentAudioPath: (state, getters)=> {
      if(state.currentSongId){
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
