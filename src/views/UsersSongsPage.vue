<template>
    <router-link class="circle-btn align-right" to="/add-song"></router-link>
    <tabs-list :tabNames="tabNames" @onTabClick="handleTabClick" />
    <div class="song-list" v-if="shownSongs && shownSongs.length > 0">
        <music-list-item v-for="song in shownSongs" :key="song.id" :songData="song">
            <template v-slot>
                <div class="music-list-item__buttons">
                    <edit-btn @click.stop :link="'/edit-song/'+song.id"></edit-btn>
                    <xbtn @click.stop="handleDelete(song.id)">x</xbtn>
                </div>
            </template>
        </music-list-item>
    </div>
    <div v-else>
        <p class="no-results">У вас пока нет добавленных песен</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MusicListItem from '@/components/songs/MusicListItem.vue'
import Xbtn from '@/components/UI/buttons/Xbtn.vue'
import axios from 'axios'
import EditBtn from '@/components/UI/buttons/EditBtn.vue'
import TabsList from '@/components/UI/TabsList.vue'
export default defineComponent({
    name:"UsersSongsPage",
    components:{
        MusicListItem,
        Xbtn,
        EditBtn,
        TabsList
    },
    data() {
        return {
            released: [],
            drafts: [],
            // список песен выводящейся на экран пользователю
            shownSongs: this.drafts,
            tabNames: ['Черновики', 'Выпущенное']
        }
    },
    mounted(){
        axios.get(this.getSongsApiURL, {withCredentials: true})
       .then((response) => {
              if(response.status === 200 && response.data){
                this.released = response.data;
              }
        })
        .catch((error)=> {
            console.log(error)
        })

        axios.get(this.getSongDraftsApiURL, {withCredentials: true})
       .then((response) => {
              if(response.status === 200 && response.data){
                this.drafts = response.data;
                this.shownSongs = this.drafts;
              }
        })
        .catch((error)=> {
            console.log(error)
        })
    },
    computed:{
        getSongsApiURL(){
            return this.$store.getters.fullURL('getCurrentArtistSongs');
        },
        getSongDraftsApiURL(){
            return this.$store.getters.fullURL('getCurrentArtistSongDrafts');
        },
        deleteApiURL(){
            return this.$store.getters.fullURL('deleteSong');
        }
    },
    methods:{
        handleDelete(songId){
            const data = {
                songId: songId
            }
            axios.post(this.deleteApiURL, data, {withCredentials: true})
            .then((response) => {
                if(response.status === 201){
                    let index = this.shownSongs.findIndex((song)=>song.id === songId);
                    this.shownSongs.splice(index, 1);
                }
            })
        },
        handleTabClick(tabName: string){
            console.log('tabName', tabName);

            switch(tabName){
                case('Черновики'):
                    this.shownSongs = this.drafts;
                console.log('drafts', this.shownSongs, this.drafts);

                break;
                case('Выпущенное'):
                    this.shownSongs = this.released;
                console.log('released', this.shownSongs, this.released);

                break;
            }

        }
    }
})
</script>
