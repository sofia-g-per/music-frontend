<template>
  <the-header></the-header>

  <div :class="{'page-wrapper':true, 'page-wrapper--collapsed':isSongListOpen}">
    <router-view></router-view>

  </div>

<!-- проигрываемая песня -->
  <playing-song-footer 
    v-if="currentSong && !routeExcludesFooter" 
    :songData="currentSong"
    @onToggleSongList="handleToggleSongList"
  >
  </playing-song-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlayingSongFooter from './components/songs/PlayingSongFooter.vue'
import TheHeader from './components/UI/TheHeader.vue'
export default defineComponent({
  components:{
    TheHeader,
    PlayingSongFooter
  },
  data() {
    return {
      isSongListOpen:false,
      routeExcludesFooter: false,
      //массива наименований маршрутов на которых не показывается элемент проигрывания песни
      routesToExcudeOn: [
        'edit-profile',
        'edit-album',
        'edit-playlist',
        'edit-song',
        'add-song',
        'add-album',
        'signup',
        'login',
      ]
    }
  },
  computed:{
    currentSong(){
      if(this.$store.state.currentSongDefined){
        const song =  this.$store.state.currentPlaylist.playlist.songs[this.$store.state.currentSongId];
        if(song.song){
          return song.song;
        }else{
          return song
        }
      }else{
        return null;
      }
    },
  },
  methods: {
    handleToggleSongList(isOpen:boolean){
      this.isSongListOpen = isOpen;
    }
  },
  watch:{
      $route(to, from){
          if (this.routesToExcudeOn.includes(to.name)){
            this.$store.dispatch('pauseCurrentSong');
            this.routeExcludesFooter = true;
          }else{
            this.routeExcludesFooter = false;

          }

      }
  },
  mounted() {
    console.log(this.$store.getters.user);
  }
})
</script>

<style>
  /* ------------------------------ */
  /* VARIABLES */
  /* ------------------------------ */
  :root{
    --bg-color: black;
    --font-color: white;
    --accent-color-1--light: #c956ff;
    /* --accent-color-1: #9810ce; */
    --accent-color-1: #C001F1;
    --accent-color-2: #FF008A;
    --accent-color-2--vibrant: #FF004C;
    --accent-color-2--dark: rgb(17, 0, 36);
    
    --basic-gradient: linear-gradient(to right, rgba(187, 0, 255, 1),rgba(255, 0, 77, 1));

    --main-font-family: sans-serif;
    font-size: 62.5%;
  }
  /* ------------------------------ */
  /* GENERAL */
  /* ------------------------------ */
  body{
    background-color: var(--bg-color);
    color: var(--font-color);
    font-family: var(--main-font-family);
    box-sizing: border-box;
    height: 100vh;
  }

  *{
    margin: 0;
        box-sizing: border-box;
  }

  a{
    text-decoration: none;
    color: white;
  }
  #app{
    min-height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-btn{
    background: none;
    outline: none;
    border: none;
    cursor:pointer;
    max-width: 3rem;
  }

  .icon-btn>img{
    max-width: 100%;
  }

    .icon-btn:focus,
    .icon-btn:hover{
      border:none;
      outline: none;
      padding: 0 1rem;
    }

    .main-btn {
      border: none;
      border-radius: 1rem;
      text-transform: uppercase;
      cursor: pointer;
      letter-spacing: 0.3rem;
    }

    .main-btn--fill{
      background: var(--basic-gradient);
      color: white;
      transition: .5s;
      padding: 1rem 4rem;
      width: fit-content;
      cursor:pointer;
    }

    .main-btn--fill:hover{
      /* opacity: 1;  */
    }

    .main-btn--fill:disabled{
      opacity: 0.5;
    }

    .main-btn--outline{
      background: var(--background-color);
      padding: 1rem 3rem;
      border: 4px solid;
      border-image: var(--basic-gradient) 1;
      width: fit-content;
      cursor:pointer;

      /* border-radius: 1rem;
      background-origin: border-box;
      background-clip: content-box, border-box; */
    }

    .gradient-text{
      background: var(--basic-gradient);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .main-btn--with-icon__text{
      display: flex;
      justify-content: space-between;
    }

    .circle-btn{
      border: none;
      width: 5rem;
      height: 5rem;
      background: var(--accent-color-1);
      border-radius: 50%;
      align-self: flex-end;
      margin-right: 14vw;
      margin-top: 2rem;
      position: relative;
    }

    .circle-btn::before{
      content: '+';
      display: block;
      font-size: 4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .btn--grey>*{
        opacity: .7;
        background: none;
        outline: none;
    }
    .btn--grey:hover>*{
        opacity: 1;
    }

  /* ------------------------------ */
  /* TEXT */
  /* ------------------------------ */
  .no-results{
    font-size: 2rem;
  }

  .page-title{
    text-transform: uppercase;
    font-weight: normal;
    font-size: 2.8rem;
    letter-spacing: 0.4rem;
  }

  .page-wrapper{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    min-height: 80vh;
    transition: .3s;
    padding-top: 2rem;
    width: fit-content;
    min-width: 100%;
  }

  .page-wrapper--collapsed{
    height: 0%;
    min-height: 0%;
    display: none;
    overflow: hidden;
  }

  .page-error{
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--accent-color-2);
    padding: 20vw 0;
  }

  .icon-link{
    text-decoration: none;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    text-transform: uppercase; 
    /* width: min-content;  */
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    z-index: 0;
  }

  .icon-link__text{
    color: var(--accent-color-1);
    display: block;
    width: fit-content;
    width: 0;
    overflow: hidden;
    position: relative;
    z-index: 0;
    transition: 2s;

  }

  .icon-link__text>span{
    z-index: 1;
    position: relative;
    display: block;
    width: 0;
    overflow: hidden;
  }

  .icon-link__text:after{
    display: block;
    position: absolute;
    content: '';
    z-index: 3;
    width: 100%;
    height: 100%;
    color: var(--background-color);
    top: 0;
    left: 0;
    transition: 1s;
    transition-delay: 1s;
  } 

  .icon-link:hover .icon-link__text,
  .icon-link:hover .icon-link__text>span{

    width: max-content;
    overflow: auto;
  }

  /* .icon-link:hover .icon-link__text:after{
    width: 0%;
  }  */

    /* ------------------------------ */
  /* SEARCH */
  /* ------------------------------ */
  .search-and-filters{
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
    }

    .search-bar__wrapper{
        display: flex;
        width: fit-content;
        /* min-width: 70rem; */
        position: relative;
        gap: .5rem;
    }
    .search-bar{
        background: var(--bg-color);
        width: 100%;
        padding: .8rem;
        border: none;
        color: var(--font-color);
        transition: .3s;
        border-bottom: 2px solid;
        border-image: var(--basic-gradient) 1;
    }

    .search-bar::placeholder{
        color: var(--font-color);
        opacity: 0.5;
    }

    .search-bar:focus{
        outline: none;
        /* transform: scale(1.015); */
    }
    .search-bar__wrapper::before{
        content:'';
        display: block;
        /* background: url('../../assets/images/search_icon.svg') no-repeat; */
        background-size: 100% auto;
        width: 2rem;
    }

    .genre-filters{
        display: flex;
        gap: 2rem;
        /* max-width: 100vw; */
        overflow: hidden;
    }

    .genre-filter{
        /* border: solid 3px var(--accent-color-2); */
        background: var(--accent-color-1);
        border-radius: 5rem;
        padding: .7rem;
        min-width: 7rem;
        display: flex;
        justify-content: center;
        font-size: 1.3rem;
        font-weight: 700;
        cursor: pointer;
        transition: .3s;
    }
    .genre-filter:hover{
        transform: scale(0.9);
    }

    .genre-filter--active{
        background: var(--accent-color-2);
    }
    .genre-filter input{
        display: none;
    }
  
  /* ------------------------------ */
  /* CONTAINERS */
  /* ------------------------------ */
    .music-list-item__buttons{
      display: flex;
      justify-content: space-evenly;
      gap: 1rem;
    }

    
    .music-list-item:first-child(){
        background: linear-gradient(to bottom, rgba(187, 0, 255, 0.7) 0, transparent 30%)
        linear-gradient(to top, rgba(187, 0, 255, 0.85) 0, transparent 20%);
    }
    
    .music-list-item{
        width: 100%;
        padding: 1vw 1vw 2vw 1vw;
        display: flex;
        background: linear-gradient(to top, rgba(187, 0, 255, 0.6) 0, transparent 30%);
        cursor: pointer;
        transition: .3s;
    }

    
    .music-list-item--accent{
      background: linear-gradient(to top, var(--accent-color-2) 0, transparent 30%);

    }


    .music-list-item:hover{
        transform: scale(1.025) translate(-1px, -2px);
    }

    .music-list-item__info{
        width: 100%;
    }

    .music-list-item__info__title{
        font-size: 1.8rem;
    }

    .music-list-item__artist-wrapper{
        padding: 1rem 1rem 0 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;

    }

    .music-list-item__info__artist{
        opacity: .8;
        font-size: 1.4rem;

    }

  .song-list{
    border-radius: 1rem;
        display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    min-width: 100%;
  }
  /* ------------------------------ */
  /* FORM */
  /* ------------------------------ */
  .form{
    width: 25vw;
    max-width: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    gap: 2rem;

  }

  .form-1-clmn{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }

  .form-field{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* min-width: 20vw; */
    padding: 1rem;
    max-width: 25vw;
    height: min-content;
  }


  .form-field__input{
    background: var(--bg-color);
    border: 2px solid;
    border-image: var(--basic-gradient) 1;
    color: var(--font-color);
  }

  .form-field__input:focus{
    outline: none;
    border-color: var(--accent-color-1);
    border-image: none;
  }

  .form-field__input:autofill{
   background-color:var(--bg-color);
  }

  .form-field__input::-webkit-autofill {
   background-color:var(--bg-color);
  }

  .form-field__input::-webkit-autofill:focus {
   background-color:var(--bg-color);
  }

  /* .form-field__input::before{
    background: ;
  } */

  
  .form-field__label{
    font-size: 1.8rem;
    letter-spacing: 0.3rem;
    color: var(--accent-color-1);
  }
  
  .form-field__error-label{
    color: var(--accent-color-2);
    font-size: 1.4rem;
  }

  .form-field--error .form-field__input,
   /* для ошибок в fileField */
   .form-field--error .main-btn--with-icon__text{
    border-color: var(--accent-color-2);
    border-image: none;
  }

  .form-field--error .form-field__label{
    color: var(--accent-color-2);
  }

  .boolean-field{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}


.boolean-field input{
  margin-right: 1rem;
}

.like-btn{
  width: 2rem;
}

.like-btn{
  fill: var(--font-color);
  opacity: .6;
  transition: .3s;
}

.like-btn--active{
  opacity: 1;
  fill: var(--accent-color-1--light);
}

.logo{
    height: 3rem;
}
</style>
