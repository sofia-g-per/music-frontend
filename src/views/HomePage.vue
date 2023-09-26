<template>
    <div class="home-page">
    <the-search-bar :searchAPIURL="searchUrl" 
        :filterApiUrl="filterApiURL"
        @onSearchResponse="handleSearchResponse"
        @onEmptyFilters="getAllSongs" 
        :withFilters="true">
    </the-search-bar>
    <div  class="playlist-list">
        <playlist-item 
            v-for="playlist in generatedPlaylists" 
            :key="playlist.name" 
            :itemData="playlist"
            itemType="generated/playlist"
        >
        </playlist-item>

        <playlist-item 
            v-for="album in albums" 
            :key="album.id" 
            :itemData="album"
            itemType="album"
        >
        </playlist-item>
    </div>
    <div v-if="songs && songs.songs && songs.songs.length > 0" class="song-list">
        <music-list-item
            v-for="(song, key) in songs.songs" 
            :key="song.id" 
            :songData="song"
            :playlist="songs"
            playlistType="allSongs"
            :songInPlaylistId="key"
        >
            <template v-if="isAuth">
                <button class="icon-btn" @click.stop="addToQueue(song)"><img src="@/assets/images/query_icon.svg"></button>
                <like-btn :songId="song.song? song.songId: song.id"></like-btn>
            </template>
        </music-list-item>
    </div>   
    <div v-else class="page-error">
        <!-- К сожалению, по вашему запросу ничего не найдено -->
        <span></span>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheSearchBar from '@/components/UI/TheSearchBar.vue'
import MusicListItem from '@/components/songs/MusicListItem.vue'
import PlaylistItem from '@/components/songs/PlaylistItem.vue'
import LikeBtn from '@/components/UI/buttons/LikeBtn.vue'
import axios from 'axios'
export default defineComponent({
    name: 'HomePage',
    components:{
        TheSearchBar,
        MusicListItem,
        PlaylistItem,
        LikeBtn
    },
    data() {
        return {
            songs: {name: 'Популярное'},
            genres: [],
            genreIds: [],
            likedSongs: [],
            playlists: [],
            generatedPlaylists: [],
            albums: [],
        }
    },
    mounted(){
        this.getAllSongs();
        this.getGeneratedPlaylist();
        this.getAlbums();
    },
    computed: {
        getSongsURL(){
            return this.$store.getters.fullURL('getSongs')
        },
        getAlbumsURL(){
            return this.$store.getters.fullURL('getAlbums')
        },
        getGeneratedPlaylistsURL(){
            return this.$store.getters.fullURL('getGeneratedPlaylists')
        },
        searchUrl(){
            return this.$store.getters.fullURL('globalSearch')
        },
        filterApiURL(){
            return `${this.$store.state.APIURL}global-filter`;
        },
        isAuth(){
            return this.$store.state.isAuth;
        },
        isLiked(){
            return songId => this.likedSongs.findIndex((likedSong)=> likedSong.songId === songId) !== -1
        }
    },
    methods: {
        getAlbums(){
            axios.get(this.getAlbumsURL)
            .then((response) => {
                    if(response.status === 200 && response.data){
                        this.albums = response.data;
                    }else{
                        console.log(response);
                    }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        handleSearchResponse(response:[]){
            this.songs.songs = response;
        },
    
        getAllSongs(){
            axios.get(this.getSongsURL)
                .then((response) => {
                        if(response.status === 200 && response.data){
                            this.songs.songs = response.data.songs;
                        }

                    })

                    axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`)
                        .then((response) => {
                        if(response.status === 200 && response.data){
                            this.genres =  response.data;
                        }
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
        },
        // загрузка персонализированного плейлиста с сервера
        getGeneratedPlaylist(){
            if(this.isAuth){
                axios.get(this.getGeneratedPlaylistsURL,{withCredentials:true})
                // обработка результаты запроса
                .then((res) => {
                    if(res.status === 200 && res.data){
                        //добавление плейлиста в массив плейлистов
                        this.generatedPlaylists= res.data;
                        // type: "generated/playlist"});
                    }
                })

            }
        },
        addToQueue(song){
            this.$store.dispatch('addSongToQueue',{song: song});
        }
    }

})
</script>

<style scoped src="@/assets/styles/pages/homePage.css">
</style>
