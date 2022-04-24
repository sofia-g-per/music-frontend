import { PlayingPlaylist } from '../interfaces/currentPlaylist';
import { createStore } from 'vuex'
import {Howl} from 'howler';
import { UserDto } from '@/dtos/userDto.dto'

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

      getSongs: 'get-all-songs',
      getSong: 'get-song',
      getPlaylist: 'get-playlist',
      getGenres: 'genres',
      getArtists: 'artists',
      getAlbum: 'get-album',
      getUser: 'get-user',

      getFavouriteSongs: 'liked-songs', 
      getCurrentArtistSongs: 'get-song-by-current-artist',
      getCurrentArtistAlbums: 'albums-by-current-artist',
      getUsersPlaylists: 'users-playlists',

      deleteLiked: 'delete-like',
      deleteSong: 'delete-song',
      deletePlaylist: 'delete-playlist',
      deleteAlbum: 'delete-album',
      deleteUser: 'delete-user',

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
    handleClickSong(state, payload){
      if(this.state.currentSongAudio){
        this.state.currentSongAudio!.pause();
      }
      this.state.isPlaying = false;
      //если песня находятся в проигрываемом сейчас плейлисте
      console.log('handle click playing', payload, payload.songInPlaylistId, payload.playlistToPlay)

      if(this.state.currentPlaylist && this.state.currentPlaylist.type 
      && this.state.currentPlaylist.type === payload.playlistToPlay.type
      && this.state.currentPlaylist.id === payload.playlistToPlay.id){
        
        this.state.currentSongId = payload.songInPlaylistId;
        
        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.dispatch('playCurrentSong');


      }else{
        console.log('else')
        this.state.currentPlaylist = payload.playlistToPlay;
        this.state.currentSongId = payload.songInPlaylistId;
        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.state.currentSongDefined = true;
        this.dispatch('playCurrentSong');


      }
    },
    playCurrentSong(){
      console.log('playCurrentSong',this.state.currentSongDefined, this.state.isPlaying, this.state.currentSongAudio);

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
    playPreviousSong(){
      if(this.state.currentSongDefined){
        this.state.currentSongId as number;
        if(this.state.currentSongId !== 0){
          this.state.currentSongId -= 1;
        }else{
          this.state.currentSongId = this.state.currentPlaylist.playlist.length - 1;
        }
        this.dispatch('embedNewAudio',({filePath: this.getters.currentAudioPath}));
        this.dispatch('playCurrentSong');
      }
    },
    updateCurrentPlaylist(state, {newPlaylistOrder}){
      const currentSongDBId = this.state.currentPlaylist.playlist[this.state.currentSongId].id 
      const newSongId = newPlaylistOrder.findIndex((song)=> song.id === currentSongDBId);
      this.state.currentSongId = newSongId;
      this.state.currentPlaylist.playlist = newPlaylistOrder;
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
      localStorage.removeItem('user');
    },
    authorizedGuard(){
      if(!this.getters.user){
        return {name: 'login'};
      }
    },
    isArtistGuard(){
      console.log(this.getters.user.artist)
      if(!this.getters.user || !this.getters.user.artist){
        return {name: 'home'}
      }
    }

  },
  getters: {
    filePath: (state)=> (fileCategory, fileName)=>{
      return `http://localhost:3000/${state.APIFilePaths[fileCategory]}${fileName}`;
    },
    currentAudioPath: (state, getters)=> {
      if(state.currentSongId !== undefined){
        console.log('getter audio', state.currentPlaylist.playlist, state.currentSongId)
        const currentSong = state.currentPlaylist.playlist[state.currentSongId] as any;
        if(currentSong.song){
          return getters.filePath('songs', currentSong.song.filePath)

        }else{
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
