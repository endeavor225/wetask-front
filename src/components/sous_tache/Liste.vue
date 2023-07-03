<template>
  <div class="q-ma-none q-pa-none">
    <q-item class="q-ma-none q-pa-none"> 
      <q-item-section>
        <q-item-label >
          <div class="full-width">

            <div class="row full-width" style="height: 40px">
              
              <!--<div class="col-2 flex flex-center">
                <q-avatar class="q-mt-none q-ml-none q-pl-none" color="white" size="54px" text-color="orange" icon="edit_attributes" />
              </div>  -->

              <div
                @click="detail"
                clickable
                v-ripple
                class="col-7"
              >
                <q-item-label lines="1">{{ item.titre }} </q-item-label>
                <q-item-label caption> Prends fin le {{ $dateFormat(new Date(item.fin))  }}</q-item-label>
                <!--<q-badge outline color="orange">En cours</q-badge>-->
              </div>

              <div class="col-5">
                <div class="row full-width q-mr-none q-pr-none" style="height: 40px" >

                  <div class="col-4 flex flex-center">
                    <q-btn icon="lightbulb" :color="item.statut.color" flat @click="statut"/>
                    <!--:color="item.statut.color"-->
                  </div>

                  <div class="col-4 flex flex-center">
                    <q-btn icon="edit" flat color="primary" @click="edit"/>
                  </div>

                  <div class="col-4 flex flex-center">
                    <q-btn icon="delete" flat color="negative" @click="delet" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>

    <!-- <q-separator spaced inset />  -->

    <q-dialog v-model="modalDetail" full-width>
      <detail-sous-tache :detailSousTache="item"/>
    </q-dialog>

    <q-dialog v-model="modalEdit" full-width>
      <edit-sous-tache :editSousTache="item"/>
    </q-dialog>


     <q-dialog v-model="modalSuppression" full-width>
      <confirmation-supp-sous-tache :supprimerSousTache="item"/>
    </q-dialog>

    <q-dialog v-model="modalStatut" full-width>
      <change-statut-sous-tache :statutSousTache="item"/>
    </q-dialog>


  </div>
</template>

<script>

import DetailSousTache from 'components/sous_tache/Detail'
import EditSousTache from 'components/sous_tache/Edit'
import ConfirmationSuppSousTache from 'components/sous_tache/Confirmation'
import ChangeStatutSousTache from 'components/sous_tache/Statut'
import ChangeStatutMixin from 'components/sous_tache/SousTacheMixin'
export default {
  // name: 'ComponentName',
 mixins:[ChangeStatutMixin],
 
  components: {
    DetailSousTache,
    EditSousTache,
    ConfirmationSuppSousTache,
    ChangeStatutSousTache

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


  async created(){
    this.findStatut()
    this.$root.$on("close-modal-edit", this.closeEdit)
    this.$root.$on("close-modal-addSousTache", this.closeAddSousTache)
    this.$root.$on("close-modal-suppression", this.closeSupprision)
    this.$root.$on("close-modal-statut", this.closeStatut)
  },

  

  data() {
    return {
      modalDetail: false,
      modalEdit: false,
      modalAddSousTache: false,
      modalSuppression: false,
      modalStatut: false
    };
  },
  methods: {
    refreshSousTask(){
      console.log("refresh sous task");
    },
    detail() {
      this.modalDetail = true;
      
    },
    edit(){
      this.modalEdit = true
    },
    closeEdit(){
      this.modalEdit = false
    },

    AddSousTache(){
      this.modalAddSousTache = true
    },

    closeAddSousTache(){
      this.modalAddSousTache = false
    },

    delet(){
      this.modalSuppression = true 
    },

    closeSupprision(){
      this.modalSuppression = false
    },

    statut(){
      this.modalStatut = true
    },

    closeStatut(){
      this.modalStatut = false
    }
  },
};
</script>