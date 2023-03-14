<template>
    <the-search-bar :searchAPIURL="searchUrl" 
    @onSearchResponse="handleSearchResponse"
    @onEmptyFilters="getAllSongs" 
    :withFilters="true">
    </the-search-bar>
    <div v-if="generatedPlaylists && generatedPlaylists.length > 0" class="item-grid">
        <playlist-item 
            v-for="playlist in generatedPlaylists" 
            :key="playlist.name" 
            :itemData="playlist"
            :likedSongs="likedSongs"
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
            <template v-if="isAuth">
                <button class="icon-btn" @click.stop="handleLikeClick( $event, song.id)">
                    <svg :class="{'like-btn': true, 'like-btn--active': isLiked(song.id)}" 
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
            </template>
        </music-list-item>
    </div>   
    <div v-else class="page-error">
        <!-- К сожалению, по вашему запросу ничего не найдено -->
        <span></span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheSearchBar from '@/components/UI/TheSearchBar.vue'
import MusicListItem from '@/components/songs/MusicListItem.vue'
import PlaylistItem from '@/components/songs/PlaylistItem.vue'
import axios from 'axios'
export default defineComponent({
    name: 'HomePage',
    components:{
        TheSearchBar,
        MusicListItem,
        PlaylistItem
    },
    data() {
        return {
            songs: [],
            genres: [],
            genreIds: [],
            likedSongs: [],
            playlists: [],
            generatedPlaylists: [],
        }
    },
    mounted(){
        this.getAllSongs();
        if(this.$store.state.isAuth){
            this.likedSongs = this.getLiked();
        }
        this.getGeneratedPlaylist();
    },
    computed: {
        getSongsURL(){
            return this.$store.getters.fullURL('getSongs')
        },
        getGeneratedPlaylistURL(){
            return this.$store.getters.fullURL('getGeneratedPlaylist')
        },
        searchUrl(){
            return this.$store.getters.fullURL('globalSearch')
        },
        likeSongUrl(){
            return this.$store.getters.fullURL('likeSong')
        },
        unlikeSongUrl(){
            return this.$store.getters.fullURL('deleteLiked')
        },
        isAuth(){
            return this.$store.state.isAuth;
        },
        isLiked(){
            return songId => this.likedSongs.findIndex((likedSong)=> likedSong.songId === songId) !== -1
        }
    },
    methods: {
        handleSearchResponse(response:[]){
            this.songs = response;
        },
        getLiked(){
            if(this.$store.getters.user){
                return this.$store.getters.user.favoriteSongs;
            }
            return []
        },
        async likeSong(songId:number){
            const like = {songId: songId}
            axios.post(this.likeSongUrl, like, {withCredentials: true})
            .then((response) => {
                console.log('likeresponse', response.data)
              return response;

            })
            .catch((error) =>{
                console.log(error)
            })
        },
        async unlikeSong(songId:number){
            const songData= {songId: songId};
            axios.post(this.unlikeSongUrl, songData, {withCredentials: true})
            .then((response)=>{
                console.log('unlike response', response)
                return response;
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        async handleLikeClick(e, songId:number){
            const likeBtn = e.target.closest('.like-btn')
            let response;
            if(likeBtn){     
                //если песня в избранном -> убрать из избранного
               if( likeBtn.classList.contains('like-btn--active')){
                    // response = await this.unlikeSong(songId)
                    const songData= {songId: songId};
                    axios.post(this.unlikeSongUrl, songData, {withCredentials: true})
                    .then((response)=>{
                        if(response.status === 201){
                                let newUserData = this.$store.getters.user;
                                let newFav = newUserData.favoriteSongs.filter(like=> like.songId !== songId)
                                newUserData.favoriteSongs = newFav;
                                this.$store.dispatch('updateUser', {newUserData: newUserData});
                                this.likedSongs = newFav;

                            }
                        })
                        .catch((error)=>{
                            console.log(error)
                        }) 
                }else{
                    // response = await this.likeSong(songId)
                    const like = {songId: songId}
                        axios.post(this.likeSongUrl, like, {withCredentials: true})
                        .then((response) => {
                            if(response.status === 201){
                                let newUserData = this.$store.getters.user;

                                newUserData.favoriteSongs.push(response.data)
                                this.$store.dispatch('updateUser', {newUserData: newUserData});
                                this.likedSongs = newUserData.favoriteSongs;
                            }
                        })
                        .catch((error) =>{
                            console.log(error)
                        })
                }

                if(response === 200 || response === 201){
                    likeBtn.classList.toggle('like-btn--active');
                }
            }
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
        getGeneratedPlaylist(){
            if(this.isAuth){
                axios.get(this.getGeneratedPlaylistURL,{withCredentials:true})
                .then((res) => {
                    console.log(res);
                    if(res.status === 200 && res.data){
                        this.generatedPlaylists.push({...res.data, type: "generated/playlist"});
                    }
                })
                .catch((e)=>{
                    console.log(e)
                })

            }
        }
    }

})
</script>

<style scoped>
    .item-grid{
        align-self: flex-start;
    }
</style>
