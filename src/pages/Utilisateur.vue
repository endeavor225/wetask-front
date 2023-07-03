<template>
  <q-page padding>
    <div class="q-pa-md">
      <!-- barre de recherche-->

       <!-- Ios -->
      <div
        v-if="$q.platform.is.ios"
        class="row fixed-top"
        style="margin-top: 70px; background-color: #fff">
        <div class="col-10">
          <q-input
            outlined
            bottom-slots
            v-model="search"
            label="Recherche"
            class="q-pa-sm"
          >
            <template v-slot:append>
              <q-icon
                v-if="search !== ''"
                name="close"
                @click="search = ''"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-2">
          <q-btn
            icon="zoom_in"
            size="23px"
            flat
            color="primary"
            class="q-mt-sm"
            @click="searchAvance"
          />
        </div>
      </div>


       <!-- Android-->
      <div
        v-else
        class="row fixed-top"
        style="margin-top: 50px; background-color: #fff">
        <div class="col-10">
          <q-input
            outlined
            bottom-slots
            v-model="search"
            label="Recherche"
            class="q-pa-sm"
          >
            <template v-slot:append>
              <q-icon
                v-if="search !== ''"
                name="close"
                @click="search = ''"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-2">
          <q-btn
            icon="zoom_in"
            size="23px"
            flat
            color="primary"
            class="q-mt-sm"
            @click="searchAvance"
          />
        </div>
      </div>

      <!-- recherche des utilisateurs -->
      <div v-if="utilisateur.length !== 0">
        <div v-if="search === ''" class="col" style="margin-top: 45px">
          <q-list>
            <liste-users
              v-for="item in this.utilisateur"
              :key="'item-user-'.concat(item._id)"
              :item="item"
            />
          </q-list>
        </div>

        <div v-if="search !== ''" class="col" style="margin-top: 45px">
          <div class="q-mt-lg" v-show="listUser.length === 0">
            <div class="text-h5" style="text-align: center; margin-top: 220px">
              <p class="">Aucune utilisateur trouvé</p>
            </div>
          </div>

          <div v-show="listUser.length !== 0">
            <q-list>
              <liste-users
                v-for="item in this.listUser"
                :key="'item-tache'.concat(item._id)"
                :item="item"
              />
            </q-list>
          </div>
        </div>
      </div>
      <!-- Boutton d'ajout de nouveaux utilisateur-->
      <q-btn
        icon="add"
        class="fixed-bottom-right q-mb-sm q-mr-sm"
        round
        color="secondary"
        @click="add"
      />

      <!-- Modal d'ajout dun nouveau utilisateur -->
      <q-dialog v-model="addusers" full-width>
        <add-users />
      </q-dialog>

      <q-dialog v-model="filterUser" full-width>
        <filter-users />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import FilterUsers from "components/utilisateur/filterUsers";
import ListeUsers from "components/utilisateur/ListeUsers";
import AddUsers from "components/utilisateur/AddUsers.vue";
import MixinUtilisateur from "components/utilisateur/MixinUtilisateur";
export default {
  // name: 'PageName',
  components: {
    AddUsers,
    ListeUsers,
    FilterUsers,
  },
  mixins: [MixinUtilisateur],

  async created() {
  await this.FindUsers();
    this.$root.$emit("titre-page", this.titre);
    this.$root.$on("close-modal-add", this.closeAdd);

    await this.$root.$on("refresh-users", this.findUtilisateur)
    this.$root.$on('users-item-did-removed', this.itemDidRemoved)
  },
  watch: {
    async search(newval, oldVal) {
      try {
        await this.SearchUser();
      } catch (error) {
        console.log(`erreur dans watch ${error}`);
      }
    },
  },

  data() {
    return {
      utilisateur: [],
      search: "",
      titre: "Liste des Utilisateurs",
      addusers: false,
      listUser: [],
      filterUser: false,
    };
  },

  methods: {
    add() {
      this.addusers = true;
    },
    closeAdd() {
      this.addusers = false;
    },
    searchAvance() {
      this.filterUser = true;
    },

    findUtilisateur(){
      this.FindUsers(true)
    }, 

    itemDidRemoved(item){
      let item_did_removed = this.utilisateur.find(val => val.id === item.id)
      this.$delete(this.utilisateur, this.utilisateur.indexOf(item_did_removed))
    },
  },
};
</script>
