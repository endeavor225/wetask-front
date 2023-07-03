<template>
  <div>

    <div class="q-pa-md row items-start q-gutter-md" align="around">
      <q-card class="my-card col-6">
          <q-card-section class="bg-grey-8 text-white">
           <div class="text-subtitle2">Tâches</div>
            <div class="text-h6">À faire</div>
            <!--<div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-actions align="around">
            <div class="text-subtitle2">{{this.tacheAfaire}} tâche (s)</div>
            <a @click="$router.push('/taches')" style="text-decoration: none">
              <q-btn flat color="grey-8">Voir</q-btn>
            </a>
          </q-card-actions>
        </q-card>
   
        <q-card class="my-card col-6">
          <q-card-section class="bg-orange text-white">
            <div class="text-subtitle2">Tâches</div>
            <div class="text-h6">En cours</div>
          </q-card-section>
          <q-card-actions align="around">
            <div class="text-subtitle2">{{this.tacheEnCours}} tâche (s)</div>
            <a @click="$router.push('/taches')" style="text-decoration: none; color: black">
              <q-btn flat color="orange">Voir</q-btn>
            </a>
          </q-card-actions>
        </q-card>
    </div>
    

      <div v-for="(item, index) in tabchart" :key="'item-'.concat(index)" >
        <div v-for="(subitem, index) in item.donnee" :key="'subitem-'.concat(index)">
          <div v-for="(setitem, index) in item.setting" :key="'setitem-'.concat(index)">
          <div class="col">
            <!-- <h5 class="text-cyan-5">Statistiques</h5> -->
            <h5 class="text">Statistiques</h5>
          </div>
          <div class="col">
            <chart :typed="item.type" :donnee="subitem" :setting="setitem"/>
          </div>
          </div>
        </div>
      </div>

    <!-- <q-card class="my-card">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">Tâche terminée</div>
      </q-card-section>

      <q-card-actions align="around">
        <div class="text-subtitle2">0 tâche (s)</div>
        <a @click="$router.push('/taches')" style="text-decoration: none; color: black">
            <q-btn flat color="teal">Voir</q-btn>
        </a>
      </q-card-actions>
    </q-card -->
  </div>
</template>

<script>
import AccueilMixin from "pages/IndexMixin";
import chart from "components/Chart"
export default {
  mixins: [AccueilMixin],

  components: {
    chart
  },

  async created() {
    await this.findTask();
    await this.statistique();
  },

  data() {
    return {
      tasks: [],
      tacheAfaire: "",
      tacheEnCours: "",
      tabchart:[]
      /*{
        type:'pie',
        title: 'Pie chart',
        donnee:[
          {
          columns: ['mois', 'dataset1', 'dataset2'],
          rows: [
            { mois: 'January', dataset1: 30, dataset2: 10 },
            { mois: 'February', dataset1: 10, dataset2: 40 },
            { mois: 'March', dataset1: 70, dataset2: 20 },
            { mois: 'April', dataset1: 15, dataset2: 35 },
            { mois: 'May', dataset1: 60, dataset2: 25 },
            { mois: 'June', dataset1: 20, dataset2: 50 },
            { mois: 'July', dataset1: 70, dataset2: 10 }
          ]
          }
        ],
        setting:[{
          labelMap: {
	          dataset1: 'My first dataset',
	          dataset2: 'My second dataset'
          }
        }]
      },
      {
        type:'histogram',
        title: 'Bar chart',
        donnee:[
          {
          columns: ['mois', 'dataset1', 'dataset2'],
          rows: [
            { 'mois': 'January', 'dataset1': 30, 'dataset2': 10 },
            { 'mois': 'February', 'dataset1': 10, 'dataset2': 40 },
            { 'mois': 'March', 'dataset1': 70, 'dataset2': 20 },
            { 'mois': 'April', 'dataset1': 15, 'dataset2': 35 },
            { 'mois': 'May', 'dataset1': 60, 'dataset2': 25 },
            { 'mois': 'June', 'dataset1': 20, 'dataset2': 50 },
            { 'mois': 'July', 'dataset1': 70, 'dataset2': 10 }
          ]
          }
        ],
        setting:[{
          labelMap: {
	          dataset1: 'My first dataset',
	          dataset2: 'My second dataset'
          }
        }]
      }
    ],*/
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 45%

.col-md-6 > div
  border: 1px solid rgba(86, 61, 124, .2)
h5
  text-align: center
</style>
