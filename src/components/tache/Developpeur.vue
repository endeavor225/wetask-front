<template>
  <div>
    <q-item v-if="idTache.user" clickable v-ripple @click="modifAffectation">
      <q-item-section>
        <q-item-label>
          {{ this.developpeur.nom }} {{ this.developpeur.prenom }}</q-item-label
        >
        <q-item-label caption>{{ this.developpeur.role.titre }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-else clickable v-ripple @click="affectation">
      <q-item-section>
        <q-item-label>
          {{ this.developpeur.nom }} {{ this.developpeur.prenom }}
        </q-item-label>
        <q-item-label caption>{{ this.developpeur.role.titre }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import TacheMixin from "components/tache/TacheMixin";
export default {
  mixins: [TacheMixin],

  async created() {
    await this.findUsers(true);
    //console.log(this.idTache);
  },

  
  props: {
    idTache: {
      type: Object,
      default() {
        return {};
      },
    },
    developpeur: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },

  data() {
    return {
      loading: false,

      users: [],

      role: this.$query.role,
    };
  },
  methods: {},
};
</script>
