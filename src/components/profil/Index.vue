<template>
  <div class="q-pt-lg" style="">
    <div class="row no-wrap q-pt-lg">
      <div class="column items-center">
        <q-avatar size="72px">
          <img src="user2.png"/>
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">
          {{ this.user.username }}
        </div>

        <q-btn color="primary" label="Modifier mot de passe" push size="sm" @click="edit" />
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="column">
        <div class="text-h6 q-mb-md">Informations</div>

        <p>Nom : <span class="text-subtitle2">{{ this.user.nom }}</span></p>
        <p>Prenom : <span class="text-subtitle2">{{ this.user.prenom }}</span></p>
        <p>Email : <span  class="text-subtitle2">{{ this.user.email }}</span></p>
        <p v-if="this.user.role && this.user.role.titre === 'user'">Role : <span class="text-subtitle2">Développeur</span></p>
        <p v-if="this.user.role && this.user.role.titre === 'super-admin' || this.user.role && this.user.role.titre === 'admin'">Role : <span class="text-subtitle2">Administrateur</span></p>
      </div>
    </div>


    <q-dialog v-model="modalEdit" full-width>
      <edit-password/>
    </q-dialog>



  </div>
</template>


<script>
import ProfilMixin from "components/profil/ProfilMixin";
import EditPassword from "components/profil/EditPassword"
export default {
  // name: 'ComponentName',

  async created() {
    await this.findUer();
    this.$root.$on('close-modal-edit', this.closeModalEditPassword)
  },

  mixins: [ProfilMixin],
  
  components:{
    EditPassword,
  },

  data() {
    return {
      user: "",
      modalEdit: false
    };
  },

  methods:{
    edit(){
      this.modalEdit = true
    },

    closeModalEditPassword(){
      this.modalEdit = false
    }
  }
};
</script>
