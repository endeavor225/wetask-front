<template>
  <div>
    <q-card>
      <div
        v-show="loading"
        class="flex flex-center full-width"
        style="height: 50vh"
      >
        <div>
          <div class="text-center q-mb-lg">
            <q-spinner-hourglass size="xl" color="primary" />
          </div>
          <p>Affectation en cours ...</p>
        </div>
      </div>
    </q-card>

    <q-card ref="Affectation" class="my-card" v-show="!loading">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Listes des développeurs</div>
        <q-space />
        <q-btn icon="close" color="negative" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="max-height: 70vh" class="scroll">
        <select-developpeur
        v-for="item in this.users"
        :key="'item-task-'.concat(item._id)"
        :developpeur="item"
        :idTache="recupIdTache"
      />
          
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import TacheMixin from "components/tache/TacheMixin";
import SelectDeveloppeur from "components/tache/Developpeur";
export default {
  // name: 'ComponentName',
  mixins: [TacheMixin],

  components: {
    SelectDeveloppeur,
  },

  async created() {
    await this.findUsers(true);
  },

   props: {
    recupIdTache: {
      type: Object,
      default() {
        return {};
      },
    },
   },
  
  data () {
    return {
      users: [],
      loading: false,
    }
  }
}
</script>
