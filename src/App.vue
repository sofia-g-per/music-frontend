<template>
  <the-header></the-header>

  <div :class="{'page-wrapper':true, 'page-wrapper--collapsed':isSongListOpen}">
    <router-view></router-view>

  </div>

<!-- проигрываемая песня -->
  <playing-song-footer 
    v-if="currentSong" 
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
    }
  },
  computed:{
    currentSong(){
      if(this.$store.state.currentSongDefined){
        const song =  this.$store.state.currentPlaylist.playlist[this.$store.state.currentSongId];
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
      console.log(isOpen, 'emit recieved')
      this.isSongListOpen = isOpen;
    }
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
    --accent-color-1: #700B97;
    --accent-color-2: rgb(255, 0, 81);
    --accent-color-2--dark: rgb(17, 0, 36); 

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

    .main-btn{
      border: 3px solid var(--accent-color-1) ;
      background: none;
      padding: 1rem 3rem;
      color: white;
      cursor: pointer;
      transition: .5s;
      margin: 2rem 0;
      width: fit-content;
      text-transform: uppercase;
      font-weight: bold;

      align-self: flex-end;
      margin-right: 1rem;
    }

    .main-btn:hover{
      background: rgb(38, 0, 78);
      color: white !important;

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

  }

  .form-field{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 20vw;
    padding: 1rem;
  }

  .form-field__error-label{
    color: var(--accent-color-2);
    font-size: 1.4rem;
  }

  .form-field__input{
    background: var(--bg-color);
    border: 2px solid var(--font-color);
    color: var(--font-color);
  }

  .form-field__input.form-field--error{
    border-color: var(--accent-color-2);
  }

  .boolean-field{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}

.form-field__label{
  font-size: 1.8rem;
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
