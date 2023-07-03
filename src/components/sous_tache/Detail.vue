<template>
  <div>
    <q-card>
      <!-- Boutton pour fermer le modal -->
      <q-card-section class="row items-center q-pb-none">
          <div class="text-h6" style="color: #0e8f33;">Detail de sous tâche</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round v-close-popup />
        </q-card-section>
      

      <div class="q-pt-none q-pb-none">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6">
            {{ detailSousTache.titre }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{ detailSousTache.description }}
        </div>
        <div class="text-caption text-grey">
          {{ $dateFormat(new Date(detailSousTache.debut)) }} -
          {{ $dateFormat(new Date(detailSousTache.fin)) }}
        </div>
        <div>
          <q-badge outline :color="detailSousTache.statut.color">{{ detailSousTache.statut.titre }}</q-badge>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-md">

        <div class="text-subtitle1">
          <q-list class="q-ma-none q-pa-none">
            <liste-sous-tache
              v-for="item in this.sousTask"
              :key="'item-task-'.concat(item._id)"
              :item="item"
            />
          </q-list>
        </div>
      </q-card-section>
    </div>

    </q-card>
  </div>
</template>

<script>

import SousTacheMixin from 'components/sous_tache/SousTacheMixin'
export default {

  mixins: [SousTacheMixin],
  // props pour recuperer les données de detail
  components:{
    
  },
  props: {
    detailSousTache: {
      type: Object,
      default() {
        return {};
      },
    },
  },
 
  data() {
    return {
      sousTask: [],
    };
  },
};
</script>
