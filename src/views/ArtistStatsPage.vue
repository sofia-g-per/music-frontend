<template>
        <!-- <section>
            
        </section> -->
        <section class="stats-table">
            <div class="stats-item stats-table__item">
                <p class="stats-item__number ">{{ stats.songNumber }}</p>
                <p class="stats-item__text gradient-text">опубликованных песен</p>
            </div>
            <div class="stats-item stats-table__item">
                <p class="stats-item__number">{{ stats.totalPlays }}</p>
                <p class="stats-item__text gradient-text">прослушиваний</p>
            </div>
            <div class="stats-item stats-table__item">
                <p class="stats-item__number">~{{ formatNumber(stats.avgPlaysPerDay)}}</p>
                <p class="stats-item__text gradient-text">прослушиваний в день</p>
            </div>
            <div class="stats-item stats-table__item">
                <p class="stats-item__number">~{{ formatNumber(stats.avgPlaysPerMonth)}}</p>
                <p class="stats-item__text gradient-text">прослушиваний в месяц</p>
            </div>
        </section>

        <!-- make into tabs -->
        <section class="chart-section">
            <line-chart v-if="loaded" :chartData="playsPerDayChart" :options="chartOptions"></line-chart>
            <line-chart v-if="loaded" :chartData="playsPerMonthChart" :options="chartOptions"></line-chart>
        </section>
        <section class="chart-section">
            <line-chart v-if="loaded" :chartData="songPlaysPerDayChart" :options="chartOptions"></line-chart>
            <line-chart v-if="loaded" :chartData="songPlaysPerMonthChart" :options="chartOptions"></line-chart>
        </section>
        <table>
            <tr>
                <th></th>
                <th class="song-stats--header">
                    <p>Количество прослушивания</p>
                </th >
                <th class="song-stats--header">
                    <p>Среднее количество прослушиваний в день</p>
                </th>
                <th class="song-stats--header"> 
                    <p>Среднее количество прослушиваний в месяц</p>
                </th>
            </tr >
            <tr v-for="song in stats.songStats" 
                :key="'songStats-'+song.id"
                class="background-gradient"
            >
                <td>
                    <song-info class="padding"
                        :songData="song"
                    />
                </td>
                <td class="song-stats--stats" >
                    <p >{{ song.totalPlays }}</p>
                </td>
                <td class="song-stats--stats">
                    <p >{{ formatNumber(song.avgPlaysPerDay) }}</p>

                </td>
                <td class="song-stats--stats">
                    <p >{{ formatNumber(song.avgPlaysPerMonth) }}</p>
                </td>
                        
            </tr>
        </table>


</template>

<script lang="ts">
import { ArtistStats } from '@/dtos/artistStats.dto';
import axios from 'axios'
import { defineComponent } from 'vue'
import SongInfo from '@/components/songs/SongInfo.vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.3)';
Chart.defaults.color = 'white';
export default defineComponent({
    components: {
        SongInfo,
        LineChart
    },
    data() {
        return{
            stats: new ArtistStats(),
            loaded: false,
            playsPerDayChart: null,
            playsPerMonthChart: null,
            songPlaysPerDayChart: null,
            songPlaysPerMonthChart: null,
            chartOptions: {
                scales: {
                    xAxis: {
                        // type: 'date',
                        color: 'red',
                    },
                    yAxis: {
                        // type: 'date',
                        color: 'red',
                    }
                }
            }
        }
    },
    mounted() {
        this.getStats();
    },
    methods: {
        getStats() {
            axios.get(this.getStatsURL, {withCredentials: true})
            .then((response) => {
                this.stats = response.data;
                console.log(response.data);
                this.playsPerDayChart = this.formChartData(this.stats.playsPerDay, "listen_date", "plays");
                this.playsPerMonthChart = this.formChartData(this.stats.playsPerMonth, "listen_date", "plays");
                this.songPlaysPerDayChart = this.formChartDataSets(this.stats.songPlaysPerDay,  "listen_date", "plays", "name", "song_id");
                this.songPlaysPerMonthChart = this.formChartDataSets(this.stats.songPlaysPerMonth,  "listen_date", "plays", "name", "song_id");
                this.loaded = true;
            })
            .catch((error) => {
                console.log("error", error);
            })
        },
        formatNumber(number){
            if(number !== undefined){

                number = Number(number);
                if(Math.round(number) == number){
                    return number;
                }else{
                    return Number(number.toFixed(2));
                }
            }else{
                return 0;
            }
        },
        formChartData(objectArray, labelKey:string, dataKey: string){
            const labels: any = [];
            const data: any = [];
            objectArray.forEach((object) => 
            {
                if(object[labelKey] !== undefined && object[dataKey] !== undefined){
                    let label = new Date(Date.parse(object[labelKey]));
                    labels.push(label.toLocaleDateString());
                    data.push(object[dataKey]);
                }
            })

            return {
                labels: labels,
                datasets: [
                    {
                        label: 'Количество прослушиваний',
                        showLine: true,
                        borderColor: '#c956ff',
                        backgroundColor: '#c956ff',
                        data: data,
                        tension: 0.4   
                    }
                ]
            }
        },
        formChartDataSets(objectArray, labelKey:string, dataKey: string, dataLabelKey: string, dataSetIdKey: string){
            // add more color
            const colors = [
                '#E35FAD',
                '#FF738D',
                '#FF9B6E',
                '#FFCA5F',
                '#F9F871',
            ];
            const labels: any = [];
            console.log("objetcArray", objectArray);
            const dataSets: any = [{
                label: objectArray[0][dataLabelKey],
                showLine: true,
                backgroundColor: '#c956ff',
                borderColor: '#c956ff',
                data: [],
                tension: 0.4
            }];
            let dataSetIdValue = objectArray[0][dataSetIdKey];
            let currentDataSetId = 0;
            for( let object of objectArray)
            {
                if(object[labelKey] !== undefined && object[dataKey] !== undefined){
                    let label = new Date(Date.parse(object[labelKey]));
                    labels.push(label.toLocaleDateString());
                    if(object[dataSetIdKey] == dataSetIdValue){
                        dataSets[currentDataSetId].data.push(object[dataKey]);
                    }else{
                        dataSetIdValue = object[dataSetIdKey];
                        dataSets.push(                
                            {
                                label: objectArray[0][dataLabelKey],
                                showLine: true,
                                borderColor: colors[dataSetIdKey],
                                backgroundColor: colors[dataSetIdKey],
                                data: [],
                                tension: 0.4
                            }
                        )
                        currentDataSetId += 1;
                    }
                }
            }

            console.log({
                labels: labels,
                datasets: dataSets
            });

            return {
                labels: labels,
                datasets: dataSets
            }
        }
    },
    computed: {
        getStatsURL(){
            return this.$store.getters.fullURL('getArtistStats');
        }
    },

})
</script>

<style scoped>
    .stats-table{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .stats-item{
        display:flex;
        align-items: center;
    }
    .stats-item__number{
        color: var(--accent-color-1--light);
        font-size: 4.8rem;
        font-weight: 700;
    }

    .stats-item__text{
        padding-left: 1.5rem;
        font-size: 1.2rem;
        max-width: 25ch;
    }

    .song-stats{
        width: 35%;
        text-align: center;

        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        column-gap: 1.5rem;
    }

    .song-stats--stats{
        text-align: center;
        font-size: 2.2rem;
    }

    .song-stats--header{
        justify-self: flex-end;
    }

    .song-stats--header>p{
        max-width: 20ch;
        font-size: 1.4rem;
    }

    .padding{
        padding: 1vw 1vw 2vw 1vw;
    }

    .background-gradient{
       background:  linear-gradient(to top, rgba(187, 0, 255, 0.6) 0, transparent 30%);
    }

    .chart-section{
        display: flex;
        justify-content: space-around;
    }
</style>
