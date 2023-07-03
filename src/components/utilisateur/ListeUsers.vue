<template>
  <div>
    <q-item>
      <q-item-section>
        <q-item-label>
          <div class="full-width" style="">
            <div class="row full-width" style="height: 40px">

              <div 
                @click="InfoUsers"
                clickable
                v-ripple
                class="flex col-8"
              >
                <p class="q-mt-md text-subtitle1 text-capitalize" style="font-size:18px" color='blue-grey-10'>
                {{item.nom}}  {{item.prenom}}
                </p>
              </div>
              
              <div class="col-4">

                 <div class="row full-width" style="height: 40px">

                  <div class="col-6 flex flex-center">
                    <q-btn icon="edit" flat color="primary" @click="Edit"/>
                  </div>

                  <div class="col-6 flex flex-center">
                    <q-btn icon="delete" flat color="negative" @click="Delete" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-item-label>
        
      </q-item-section>
    </q-item>
    <q-separator inset/>
    <!-- <q-separator spaced inset />  -->

    <q-dialog v-model="infoUtilisateur" full-width >
      <q-card>
        <detail-users :info="item" />
      </q-card>

    </q-dialog>
    <q-dialog v-model="editUser" full-width >
      <q-card>
        <edit-user :editUser='item'/>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteUser" full-width >
      <q-card>
        <delete-user :suppUser="item"/>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
 import EditUser from 'components/utilisateur/EditUser'
 import DeleteUser from 'components/utilisateur/DeleteUser'
 import DetailUsers from 'components/utilisateur/DetailUsers'
//import DetailUsers from './DetailUsers.vue';
export default {
 
  // name: 'ComponentName',
components:{
    DetailUsers,
    DeleteUser,
    DetailUsers,
    EditUser
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
    this.$root.$on("close-modal-edit", this.closeEdit)
    this.$root.$on("close-modal-suppression", this.closeDelete);
  },
  data() {
    return {
        editUser:false,
        deleteUser:false,
        infoUtilisateur : false
    };
  },
  methods:{
    InfoUsers(){
      this.infoUtilisateur=true
    },
    Edit(){
        this.editUser=true
    },
    Delete(){
        this.deleteUser=true
    },

    closeEdit(){
        this.editUser = false
    },

    closeDelete(){
        this.deleteUser=false
    }
    
  }
};
</script>
