<template>
    <div class="tabs">
        <header :class="{'tab-heading': true, 'tab-heading--active' : activeTabIndex == index}" 
            v-for="(tabName, index) in tabNames"
            :key="'tab-'+tabName"
            @click="onTabClick(tabName, index)"
        >
            <h2>{{ tabName }}</h2>
        </header>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: [
        'tabNames'
    ],
    emits: [
        'onTabClick'
    ],
    data(){
        return{
            activeTabIndex: 0
        }
    },
    methods: {
        onTabClick(tabName, index: number){
            this.$emit('onTabClick', tabName);
            this.activeTabIndex = index;
        }
    }
})
</script>

<style scoped src="@/assets/styles/UI/tabsList.css">
</style>