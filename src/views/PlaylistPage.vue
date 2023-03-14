<template>
    <!-- <the-search-bar :searchAPIURL="searchUrl" 
    @onSearchResponse="handleSearchResponse"
    @onEmptyFilters="getAllSongs" 
    :withFilters="true"> -->
        <div class="playlist-page">
            <div class="playlist-page__info">
                <img v-show="playlist.coverImg" :src="coverImgURL" alt="Обложка плейлиста">
                <h1 class="page-title">{{ playlist.name }}</h1>
            </div>
            <div>
                <music-list-item 
                    v-for="(song, key) in playlist.songs" 
                    :key="song.id"
                    :songData="song"
                    :playlist="playlist"
                    :playlistType="playlist.type"
                    :songInPlaylistId="key"
                    class="playlist-page__song"
                >
                </music-list-item>
            </div>
        </div>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import MusicListItem from "@/components/songs/MusicListItem.vue";
import axios from "axios";
    export default defineComponent({
        name: "PlaylistPage",
        components: {
            MusicListItem
        },
        data(){
            return{
                playlist: {},
                playistId: this.$route.params.id,
                error: false,
            }
        },
        mounted(){
            // выбор метода получения данных с сервера по названию данной страницы
            console.log(this.$route.name);
            if(this.$route.name == "get-generated-playlist"){
                this.getGeneratedPlaylist();
            }else if(this.$route.name == "get-playlist"){
                this.getPlaylist();
            }else{
                this.getAlbum();
            }
        },
        computed: {
            // адрес обращения на сервер для плейлиста 
            getPlaylistURL(){
                return this.$store.getters.fullURL('getPlaylist')
            },
            // адрес обращения на сервер для автоматически созданного плейлиста (функция автоматизации) 
            getGeneratedPlaylistURL(){
                return this.$store.getters.fullURL('getGeneratedPlaylist')
            },
            // адрес обращения на сервер для альбома 
            getAlbumUrl(){
                return this.$store.getters.fullURL('getAlbum')
            },
            // адрес обложки плейлиста (хранится на сервере)
            coverImgURL(){
                if(this.playlist && this.playlist.coverImg){
                    return this.$store.getters.filePath( 'coverImg', this.playlist.coverImg);
                }
                return ''
            },
            // авторизирован ли пользователь
            isAuth(){
                return this.$store.state.isAuth;
            },
            
        },
        methods:{
            // метод получения плейлиста с сервера
            async getPlaylist(){
               axios.get(this.getPlaylistURL, { params:{id: this.playlistId}})
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
                axios.get(this.getGeneratedPlaylistURL,{withCredentials:true})
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
                axios.get(this.getAlbumURL, { params:{id: this.playlistId}})
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
            }
        }
    }) 
</script>

<style scope>
    .playlist-page__song{
        min-width: 50vw;
    }
</style>