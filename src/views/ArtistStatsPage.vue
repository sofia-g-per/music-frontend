<template>
        <h1 class="page-title gradient-text">Статистика</h1>
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
            <div>
                <h1 class=" gradient-text">Прослушивания за месяц</h1>
                <line-chart v-if="loaded" :chartData="playsPerDayChart" :options="chartOptions"></line-chart>
            </div>
            <div>
                <h1 class=" gradient-text">Прослушивания за год</h1>
                <line-chart v-if="loaded" :chartData="playsPerMonthChart" :options="chartOptions"></line-chart>
            </div>
            <div>
                <h1 class=" gradient-text">Прослушивания за месяц</h1>
                <line-chart v-if="loaded" :chartData="songPlaysPerDayChart" :options="chartOptions"></line-chart>
            </div>
            <div>
                <h1 class=" gradient-text">Прослушивания за год</h1>
                <line-chart v-if="loaded" :chartData="songPlaysPerMonthChart" :options="chartOptions"></line-chart>
            </div>
        </section>
        <div class="table-wrapper">
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
        </div>


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
                this.playsPerDayChart = this.formChartData(this.stats.playsPerDay, "period", "plays");
                this.playsPerMonthChart = this.formChartData(this.stats.playsPerMonth, "period", "plays");
                this.playsPerMonthChart.labels = this.formatLabelDates(this.playsPerMonthChart.labels, "month");

                this.songPlaysPerDayChart = this.formChartDataSets(this.stats.songPlaysPerDay,  "period", "plays", "name", "song_id");
                this.songPlaysPerMonthChart = this.formChartDataSets(this.stats.songPlaysPerMonth,  "period", "plays", "name", "song_id");
                this.songPlaysPerMonthChart.labels = this.formatLabelDates(this.songPlaysPerMonthChart.labels, "month");
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
        formatLabelDates(dateList:string[], period: string){
            let result:any = [];
            if(period == "month"){
                console.log(dateList);
                result = dateList.map((str) => new Date(str.split('.')[1]).toLocaleString('ru-RU', {month: 'long',}));
            }
            return result;
        },
        formChartData(objectArray, labelKey:string, dataKey: string){
            const labels: any = [];
            const data: any = [];
            objectArray.forEach((object) => 
            {
                if(object[labelKey] !== undefined && object[dataKey] !== undefined){
                    let label = new Date(Date.parse(object[labelKey]));
                    labels.push(label.toLocaleDateString('ru-RU'));
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
            console.log("stats", objectArray);
            // add more color
            const colors = [
                '#FF008A',
                '#FF738D',
                '#FF9B6E',
                '#FFCA5F',
                '#F9F871',
            ];
            const labels: any = [];
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
                    let labelIndex = -1;
                    let insertIndex = -1;
                    labelIndex = labels.findIndex((el) => el == label);
                    if(labelIndex == -1){
                        labels.push(label.toLocaleDateString('ru-RU'));
                    }else{
                        insertIndex = labelIndex;
                    }

                    // проверка та же песня или нужно создать новую линию на графике (датасет)
                    if(object[dataSetIdKey] != dataSetIdValue){
                        currentDataSetId += 1;
                        dataSetIdValue = object[dataSetIdKey];
                        dataSets.push(                
                            {
                                label: object[dataLabelKey],
                                showLine: true,
                                borderColor: colors[currentDataSetId],
                                backgroundColor: colors[currentDataSetId],
                                data: [],
                                tension: 0.4
                            }
                        )
                        for(let i = 0; i < labels.length; i++){
                            dataSets[currentDataSetId].data.push(0);
                        }
                    }
                    if(insertIndex != -1){
                        dataSets[currentDataSetId].data.split(insertIndex, 1, object[dataKey]);

                    }else{
                        dataSets[currentDataSetId].data.push(object[dataKey]);
                    }

                }
            }

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

<style scoped src="@/assets/styles/pages/artistStatsPage.css">
    
</style>
