<template>
  <div>
    <q-item>
      <q-item-section>
        <q-item-label>
          <div class="full-width">
            <!-- User super-admin || admin  -->
            <div class="row full-width" style="height: 40px" v-if="role === 'super-admin' || role === 'admin'" >

              <div v-if="!item.user" @click="selectUser" clickable v-ripple class="col-1 q-pa-none ">
                <q-btn dense color="blue-grey-6" round icon="person" class="q-pa-none"/>
              </div>

              <div v-else @click="modifUser" clickable v-ripple class="col-1 q-pa-none"> 
                <q-btn  dense color="blue-grey-6" round :label="item.user.prenom.charAt(0)+item.user.nom.charAt(0)" class="q-pa-none"/> 
              </div>

              <div @click="detail" clickable v-ripple class="col-6 q-ml-sm">
                <q-item-label lines="1">
                  <q-avatar
                    v-if="item.priorite"
                    size="8px"
                    font-size="0px"
                    :color="item.priorite.color"
                  />
                  {{ item.titre }} 

                  <q-badge color="blue" v-if="item.categorie">
                    {{ item.categorie.titre }}
                  </q-badge>
                  
                </q-item-label>

                <q-item-label caption>
                  <q-badge v-if="item.statut" outline :color="item.statut.color"
                    >{{ item.statut.titre }}
                  </q-badge>
                  Fini le {{ $dateFormat(new Date(item.fin)) }}
                </q-item-label>

                <q-separator spaced />
              </div>
              <div class="col-4">
                <div class="row full-width" style="height: 40px">
                  <!--<div class="col-3 flex flex-center">
                    <q-btn icon="account_circle" flat color="secondary" @click="selectUser"/>
                  </div>-->

                  <div class="col-4 flex flex-center">
                    <q-btn
                      icon="add"
                      flat
                      color="secondary"
                      @click="addSousTache"
                    />
                  </div>

                  <div class="col-4 flex flex-center">
                    <q-btn icon="edit" flat color="primary" @click="edit" />
                  </div>

                  <div class="col-4 flex flex-center">
                    <q-btn icon="delete" flat color="negative" @click="delet" />
                  </div>
                </div>
              </div>
            </div>

            <!-- User  -->
            <div class="row full-width" style="height: 40px" v-else>
              <div @click="detail" clickable v-ripple class="col-10">
                <q-item-label lines="1">
                  <q-avatar
                    v-if="item.priorite"
                    size="8px"
                    font-size="0px"
                    :color="item.priorite.color"
                  />
                  {{ item.titre }}

                  <q-badge color="blue" v-if="item.categorie">
                    {{ item.categorie.titre }}
                  </q-badge>
                </q-item-label>

                <q-item-label caption>
                  <q-badge v-if="item.statut" outline :color="item.statut.color"
                    >{{ item.statut.titre }}
                  </q-badge>
                  Prends fin le {{ $dateFormat(new Date(item.fin)) }}
                </q-item-label>

                <q-separator spaced />
              </div>
              <div class="col-2">
                <div class="row full-width" style="height: 40px">
                  <div class="col-12 flex flex-center">
                    <q-btn
                      icon="add"
                      flat
                      color="secondary"
                      @click="addSousTache"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-dialog v-model="modalDetailTache" full-width>
      <detail-tache :detailTache="item" />
    </q-dialog>

    <q-dialog v-model="modalSuppTache" full-width>
      <confirmation-supp-tache :supprimerTache="item" />
    </q-dialog>

    <q-dialog v-model="modalEditTache" full-width>
      <edit-tache :editTache="item" />
    </q-dialog>

    <q-dialog v-model="modalAddSousTache" full-width>
      <add-sous-tache :recupIdTache="item" />
    </q-dialog>

    <q-dialog v-model="modalDeveloppeur" full-width>
      <affectation :recupIdTache="item"/>
    </q-dialog>

    <q-dialog v-model="modalModifDeveloppeur" full-width>
      <affectation :recupIdTache="item"/>
    </q-dialog>
  </div>
</template>

<script>
import DetailTache from "components/tache/Detail";
import ConfirmationSuppTache from "components/tache/Confirmation";
import EditTache from "components/tache/Edit";
import AddSousTache from "components/sous_tache/Add";
import Affectation from "components/tache/Affectation";
import TacheMixin from "components/tache/TacheMixin";

export default {
  // name: 'ComponentName',
  mixins: [TacheMixin],

  components: {
    DetailTache,
    ConfirmationSuppTache,
    EditTache,
    AddSousTache,
    Affectation
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },

  async created() {
    //await this.findUsers(true);
    await this.$root.$on("close-modal-suppression", this.closeSupprission);
    await this.$root.$on("close-modal-edit", this.closeEdit);
    await this.$root.$on("close-modal-addSousTache", this.closeAddSousTache);
    await this.$root.$on("close-modal-affectation", this.closeAffectation);
    await this.$root.$on("close-modal-affectation-modif", this.closeAffectationModif);
  },

  data() {
    return {
      modalDetailTache: false,
      modalSuppTache: false,
      modalEditTache: false,
      modalAddSousTache: false,
      modalDeveloppeur: false,
      modalModifDeveloppeur: false,
      users: [],
      role: this.$query.role,
    };
  },

  methods: {
    detail() {
      this.modalDetailTache = true;
    },
    edit() {
      this.modalEditTache = true;
    },
    closeEdit() {
      this.modalEditTache = false;
    },

    addSousTache() {
      this.modalAddSousTache = true;
    },

    closeAffectation() {
      this.modalDeveloppeur = false;
    },

    closeAddSousTache() {
      this.modalAddSousTache = false;
    },

    delet() {
      this.modalSuppTache = true;
    },

    closeSupprission() {
      this.modalSuppTache = false;
    },

    selectUser() {
      this.modalDeveloppeur = true;
    },

    modifUser() {
      this.modalModifDeveloppeur = true;
    },

    closeAffectationModif(){
      this.modalModifDeveloppeur = false;
    },
  },
};
</script>
