<template>
  <div>
    <q-card>
      <div
        v-show="loading"
        class="flex flex-center full-width"
        style="height: 20vh;"
      >
        <div>
          <div class="text-center q-mb-lg">
            <q-spinner-ios size="xl" color="primary" />
          </div>
        </div>
      </div>
    </q-card>

    <q-card ref="Statut" v-show="!loading">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6" style="color: #0e8f33;">Statut</div>
        <q-space />
        <q-btn icon="close" color="negative" flat round v-close-popup />
      </q-card-section>

      <div class="q-pa-md">
        <div class="q-gutter-sm" align="center">
          <q-card-actions >
            <q-radio v-for="item in statutFind" :key="'item-statut-'.concat(item._id)"
              v-model="statut"
              :val="item.id"
              :label="item.titre"
              :color="item.color"
            />
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import ChangeStatutMixin from 'components/sous_tache/SousTacheMixin'
import TacheMixin from 'components/tache/TacheMixin'
export default {
  // name: 'ComponentName',

  mixins:[ChangeStatutMixin, TacheMixin],

 props: {
    statutSousTache: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  async created(){
    await this.findStatut(true)
  },
  

  watch: {
    async statut(newVal, oldVal) {
    
    if (this.$refs.Statut){
      this.loading = true
         await this.ChangeStatut();

         this.loading = false
      }
     
    },
  },

 

 

  data() {
    return {
      statut: "",
      loading: false,


      statutFind: []
    };
  },

  methods:{

  }
};
</script>
