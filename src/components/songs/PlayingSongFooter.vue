<template>
<div>
    <footer :class="{'footer': true, 'footer--open':isOpenList}"  @click="toggleSongList">
        <div class="music-list-item playing-song-footer">
            <div class="music-list-item__info">
                <h2 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h2>
            <div class="music-list-item__artist-wrapper">
                    <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
            </div>
            </div>
            <div class="music-list-item__audio">
            </div>
            <div class="music-list-item__buttons">
                <button class="play-btn icon-btn" @click.stop="onClickPlay">
                        <svg v-if="!isPlaying" fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve">
                        <path d="M0.665,0v490l488.669-245L0.665,0z M15.977,24.806L455.183,245L15.977,465.208V24.806z"/>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        </svg>
                        <svg v-else version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 202.205 202.205" style="enable-background:new 0 0 202.205 202.205;" xml:space="preserve">
                                <g>
                                    <g>
                                        <path style="fill:white;" d="M23.483,202.205H85.83V0H23.483V202.205z M31.417,7.934h46.479v186.336H31.417V7.934z"/>
                                        <path style="fill:white;" d="M116.372,0v202.205h62.351V0H116.372z M170.788,194.271h-46.486V7.934h46.482v186.336H170.788z"/>
                                    </g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                        </svg>
                </button>
            </div>
        </div>
        <div :class="{'footer__list-wrapper': true, 'footer__list-wrapper--active':isOpenList}">

        </div>
    </footer>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "MusicListItem",
    props: [
        'songData'
    ],
    emits: ['onToggleSongList'],
    data() {
        return {
            isOpenList: false
        }
    },
    computed: {
        audioPath(): string{
            let audiopath =  this.$store.getters.filePath(
                'songs',
                this.songData.filePath
            );

            return audiopath;
        },
        isPlaying(){
            return this.$store.state.isPlaying;
        }
    },
    methods: {
        onClickPlay(){
            this.$store.dispatch('playCurrentSong')
        },
        toggleSongList(){
            this.isOpenList = !this.isOpenList;
            console.log('emited',this.isOpenList)

            this.$emit('onToggleSongList', this.isOpenList);
        }
    }

})
</script>
<style scoped>

    .footer-list-wrapper{
        position: absolute;
        z-index: 10;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }
    .playing-song-footer{
        border-top: white 1px solid;
        box-sizing: border-box;
        padding: 2rem 10rem !important;
        background: linear-gradient(rgb(37, 0, 79), rgba(0, 0, 0, 1));
        display: flex;
    }
    .music-list-item{
        padding: 1rem 0;
        width: 100%;
        display: flex;
    }

    .music-list-item__info{
        width: 100%;
    }
    .music-list-item__info__title{
        font-size: 2rem;
    }
    .music-list-item__info__artist{
        font-size: 1.4rem;
    }
    .music-list-item__buttons{
        display: flex;
        justify-content: space-evenly;
    }

    .play-btn{
        color: var(--font-color);
        background: none;
        width: 4.5rem;
        transition: .3s;
        opacity: .6;
    }

    .play-btn:hover{
        /* transform: scale(1.1); */
        opacity: 1;
    }

        .music-list-item__artist-wrapper{
        padding: 1rem 1rem 0 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;

    }

    .music-list-item__info__artist{
        opacity: .8;
    }
/* footer song list */
    .footer-list-wrapper{
        height: 0;
        transition: .3s;
    }
    .footer__list-wrapper--active{
        height: 100%;
    }

</style>
