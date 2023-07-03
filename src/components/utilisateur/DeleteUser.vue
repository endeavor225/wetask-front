<template>
  <div>
    <q-card>
        <q-card-section>
          <div class="text-h6">Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Voulez-vous supprimer cet utilisateur?
        </q-card-section>

        <q-form
          ref="suppUser"
          @submit="onSubmit"
        >
          <q-card-actions align="center" ref="">
             <!-- <q-btn flat label="Oui" color="primary" @click="Supprimer"/> -->
              <q-btn flat label="Oui" type="submit" color="primary"/>
              <q-btn flat label="Non" color="negative" v-close-popup />
          </q-card-actions>
        </q-form>

      </q-card>
  </div>
</template>
<script>
import MixinUtilisateur from 'components/utilisateur/MixinUtilisateur'
export default {
  // name: 'ComponentName',
  mixins:[MixinUtilisateur],
  props: {
    suppUser: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data () {
    return {}
  },
  methods:{
   async onSubmit(){
      if (this.$refs.suppUser){
         await this.DeleteUser()
    
      }
    }
  }
}
</script>