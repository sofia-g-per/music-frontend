<template>
    <draggable 
        class="song-list" 
        v-model="myList"
        @start="drag=true" 
        @end="drag=false"
        item-key="id"
        >
        <!-- :itemKey="element && element.song? element.songId : element.id" -->

        <template #item="{element}">
        <li class="music-list-item img-text--small-img">
            <song-info :songData="element">
                <button class="icon-btn"><img src="@/assets/images/query_icon.svg"></button>
                <button class="icon-btn" >
                    <svg class="like-btn like-btn--active" 
                        version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 45.743 45.743" style="enable-background:new 0 0 45.743 45.743;"
                        xml:space="preserve">
                    <g>
                        <path d="M34.199,3.83c-3.944,0-7.428,1.98-9.51,4.997c0,0-0.703,1.052-1.818,1.052c-1.114,0-1.817-1.052-1.817-1.052
                            c-2.083-3.017-5.565-4.997-9.51-4.997C5.168,3.83,0,8.998,0,15.376c0,1.506,0.296,2.939,0.82,4.258
                            c3.234,10.042,17.698,21.848,22.051,22.279c4.354-0.431,18.816-12.237,22.052-22.279c0.524-1.318,0.82-2.752,0.82-4.258
                            C45.743,8.998,40.575,3.83,34.199,3.83z"/>
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
                <xbtn   class="delete-btn" @click.stop="handleDelete(element.id)"/>
            </song-info>
        </li>
        </template>

    </draggable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import SongInfo from './songs/SongInfo.vue'
import Xbtn from './UI/buttons/Xbtn.vue'
export default defineComponent({
    components: {
        draggable,
        SongInfo,
        Xbtn
    },
    computed: {
        myList: {
            get() {
                // get
                if(this.$store.state.currentPlaylist.playlist && this.$store.state.currentPlaylist.playlist.songs){
                    return this.$store.state.currentPlaylist.playlist.songs;
                }
                return this.$store.state.currentPlaylist.playlist;
            },
            set(value) {
                // emit change
                this.$store.dispatch('updateCurrentPlaylist', {newPlaylistOrder: value})
            }
        }
    },
    methods:{
        handleDelete(songId){
           const index = this.myList.findIndex(song => song.id == songId);
           this.myList.splice(index, 1);

           this.$store.dispatch('updateCurrentPlaylist', {newPlaylistOrder: this.myList})
        }
    }
})
</script>


<style scoped>
</style>