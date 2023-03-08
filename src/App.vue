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
  #app{
    min-height: 70%;
  }
  .icon-btn{
    background: none;
    outline: none;
    border: none;
    cursor:pointer;
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
    }

    .main-btn--fill{
      background: var(--basic-gradient);
      color: white;
      /* cursor: pointer; */
      transition: .5s;
      padding: 1rem 6rem;
      width: fit-content;
      align-self: flex-end;
    }

    .main-btn--fill:hover{
      background: rgb(38, 0, 78);
      color: white !important;

    }

    .main-btn--outline{
      background: var(--background-color);
      padding: 1rem 3rem;
      border: 4px solid;
      border-image: var(--basic-gradient) 1;
      width: fit-content;
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
    padding: 2rem;
  }

  .page-wrapper{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    min-height: 100%;
    transition: .3s;
    padding-top: 2rem;
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

  a{
    color: var(--font-color);
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    text-decoration: none;
    transition: .3s;
    text-align: center;
  }

  a:hover{
      opacity: .5;
  }
  
  /* ------------------------------ */
  /* CONTAINERS */
  /* ------------------------------ */
    .music-list-item__buttons{
      display: flex;
      justify-content: space-evenly;
      gap: 1rem;
    }

  .song-list{
    border-radius: 1rem;
        display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    min-width: 60vw;

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

  .form-field{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* min-width: 20vw; */
    padding: 1rem;
    
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
