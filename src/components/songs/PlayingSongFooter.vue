<template>
    <footer v-if="songData" :class="{'footer': true, 'footer--open':isOpenList}" >
        <div class="music-list-item playing-song-footer" @click="toggleSongList">
            <div class="music-list-item__buttons">
                <button class="play-next-btn icon-btn" @click.stop="onPlayPrevious">
                    <img src="@/assets/images/previous_song_btn.svg" alt="Предыдущая песня">

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
                    <img src="@/assets/images/next_song_btn.svg" alt="Следующая песня">
                </button>
            </div>
            <!--  class="img-text--small-img" -->
            <song-info :songData="songData">

            </song-info>
            <!-- <div class="music-list-item__info">
                <h2 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h2>
            <div class="music-list-item__artist-wrapper">
                <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
                    {{artist.artist.stagename}}
                </p>
            </div> -->
            <!-- </div> -->
            <div class="music-list-item__progress-bar-wrapper">
                <p>{{songProgressTime.toFixed(2)}}</p>
                <div class="music-list-item__progress-bar">
                    <div class="progress-bar progress-bar-bg"></div>
                    <div class="progress-bar progress-bar-progress" :style="'width:'+ songProgressPercent +'%;'"></div>
                </div>
                <p>{{songAudio? songAudio.duration().toFixed(2): ''}}</p>
            </div>
            <like-btn :songId="songData && songData.song? songData.songId : songData.id" />

        </div>

        <div :class="{'footer__list-wrapper': true, 'footer__list-wrapper--active':isOpenList}">
            <h1 class="title" :hidden="!playlist || !playlist.name">Вы слушаете плейлист: {{ playlist.name }}</h1>
            <rearrangable-song-list>
                
            </rearrangable-song-list>
        </div>
    </footer>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RearrangableSongList from '../RearrangableSongList.vue';
import SongInfo from './SongInfo.vue';
import LikeBtn from '../UI/buttons/LikeBtn.vue';
export default defineComponent({
    name: "PlayingSongFooter",
    components:{
        RearrangableSongList,
        SongInfo,
        LikeBtn
    },
    props: [
        'songData',
        'playlist',
        'songAudio'
    ],
    emits: ['onToggleSongList'],
    data() {
        return {
            isOpenList: false,
            songProgressTime: 0,
            songProgressPercent: 0,
            songProgressIntervalId: null
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
        },
    },
    methods: {
        onClickPlay(){
            this.$store.dispatch('playCurrentSong')
            console.log(this.isPlaying);
            if(this.isPlaying) {
                this.songProgressIntervalId = setInterval(this.getAudioProgress, 500);
            }else if(this.songProgressIntervalId !== null){
                clearInterval(this.songProgressIntervalId);
            }
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
        },
        getAudioProgress(){
            if(this.songAudio){
                this.songProgressTime = this.songAudio.seek();
                this.songProgressPercent = (this.songProgressTime/this.songAudio.duration())*100;
            }
        }

    },
    mounted(){
        this.songProgressIntervalId = setInterval(this.getAudioProgress, 500)
    }

})
</script>
<style scoped>

    .music-list-item__progress-bar-wrapper{
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.2rem;
    }
    .music-list-item__progress-bar{
        width: 40vw;
    /* flex-grow: 1; */
        display: flex;
        align-items: center;
        position: relative;
    }

    .progress-bar{
        border-radius: 0.2rem;
        height: 0.7rem;
    }

    .progress-bar-bg{
        background: grey;
        width: 100%;
    }

    .progress-bar-progress{
        background: var(--accent-color-1);
        position: absolute;
    }
.title{
    padding-left: 7rem;
}
    .footer{
        position: fixed;
        z-index: 10;
        width: 100%;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }

    .footer--open{
        height: calc(100% - 6.2rem);
        top: 0;
        bottom: auto;
    }
    .playing-song-footer{
        /* border-top: white 1px solid; */
        box-sizing: border-box;
        padding: 2rem 2rem !important;
        background: linear-gradient(var(--accent-color-1), var(--bg-color) 50%);
        display: flex;
    }
    .playing-song-footer:hover{
        transform: none;
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
        width: 5rem;
        transition: .3s;
        opacity: .6;
    }

    .play-btn:hover{
        /* transform: scale(1.1); */
        opacity: 1;
    }
    .play-next-btn img{
        width: 5rem !important;
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

    .icon-btn{
        max-width: 50rem !important;
    }
</style>
