import { PlayingPlaylist } from '../interfaces/currentPlaylist';
import { createStore } from 'vuex'
import {Howl} from 'howler';
import { UserDto } from '@/dtos/userDto.dto'
import axios from 'axios';
export default createStore({
  state: {
    APIURL: "http://localhost:3000/api/",
    APIExtensions: {
      login: 'log-in',
      globalSearch: 'global-search',
      searchFavouriteSongs: 'search-liked-songs',
      globalFilter: 'global-filter',

      uploadSong: 'upload-song',
      createPlaylist: 'create-playlist',
      createAlbum: 'create-album',

      likeSong: 'like-song',
      editSong: 'edit-song',
      editPlaylist: 'edit-playlist',
      editAlbum: 'edit-album',
      editUser: 'edit-user',
      editNotificationStatus: 'edit/colabrequest/status',

      getSongs: 'get-all-songs',
      getSong: 'get-song',
      getPlaylist: 'playlist',
      getGenres: 'genres',
      getArtists: 'artists',
      getAlbum: 'album',
      getAlbums: 'albums',
      getUser: 'get-user',
      getNotifications: 'collabRequests',
      getArtistStats: 'current/artist/statistics',

      getFavouriteSongs: 'liked-songs', 
      getCurrentArtistSongs: 'get-song-by-current-artist',
      getCurrentArtistSongDrafts: 'songs/drafts/current/artist',
      getCurrentArtistAlbums: 'albums-by-current-artist',
      getUsersPlaylists: 'users-playlists',

      deleteLiked: 'delete-like',
      deleteSong: 'delete-song',
      deletePlaylist: 'delete-playlist',
      deleteAlbum: 'delete-album',
      deleteUser: 'delete-user',

      listened: 'listened',
      getGeneratedPlaylists: 'generated/playlists',
      getGeneratedPlaylist: 'generated/new'

    },
    APIFilePaths:{
      avatars: 'avatars/',
      coverImg: 'coverImg/',
      songs: 'songs/',
    },
    
    isAuth: false,
    isArtist: false,

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
      this.state.isPlaying = false;
      this.state.currentSongAudio = new Howl({
        src: [filePath],
        onend: ()=> {this.dispatch('playNextSong')}
      })
    },
    addSongToListenedHistory(){
      if(this.state.user && this.state.currentSongDefined){
        axios.post(`${this.state.APIURL}${this.state.APIExtensions.listened}`, {songId: this.state.currentPlaylist.playlist.songs[this.state.currentSongId].id}, { 
          withCredentials: true,  
          })
        .catch((e)=>{
            console.log("add song to history error", e)
        })
      }
    },
    handleClickSong(state, payload){
      if(this.state.currentSongAudio){
        this.state.currentSongAudio!.pause();
      }
      this.state.isPlaying = false;
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
        this.state.currentSongDefined = true;
        this.dispatch('playCurrentSong');
      }
      this.dispatch('addSongToListenedHistory')
    },
    addSongToQueue(state, payload){
      if(this.state.currentPlaylist && this.state.currentPlaylist.playlist && this.state.currentPlaylist.playlist.songs){
        this.state.currentPlaylist.playlist.songs.splice(this.state.currentSongId+1, 0, payload.song);
      }
    },
    // toggleShuffle(state){
    //   this.state.currentPlaylist.isShuffled = !this.state.currentPlaylist.isShuffled;
    //   if(){

    //   }
    // },
    pauseCurrentSong(){
      this.state.currentSongAudio!.pause();
      this.state.isPlaying = false;
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
        if(this.state.isPlaying){
          this.state.currentSongAudio!.pause();
          this.state.isPlaying = false;
        }
        this.state.currentSongId as number;
        if(this.state.currentSongId < this.state.currentPlaylist.playlist.songs.length - 1){
          this.state.currentSongId += 1;
        }else{
          this.state.currentSongId = 0;
        }
        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.dispatch('playCurrentSong');
      }
    },
    playPreviousSong(){
      if(this.state.currentSongDefined){
        if(this.state.isPlaying){
          this.state.currentSongAudio!.pause();
          this.state.isPlaying = false;
        }
        this.state.currentSongId as number;
        if(this.state.currentSongId !== 0){
          this.state.currentSongId -= 1;
        }else{
          this.state.currentSongId = this.state.currentPlaylist.playlist.songs.length - 1;
        }
        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.dispatch('playCurrentSong');
      }
    },
    updateCurrentPlaylist(state, {newPlaylistOrder}){
  
      const currentSongDBId = this.state.currentPlaylist.playlist.songs[this.state.currentSongId].id 
      const newSongId = newPlaylistOrder.findIndex((song)=> song.id === currentSongDBId);
      this.state.currentSongId = newSongId;
      this.state.currentPlaylist.playlist.songs = newPlaylistOrder;
    },

    saveUser(state, {user}){
      const now = new Date()
      const item = {
        value: user,
        expiry: now.getTime() + 360000,
      }
      localStorage.setItem('user', JSON.stringify(item));
      this.state.isAuth = true;
      if(user.artist){
        this.state.isArtist = true;
      }else{
        this.state.isArtist = false;

      }
    },
    logOut(){
      this.state.isAuth = false;
      this.state.isArtist = false;
      this.state.currentPlaylist = new PlayingPlaylist();
      this.state.currentSongDefined = false;
      localStorage.removeItem('user');
    },
    authorizedGuard(){
      if(!this.getters.user){
        return {name: 'login'};
      }
    },
    isArtistGuard(){
      if(!this.getters.user || !this.getters.user.artist){
        return {name: 'home'}
      }
    },
    updateUser(state, {newUserData}){
      const userString = localStorage.getItem('user')
      if(userString){
        const user = JSON.parse(userString);
        user.value = newUserData;

        localStorage.setItem('user', JSON.stringify(user))
      }
    }

  },
  getters: {
    filePath: (state)=> (fileCategory, fileName)=>{
      return `http://localhost:3000/${state.APIFilePaths[fileCategory]}${fileName}`;
    },
    currentAudioPath: (state, getters)=> {
      if(state.currentSongId !== undefined){
        const currentSong = state.currentPlaylist.playlist.songs[state.currentSongId] as any;
        if(currentSong.song){
          console.log(getters.filePath('songs', currentSong.song.filePath))
          return getters.filePath('songs', currentSong.song.filePath)
        }else{
          console.log(getters.filePath('songs', currentSong.filePath))
          return getters.filePath('songs', currentSong.filePath)
        }
    }else{
      return false;
    }
    },
    fullURL:(state) => (pathName:string)=>{
      return `${state.APIURL}${state.APIExtensions[pathName]}`;
    },
    user(){
      const userString = localStorage.getItem('user')
      if(userString){
        const user = JSON.parse(userString);

        const now = new Date()
        if(now.getTime() > user.expiry){
          localStorage.removeItem('user');
          return null
        }else{

          return user.value;
        }
      }else{
        return false
      }
    }
  },

})
