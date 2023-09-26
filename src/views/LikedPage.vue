<template>
        <h1 class="page-title">Ваши избранные песни</h1>
        <the-search-bar :searchAPIURL="searchAPIURL" @onSearchResponse="handleSearchResponse" @onEmptyFilters="getAllSongs" :withFilters="true" :filterApiUrl="filterApiURL" />
        <ul class="song-list" v-if="songs">
            <music-list-item
                v-for="(song, key) in shownSongs" 
                :key="song.id"
                :songData="song.song"
                :onSearchReponse="handleSearchResponse"
                :playlist="songs"
                playlistType="liked"
                :songInPlaylistId="key"
            >
            <button class="icon-btn"><img src="@/assets/images/query_icon.svg"></button>
            <button class="icon-btn" @click.stop="handleDelete(song.songId)">
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
                <!-- <xbtn   class="delete-btn"/> -->
            </music-list-item>
        </ul>
        <!-- У вас ещё нет избранных песен -->
        <p v-else></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MusicListItem from '@/components/songs/MusicListItem.vue';
import TheSearchBar from '@/components/UI/TheSearchBar.vue';
import axios from 'axios';

export default defineComponent({
    name: "LikedPage",
    components: {
        MusicListItem,
        TheSearchBar,
    },
    data(){
        return{
            songs: [],
            shownSongs: []
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.getFavouriteSongs}`;
        }, 
        searchAPIURL(){
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.searchFavouriteSongs}`;
        },
        filterApiURL(){
            return `${this.$store.state.APIURL}filter/liked`;
        },
        deleteApiURL(){
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.deleteLiked}`;
        }
    },
    mounted(){
        axios.get(this.fullApiUrl, { withCredentials: true })
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
                  this.shownSongs = this.songs;
              }

        })
        .catch((error) =>{
            // если пользователь не авторизован
            if(error.response && error.response.status === 403) {
                  this.$router.push({name: 'login'})
              }
              console.log(error)
        })
    },
    methods: {
        handleSearchResponse(response:[]){
            this.shownSongs = response;
        },
        handleDelete(songId:number){
            const songData= {songId: songId};
            axios.post(this.deleteApiURL, songData, {withCredentials: true})
            .then((response)=>{
                if(response.status === 201 && response.data){
                    let newUserData = this.$store.getters.user;
                    let newFav = newUserData.favoriteSongs.filter(like=> like.songId !== songId)
                    newUserData.favoriteSongs = newFav;
                    this.$store.dispatch('updateUser', {newUserData: newUserData});
                    
                    let index = this.songs.findIndex((song)=>song.songId == songId);
                    this.songs.splice(index, 1);
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        getAllSongs(){
            this.shownSongs = this.songs;
        }
    }

    
})
</script>

