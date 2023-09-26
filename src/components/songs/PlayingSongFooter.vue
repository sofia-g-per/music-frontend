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
                <p>{{songProgressTime}}</p>
                <div class="music-list-item__progress-bar">
                    <div class="progress-bar progress-bar-bg"></div>
                    <div class="progress-bar progress-bar-progress" :style="'width:'+ songProgressPercent +'%;'"></div>
                </div>
                <p>{{songAudio? songDuration: ''}}</p>
            </div>
            <like-btn :songId="songData && songData.song? songData.songId : songData.id" />

        </div>
            <!-- <div v-if="isOpenList"> -->
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
            songProgressTime: '0:0',
            songProgressPercent: 0,
            songProgressIntervalId: null,
            songDuration: '0:0',
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
            this.$store.dispatch('playCurrentSong');
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
            this.onClickPlay();
            this.songProgressTime = 0;
            this.songProgressPercent = 0;
            this.$store.dispatch('playNextSong');
            this.onClickPlay();

        },
        onPlayPrevious(){
            this.onClickPlay();
            this.songProgressTime = 0;
            this.songProgressPercent = 0;
            this.$store.dispatch('playPreviousSong');
            this.onClickPlay();
        },
        getAudioProgress(){
            console.log("getting");
            if(this.songAudio){
                this.songProgressTime = this.formatTime(this.songAudio.seek());
                this.songProgressPercent = (this.songAudio.seek()/this.songAudio.duration())*100;
                this.songDuration = this.formatTime(this.songAudio.duration());
            }
        },
        formatTime(seconds: number){
            const min = Math.floor(seconds/60);
            const sec = Math.floor(seconds - min * 60);
            return `${min}:${sec}`
        }

    },
    mounted(){
        this.songProgressIntervalId = setInterval(this.getAudioProgress, 250);
    }

})
</script>
<style scoped src="@/assets/styles/components/playingSongFooter.css">
</style>
