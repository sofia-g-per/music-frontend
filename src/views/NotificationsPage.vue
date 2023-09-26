<template>
    <div class="notifications-page">
        <h1 class="page-title gradient-text">Оповещения</h1>
        <div >
            <div class="notif-container" v-for="(notif, index) in notifications" :key="notif.id">
                <!-- <router-link to="/">Посмотреть песню</router-link> -->
                <template v-if="notif.status.name !== 'accepted' && notif.status.name !== 'rejected'">
                    <p>Пользователь "{{ notif.sender.artist.stagename }}" хочет добавить песню "{{ notif.content.name }}" с вашим участием</p>
                    <div class="flex">
                        <button class="main-btn main-btn--outline" @click="changeStatus(notif.id, index, 'accepted')"><span class="main-btn--with-icon__text gradient-text">Согласиться</span></button>
                        <button class="main-btn main-btn--outline" @click="changeStatus(notif.id, index,  'rejected')"><span class="main-btn--with-icon__text gradient-text">Отказаться</span></button>
                    </div>
                </template>
                <template v-if="notif.status.name == 'accepted'">
                    <p>Вы согласились участвовать в песни "{{ notif.content.name }}" пользователя "{{ notif.sender.artist.stagename }}"</p>
                    <button class="main-btn main-btn--outline" @click="changeStatus(notif.id, index, 'rejected')"><span class="main-btn--with-icon__text gradient-text">Отказаться</span></button>
                </template>
                <template v-if="notif.status.name == 'rejected'">
                    <p>Вы отказали пользователю "{{ notif.sender.artist.stagename }}" в вашем участии в песни "{{ notif.content.name }}"</p>
                    <button class="main-btn main-btn--outline" @click="changeStatus(notif.id, index, 'accepted')"><span class="main-btn--with-icon__text gradient-text">Согласиться</span></button>
                </template>
                
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import axios from 'axios'
export default defineComponent({
    name: 'NotificationsPage',
    data() {
        return {
            notifications: [],
        }
    },
    mounted(){
        this.getNotifications();
    },
    computed: {
        getNotificationsURL(){
            return this.$store.getters.fullURL('getNotifications');
        },
        changeNotifStatusURL(){
            return this.$store.getters.fullURL('editNotificationStatus')
        }
        
    },
    methods: {
        getNotifications(){
            axios.get(this.getNotificationsURL, {withCredentials:true})
                .then((response) => {
                    if(response.status === 200 && response.data){
                        this.notifications = response.data;
                        console.log("notifs", this.notifications);
                    }else{
                        console.log(response);
                    }
                })
                .catch((error)=> {
                    console.log(error);
                })
        },
        changeStatus(notifId: number, indexInArray: number, status: string){
            console.log("new status", status);
            axios.post(this.changeNotifStatusURL, {id: notifId, status: status}, {withCredentials: true})
                .then((response)=>{
                    if(response.status == 201){
                        console.log("initial", indexInArray, this.notifications);
                        console.log("response", response.data);
                        this.notifications[indexInArray] = response.data;
                        console.log("res", this.notifications[indexInArray]);
                    }
                })
                .catch(error=>
                {
                    console.log(error);
                })
        }
    }

})
</script>

<style scoped src="@/assets/styles/pages/notificationsPage.css">

</style>
