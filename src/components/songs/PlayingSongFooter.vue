<template>
    <footer :class="{'footer': true, 'footer--open':isOpenList}" >
        <div class="music-list-item playing-song-footer" @click="toggleSongList">
            <div class="music-list-item__info">
                <h2 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h2>
            <div class="music-list-item__artist-wrapper">
                <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
                    {{artist.artist.stagename}}
                </p>
            </div>
            </div>
            <div class="music-list-item__progress">
            </div>
            <div class="music-list-item__buttons">
                <button class="play-next-btn icon-btn" @click.stop="onPlayPrevious">
                    <svg viewBox="0 0 15 15" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
                        fill="white"
                    />
                    </svg>
                </button>
                <button class="play-btn icon-btn" @click.stop="onClickPlay">
                        <svg v-if="!isPlaying" fill="white" version="1.1" id="Layer_1" x="0px" y="0px"
                                viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
                            <path  d="M37.728,328.12c2.266,1.256,4.77,1.88,7.272,1.88c2.763,0,5.522-0.763,7.95-2.28l240-149.999
                                c4.386-2.741,7.05-7.548,7.05-12.72c0-5.172-2.664-9.979-7.05-12.72L52.95,2.28c-4.625-2.891-10.453-3.043-15.222-0.4
                                C32.959,4.524,30,9.547,30,15v300C30,320.453,32.959,325.476,37.728,328.12z"/>
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
                <button class="play-next-btn icon-btn" @click.stop="onPlayNext">
                    <svg viewBox="0 0 15 15" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                        fill="white"
                    />
                    </svg>
                </button>
            </div>
        </div>
        <div :class="{'footer__list-wrapper': true, 'footer__list-wrapper--active':isOpenList}">
            <rearrangable-song-list>
                
            </rearrangable-song-list>
        </div>
    </footer>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RearrangableSongList from '../RearrangableSongList.vue';
export default defineComponent({
    name: "MusicListItem",
    components:{
        RearrangableSongList
    },
    props: [
        'songData'
    ],
    emits: ['onToggleSongList'],
    data() {
        return {
            isOpenList: false,
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
            this.$emit('onToggleSongList', this.isOpenList);
        },
        onPlayNext(){
            this.$store.dispatch('playNextSong');
        },
        onPlayPrevious(){
            this.$store.dispatch('playPreviousSong');
        }
    },


})
</script>
<style scoped>
    .footer{
        position: absolute;
        z-index: 10;
        width: 100%;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }

    .footer--open{
        height: calc(100% - 6.2rem);
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

    /* buttons */
    .music-list-item__buttons{
        display: flex;
        justify-content: flex-start;
    
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
    .play-next-btn svg{
        height: 3rem;
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
    .footer__list-wrapper{
        height: 0;
        background: var(--bg-color);
        overflow-y:hidden;
    }
    .footer__list-wrapper--active{
        height: 100%;
    }
</style>
