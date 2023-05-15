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

<style scoped>
.tabs{
    display: flex;
    gap: 0.5rem;
}

.tab-heading{
    border-top-right-radius: 2rem; 
    border-top-left-radius: 2rem; 
    background: var(--accent-color-1);
    padding: 1rem;
}

.tab-heading--active{
    background: var(--basic-gradient);
}
</style>