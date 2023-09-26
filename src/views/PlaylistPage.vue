<template>
    <!-- <the-search-bar :searchAPIURL="searchUrl" 
    @onSearchResponse="handleSearchResponse"
    @onEmptyFilters="getAllSongs" 
    :withFilters="true"> -->

        <div class="playlist-page">
            <image-text-card>
                <template v-slot:image>
                    <img v-show="playlist.coverImg" :src="coverImgUrl" alt="Обложка">
                </template>

                <template v-slot:main-text>
                    <h1 class="playlist-page__title">{{ playlist.name }}</h1>
                </template>
                <template v-slot:secondary-text >
                    <artists-list v-if="playlist.artists" :artists="playlist.artists"></artists-list>

                    <div v-if="playlist.description">
                        <h3>Описание</h3>
                        <p>{{ playlist.description }}</p>
                    </div>
                    <div v-if="playlist.releaseDate">
                        <h3>Дата создания: {{ new Date(playlist.releaseDate).toLocaleDateString() }}</h3>
                    </div>
                </template>
            </image-text-card>

            <!-- <the-search-bar :searchAPIURL="searchUrl" 
                @onSearchResponse="handleSearchResponse"
                @onEmptyFilters="getAllSongs" 
                :withFilters="true">
            </the-search-bar> -->
        </div>

            <div class="song-list">
                <music-list-item 
                    v-for="(song, key) in playlist.songs" 
                    :key="song.id? song.id : song.song.id"
                    :songData="song && song.song? song.song : song"
                    :playlist="playlist"
                    :playlistType="playlist.type"
                    :songInPlaylistId="key"
                    class="playlist-page__song"
                >
                    <button class="icon-btn"><img src="@/assets/images/query_icon.svg"></button>
                    <template v-if="isAuth">
                        <like-btn :id="song.song? song.songId : song.id"></like-btn>
                    </template>
                </music-list-item>
            </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import MusicListItem from "@/components/songs/MusicListItem.vue";
    import TheSearchBar from "@/components/UI/TheSearchBar.vue";
    import LikeBtn from "@/components/UI/buttons/LikeBtn.vue";
    import ImageTextCard from "@/components/UI/ImageTextCard.vue";
    import ArtistsList from "@/components/songs/ArtistsList.vue"

import axios from "axios";
    export default defineComponent({
        name: "PlaylistPage",
        components: {
            MusicListItem,
            // TheSearchBar,
            LikeBtn,
            ArtistsList,
            ImageTextCard
        },
        data(){
            return{
                playlist: {},
                playlistId: this.$route.params.id,
                error: false,
                // genres: [],
            }
        },
        mounted(){
            // выбор метода получения данных с сервера по названию данной страницы
            if(this.$route.name == "get-generated-playlist"){
                this.getGeneratedPlaylist();
            }else if(this.$route.name == "get-playlist"){
                this.getPlaylist();
            }else{
                this.getAlbum();
            }



            // if(this.$store.state.isAuth){
            //     this.likedSongs = this.getLiked();
            // }
        },
        computed: {
            // адрес обращения на сервер для плейлиста 
            getPlaylistUrl(){
                return this.$store.getters.fullURL('getPlaylist')
            },
            // адрес обращения на сервер для автоматически созданного плейлиста (функция автоматизации) 
            getGeneratedPlaylistUrl(){
                return this.$store.getters.fullURL('getGeneratedPlaylist')
            },
            // адрес обращения на сервер для альбома 
            getAlbumUrl(){
                return this.$store.getters.fullURL('getAlbum')
            },
            // адрес обложки плейлиста (хранится на сервере)
            coverImgUrl(){
                if(this.playlist && this.playlist.coverImg){
                    return this.$store.getters.filePath( 'coverImg', this.playlist.coverImg);
                }
                return ''
            },
            // авторизирован ли пользователь
            isAuth(){
                return this.$store.state.isAuth;
            },
            isLiked(){
                return songId => this.likedSongs.findIndex((likedSong)=> likedSong.songId === songId) !== -1
            },
            searchUrl(){
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.searchFavouriteSongs}`;
        },
            
        },
        methods:{
            // метод получения плейлиста с сервера
            async getPlaylist(){
               axios.get(this.getPlaylistUrl, { params:{id: this.playlistId}})
               .then((res)=>{
                    console.log(res);
                    if(res.status === 200 && res.data){
                        this.playlist = ({...res.data, type: "playlist"});
                    }
                })
                .catch((e)=>{
                    this.error = true;
                    console.log(e)
                });
            },
            // метод получения автоматически генерируемого плейлиста с сервера (функция автоматизации)
            async getGeneratedPlaylist(){
                console.log('requestin gen playlist');
                console.log(this.isAuth);
            if(this.isAuth){
                axios.get(this.getGeneratedPlaylistUrl,{withCredentials:true})
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    if(res.status === 200 && res.data){
                        this.playlist = {...res.data, type: "playlist"};
                    }
                })
                .catch((e)=>{
                    this.error = true;
                    console.log(e)
                })
                }
            },
            // метод получение альбома с сервера
            async getAlbum() {
                axios.get(this.getAlbumUrl, { params:{id: this.playlistId} })
               .then((res)=>{
                    console.log(res);
                    if(res.status === 200 && res.data){
                        this.playlist = ({...res.data, type: "album"});
                    }
                })
                .catch((e)=>{
                    this.error = true;
                    console.log(e)
                });
            },
            handleSearchResponse(response:[]){
                this.songs = response;
            },
            // getPlaylistGenres(playlist){
            //     for(let song of playlist.songs){
            //         if(song.song.genres){

            //         }
            //     }
            // }
        }
    }) 
</script>

<style scope src="@/assets/styles/pages/playlistPage.css">

</style>