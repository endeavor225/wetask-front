<template>
  <div>
    <q-card class="my-card">
      <!-- Boutton pour fermer le modal -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Recherche Avancée</div>
        <q-space />
        <q-btn icon="close" color="negative" flat round v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form
          ref="User"
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
        >
            <q-input 
            clearable 
            filled 
            color="green"
             v-model="form.prenom" 
             label="PRENOM" />

             <q-input 
            clearable 
            filled 
            color="green"
             v-model="form.username" 
             label="USERNAME" />

             <q-input 
            clearable 
            filled 
            color="green"
             v-model="form.ROLE" 
             label="ROLE" />
        
              <q-separator />

          <div class="" style="text-align: center">
            <q-btn label="Recherche" type="submit" outline color="primary" />
            <q-btn label="annuler" type="reset" outline color="negative" class="q-ml-sm" />
          </div>

         </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import mixinUtilisateur from 'components/utilisateur/MixinUtilisateur'
export default {
  // name: 'ComponentName',
  mixins:[mixinUtilisateur],

  data () {
    return {
      form:{
        prenom:'',
        username:'',
        role:''

      },

      recherche:{}
   

    }
  },
  

  watch:{

    'form.prenom'(newVal, oldVal) {
      try {
         this.recherche.prenom = this.form.prenom

         console.log(this.recherche.prenom )
      } catch (error) {
        console.log(error);
      }

    },
    'form.username'(newVal, oldVal) {
      try {
         this.recherche.username= this.form.username

         console.log(this.recherche.username )
      } catch (error) {
        console.log(error);
      }

    },
    'form.role'(newVal, oldVal) {
      try {
         this.recherche.role = this.form.role

         console.log(this.recherche.role )
      } catch (error) {
        console.log(error);
      }

    },


  },

  methods:{
    onReset(){
     this.form.prenom=null
     this.form.username=null
     this.form.role= null
    },

    onSubmit(){
      this.SearchUserAvance()
    }
  }
}
</script>
