<template>
    <button class="icon-btn" @click.stop="handleLikeClick( $event, songId)">
    <svg :class="{'like-btn': true, 'like-btn--active': isLiked}" 
        version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 45.743 45.743" style="enable-background:new 0 0 45.743 45.743;"
        xml:space="preserve">
    <g>
        <path d="M34.199,3.83c-3.944,0-7.428,1.98-9.51,4.997c0,0-0.703,1.052-1.818,1.052c-1.114,0-1.817-1.052-1.817-1.052
            c-2.083-3.017-5.565-4.997-9.51-4.997C5.168,3.83,0,8.998,0,15.376c0,1.506,0.296,2.939,0.82,4.258
            c3.234,10.042,17.698,21.848,22.051,22.279c4.354-0.431,18.816-12.237,22.052-22.279c0.524-1.318,0.82-2.752,0.82-4.258
            C45.743,8.998,40.575,3.83,34.199,3.83z"/>
    </g>
    <!-- <g>
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
    </g> -->
    </svg>
</button>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            likedSongs: [],
        }
    },
    props : [
        'songId',
    ],
    mounted(){
        if(this.$store.state.isAuth){
            this.likedSongs = this.getLiked();
        }
    },
    methods: {
        getLiked(){
            if(this.$store.getters.user){
                return this.$store.getters.user.favoriteSongs;
            }
            return []
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
        // async likeSong(songId:number){
        //     const like = {songId: songId}
        //     axios.post(this.likeSongUrl, like, {withCredentials: true})
        //     .then((response) => {
        //       return response;
        //     })
        //     .catch((error) =>{
        //         console.log(error)
        //     })
        // },
        // async unlikeSong(songId:number){
        //     const songData= {songId: songId};
        //     axios.post(this.unlikeSongUrl, songData, {withCredentials: true})
        //     .then((response)=>{
        //         return response;
        //     })
        //     .catch((error)=>{
        //         console.log(error)
        //     })
        // },
    },
    computed: {
        isLiked(){
            return this.likedSongs.findIndex((likedSong)=> likedSong.songId === this.songId) !== -1
        },
        likeSongUrl(){
            return this.$store.getters.fullURL('likeSong')
        },
        unlikeSongUrl(){
            return this.$store.getters.fullURL('deleteLiked')
        },
    }
})
</script>
