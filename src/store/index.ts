import { PlayingPlaylist } from '../interfaces/currentPlaylist';
import { createStore } from 'vuex'
import {Howl} from 'howler';
import { UserDto } from '@/dtos/userDto.dto'
export default createStore({
  state: {
    APIURL: "http://localhost:3000/api/",
    APIExtensions: {
      login: 'log-in',
      getFavouriteSongs: 'liked-songs', 
      globalSearch: 'global-search',
      searchFavouriteSongs: 'search-liked-songs',
      getGenres: 'genres',
      getArtists: 'artists',
      uploadSong: 'upload-song',
      likeSong: 'like-song',
      getSongs: 'get-all-songs',
      getCurrentArtistSongs: 'get-song-by-current-artist',
      createPlaylist: 'create-playlist',
      getUsersPlaylists: 'users-playlists',
      deleteLiked: 'delete-like'
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
    isPlaying: false,

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
        if(!this.state.isPlaying){
          this.state.currentSongAudio!.play();
          this.state.isPlaying = true;
        }else{
          this.state.currentSongAudio!.pause();
          this.state.isPlaying = false;
        }
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
      localStorage.setItem('user', JSON.stringify(user));
      console.log(this.getters.user)
    },
    authorizedGuard(){
      if(!this.getters.user){
        return {name: 'login'};
      }
    },
    isArtistGuard(){
      if(!this.getters.user || !this.getters.user.artist){
        //change
        return {name: 'home'}
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
    },
    fullURL:(state) => (pathName:string)=>{
      return `${state.APIURL}${state.APIExtensions[pathName]}`;
    },
    user(){
      if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user') as string);
      }else{
        return false
      }
    }
  },
  modules: {
  }
})
