<template>
  <div>
    <q-card>
      <!-- Boutton pour fermer le modal -->
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6" style="color: #0e8f33;">Detail de la tâche</div>
      <q-space />
      <q-btn icon="close" color="negative" flat round v-close-popup />
    </q-card-section>

    <div class="q-pt-none q-pb-none">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6">
            {{ detailTache.titre }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{ detailTache.description }}
        </div>
        <div class="text-caption text-grey">
          {{ $dateFormat(new Date(detailTache.debut)) }} -
          {{ $dateFormat(new Date(detailTache.fin)) }} 
        </div>
        <div class="text-subtitle1">
          <q-badge v-if="detailTache.priorite"  outline :color="detailTache.priorite.color">{{detailTache.priorite.titre}}</q-badge>
        </div>
      </q-card-section>

       <q-card-section align='right' class="q-pt-none">
        <div class="text-caption" v-if="detailTache.currentUser">
          <span class="text-caption text-grey">Attribuée par: </span> {{detailTache.currentUser.prenom}} {{detailTache.currentUser.nom}}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 40vh" class="q-pt-md scroll">
        <div class="text-subtitle1">
          <q-list class="q-ma-none q-pa-none">
            <liste-sous-tache
              v-for="item in detailTache.soustache"
              :key="'item-task-'.concat(item._id)"
              :item="item"
            />
          </q-list>
        </div>
      </q-card-section>

      <!-- <q-card-section class="q-pt-md">
        <div class="text-subtitle1">
          <q-list class="q-ma-none q-pa-none">
            <liste-sous-tache
              v-for="item in this.sousTache"
              :key="'item-task-'.concat(item._id)"
              :item="item"
            />
          </q-list>
        </div>
      </q-card-section> -->
      
    </div>
    </q-card>
  </div>
</template>

<script>
import ListeSousTache from "components/sous_tache/Liste"
import SousTacheMixin from "components/sous_tache/SousTacheMixin"
export default {
  mixins: [SousTacheMixin],
  // props pour recuperer les données de detail
  components: {
    ListeSousTache,
  },
  props: {
    detailTache: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  async created() {
    this.findSousTask(true);
    this.$root.$on("refresh-sous-tache", this.findSousTask)
    //this.$root.$on("suppression", this.supItem)
    console.log(this.detailTache);

  },
  data() {
    return {
      sousTache: [],
    };
  },

  methods:{
    

  }
};
</script>
