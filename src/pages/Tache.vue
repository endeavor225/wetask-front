<template>
  <div>
    <div style="margin-top: 75px">
     <div v-show="tasks.length !== 0">
        <div v-if="search === '' && !choixSearch">
          <q-list>
            <q-infinite-scroll @load="onLoad" :offset="50">
              <liste-tache
                v-for="item in this.tasks"
                :key="'item-task-'.concat(item._id)"
                :item="item"
              />

              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary" size="40px" />
                </div>
              </template>
            </q-infinite-scroll>
          </q-list>
        </div>

        <!-- Affichage des tache le resultat de la bar de recherche -->
        <div v-if="search !== '' || choixSearch">
          <div class="q-mt-lg" v-show="tache.length === 0">
            <div class="text-h5" style="text-align: center; margin-top: 220px">
              <p class="">Aucune tâche trouvée</p>
            </div>
          </div>

          <div v-show="tache.length !== 0">
            <q-list>
              <liste-tache
                v-for="item in this.tache"
                :key="'item-tache'.concat(item._id)"
                :item="item"
              />
            </q-list>
          </div>
        </div>
      </div>

      <div class="q-mt-lg" v-show="tasks.length === 0">
        <div class="text-h5" style="text-align: center; margin-top: 220px">
          <q-icon name="mood_bad" class="text-red" style="font-size: 6rem" />
          <p class="">Aucune tâche trouvée</p>
        </div>
      </div>
    </div>


    <!-- ios -->
    <div class="row fixed-top" v-if="$q.platform.is.ios" style="margin-top: 70px; background-color: #fff">
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
          flat
          size="23px"
          color="primary"
          class="q-mt-sm"
          @click="rechercheAvance"
        />
      </div>
    </div>

     <!-- autre -->
    <div class="row fixed-top" v-else style="margin-top: 50px; background-color: #fff">
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
          flat
          size="23px"
          color="primary"
          class="q-mt-sm"
          @click="rechercheAvance"
        />
      </div>
    </div>

    <!-- Bouton ajout de tache -->
    <q-btn
      v-if="role === 'super-admin' || role === 'admin'"
      icon="add"
      class="fixed-bottom-right q-mb-sm q-mr-sm"
      round
      color="secondary"
      @click="add"
    />

    <!-- Modal du bouton ajout de tache -->
    <q-dialog v-model="modalAddTache" full-width>
      <add-tache/>
    </q-dialog>

    <!-- Modal du bouton recherche avancé -->
    <q-dialog v-model="modalRecherche" full-width>
      <recherche-avance/>
    </q-dialog>
  
  </div>
</template>

<script>
import AddTache from 'components/tache/Add'
import ListeTache from 'components/tache/Liste'
import TacheMixin from 'components/tache/TacheMixin'
import RechercheAvance from 'components/tache/RechercheAvance'
import StatutSousTacheMixin from "components/sous_tache/SousTacheMixin"
export default {
  // name: 'ComponentName',
  mixins:[TacheMixin, StatutSousTacheMixin],

  components:{
    AddTache,
    ListeTache,
    RechercheAvance
  },

  async created() {
    //this.$root.$on("refresh-tache", this.findTask)
    
    // Ajouter a la fin sans actualisation
    this.$root.$on('add-taches-item-created', this.addItemCreated)
    this.$root.$on('add-taches-item-updated', this.addItemUpdated)
    this.$root.$on('taches-item-did-removed', this.itemDidRemoved)

    // Actualisation de tache 
    this.$root.$on('add-taches-item-refresh', this.addItemRefresh)
    this.$root.$on('add-taches-item', this.addItemRefresh)
    this.$root.$on('taches-removed', this.itemRemoved)

    //await this.onLoad()
    this.$root.$on("close-modal-addTache", this.closeAddTache)
    this.$root.$on("search-advance", this.recuSearch)
    this.$root.$on("close-modal-recherche", this.closeRecherche)

    await this.$root.$on("refresh-users", this.findTache)
  },


  watch: {
    async search(newVal, oldVal) {
      try {
        await this.Search();
      } catch (error) {
        console.log(`erreur dans watch de filter page ${error}`);
      }
    },
  },

  data () {
    return {
      tasks: [],
      limit: 10,
      offset: 0,
      modalAddTache: false,
      modalRecherche: false,
      loading: false,

      search: "",

      tache: [],

      choixSearch: false,

      role: this.$query.role,
    }
  },

  methods:{
     addItemCreated(item){
      this.tasks.push(item)
    },
    itemDidRemoved(item){
      let item_did_removed = this.tasks.find(val => val.id === item.id)
      this.$delete(this.tasks, this.tasks.indexOf(item_did_removed))
    },
    addItemUpdated(item){
      let updated = this.tasks.find( val => val.id === item.id)
      
      this.tasks.splice(
        this.tasks.indexOf(updated),
        1,
        item
      )
    },

    addItemRefresh(item){
      let updated = this.tasks.find( val => val.id === item.id)
      this.tasks.splice(
        this.tasks.indexOf(updated),
        1,
        item
      )
    },

     findTache(){
      this.findTask(true)
    }, 

    /*itemRemoved(item){
      let item_did_removed = this.tasks.find(val => val.id === item.id)
      this.$delete(this.tasks, this.tasks.indexOf(item_did_removed))
    },*/


     // scroll infinite
    async onLoad(index, done) {
      try {
        if (this.loading) {
          done();
        } else {
          if (index) {
            this.loading = true;
            let tasks = await this.findTask()
            this.loading = false

            if (tasks.length === 0) {
              done(true);
            } else {
              this.offset += tasks.length
              done()
            }
          } else {
            this.loading = true;
            let tasks = await this.findTask();
            this.loading = false;
            this.offset += tasks.length;
            done ? done() : "";
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    add(){
      this.modalAddTache = true
    },

    closeAddTache() {
      this.modalAddTache = false
    },

     rechercheAvance() {
      this.modalRecherche = true;
    },

    recuSearch(resAdvSearch) {
      this.choixSearch = true;
      this.tache = resAdvSearch;
    },

    closeRecherche(){
      this.modalRecherche = false
    }

  }
}
</script>
