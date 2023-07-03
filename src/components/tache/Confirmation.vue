<template>
  <div>

    <q-card>
      <div v-show="loading"  class="flex flex-center  full-width"  style="height: 20vh">
      <div>
        <div class="text-center q-mb-lg" >
          <q-spinner-ios size="xl" color="primary" />
        </div>
        <p>
          Suppression en cours...
        </p>
      </div>
    </div>
    </q-card>

    <q-card v-show="!loading">
        <q-card-section>
          <div class="text-h6" style="color: #C10015;">Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Voulez-vous supprimer cette tâche ?
        </q-card-section>

        <q-form
          ref="suppTache"
          @submit="onSubmit"
        >
          <q-card-actions align="center" ref="">
             <!-- <q-btn flat label="Oui" color="primary" @click="Supprimer"/> -->
              <q-btn flat label="Oui" type="submit" color="primary"/>
              <q-btn flat label="Non" color="negative" v-close-popup class="q-ml-lg" />
          </q-card-actions>
        </q-form>

      </q-card>
  </div>
</template>

<script>
import SuppTacheMixin from "components/tache/TacheMixin"
export default {
  // name: 'ComponentName',

  mixins: [SuppTacheMixin],

  props: {
    supprimerTache: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data () {
    return {
      loading: false,
    }
  },


  methods: {
    async onSubmit() {
      if (this.$refs.suppTache){
        this.loading = true
         await this.Supprimer()
         this.loading = false
      }
     
    },
  },

  
}
</script>
