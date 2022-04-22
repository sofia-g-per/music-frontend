<template>
            <p class="form-field__label">Песни: </p>
        <div class="song-select">
            <div v-for="song in songs" :key="song.id" class="music-list-item">
                <div class="music-list-item__info">
                    <h2 class="music-list-item__info__title heading-tretriary">{{song.name}}</h2>
                    <div class="music-list-item__artist-wrapper">
                        <p v-for="artist in song.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
                    </div>
                </div>
                <div class="music-list-item__buttons">
                    <input type="checkbox" v-model="songIds" :value="song.id">
                </div>
            </div>
        </div>
</template>


<style scoped>
.song-select{
    max-height: 50vh;
    min-height: 20vh;
    min-width: 35vw;
    overflow-y: scroll;
}

.music-list-item{
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

.music-list-item__artist-wrapper{
    padding-left: 1rem;
}
</style>