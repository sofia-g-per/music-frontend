<template>
    <div class="home-page">
    <the-search-bar :searchAPIURL="searchUrl" 
    @onSearchResponse="handleSearchResponse"
    @onEmptyFilters="getAllSongs" 
    :withFilters="true">
    </the-search-bar>
    <div v-if="generatedPlaylists && generatedPlaylists.length > 0" class="playlist-list">
        <playlist-item 
            v-for="playlist in generatedPlaylists" 
            :key="playlist.name" 
            :itemData="playlist"
            itemType="playlist"
        >
        </playlist-item>
    </div>
    <div v-if="albums && albums.length > 0" class="playlist-list">
        <playlist-item 
            v-for="album in albums" 
            :key="album.id" 
            :itemData="album"
            itemType="album"
        >
        </playlist-item>
    </div>
    <div v-if="songs && songs.length > 0" class="song-list">
        <music-list-item
            v-for="(song, key) in songs" 
            :key="song.id" 
            :songData="song"
            :playlist="songs"
            playlistType="allSongs"
            :songInPlaylistId="key"
        >
            <button class="icon-btn"><img src="@/assets/images/query_icon.svg"></button>
            <template v-if="isAuth">
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
            songs: [],
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
        getGeneratedPlaylistURL(){
            return this.$store.getters.fullURL('getGeneratedPlaylist')
        },
        searchUrl(){
            return this.$store.getters.fullURL('globalSearch')
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
                        console.log("albums", response.data);
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
            this.songs = response;
        },
    
        getAllSongs(){
            axios.get(this.getSongsURL)
                .then((response) => {
                        if(response.status === 200 && response.data){
                            this.songs = response.data;
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
                axios.get(this.getGeneratedPlaylistURL,{withCredentials:true})
                // обработка результаты запроса
                .then((res) => {
                    if(res.status === 200 && res.data){
                        //добавление плейлиста в массив плейлистов
                        this.generatedPlaylists.push({...res.data, type: "generated/playlist"});
                    }
                })

            }
        }
    }

})
</script>

<style scoped>
    .playlist-list{
        padding-top: 3rem;
        align-self: flex-start;
        flex-wrap: wrap;
        display: flex;
        justify-content: center;
        gap: 2rem;
        width: 100%;

    }

    .home-page{
        width: 100%;
        padding: 0 6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
