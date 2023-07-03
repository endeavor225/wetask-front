<template>

    <!-- content -->
    <div class="">

      <q-card class="my-card" style="">
         <q-card-section class="row items-center q-pb-none">
          <div class="text-h6" style="color:green" >Enregistrer un Utilisateur</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="scroll" style="max-height:70vh" >
       
          <q-form
            ref="newUser"
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="form.nom"
              type="text"
              label="Nom"
              :rules="rules.Username"
            >
              <template v-slot:prepend>
                <q-icon name="person" class="text-primary" />
              </template>
            </q-input>

            <q-input
              filled
              v-model="form.prenom"
              type="text"
              label="Prenoms"
              :rules="rules.Username"
            >
              <template v-slot:prepend>
                <q-icon name="person" class="text-primary" />
              </template>
            </q-input>
            
            <q-input
              filled
              v-model="form.username"
              type="text"
              label="Nom d'utilisateur"
              :rules="rules.Username"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" class="text-primary" />
              </template>
            </q-input>

             <q-input
            filled
            :label="$dateFormater(new Date(form.date_naissance))"
            placeholder="Date" >

            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary" style="float:right">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.date_naissance" >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Confirmer"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

          </q-input>
            <q-input
              filled
              v-model="form.email"
              type="email"
              label="Email"
              :rules="rules.Mail"
            >
              <template v-slot:prepend>
                <q-icon name="email" class="text-primary" />
              </template>
            </q-input>

             <q-select 
             filled v-model="form.role" 
             :options="listeRole" 
             color="primary"
             option-label="titre"
             option-value="id"
             label="Role" >
              <template v-slot:prepend>
                <q-icon name="supervised_user_circle" class="text-primary"/>
              </template>
             </q-select>

            <q-input
              filled
              v-model="form.password"
              :type="isPwd ? 'password' : 'text'"
              label="Mot de passe"
              :rules="rules.Password"
            >

              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
                <template v-slot:prepend>
                  <q-icon name="https" class="text-primary" />
                </template>
            </q-input>
            

            <div class="" style="text-align: center">
              <q-btn label="Ajouter" type="submit" outline color="primary" />
              <q-btn
                label="annuler"
                type="reset"
                outline
                color="red"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

</template>

<script>
import mixinUtilisateur from 'components/utilisateur/MixinUtilisateur'
export default {
  // name: 'PageName',
  name: "Addusers",
  mixins: [mixinUtilisateur],

  created(){
      this.Role();

  },

  data() {
    return {
      form: {
        nom: "",
        prenom: "",
        username: "",
        email: "",
        password: "",
        date_naissance:new Date(),
        role:""
      },
      isPwd:true,
      listeRole:[],
    
      rules: {
        Username: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) =>
            val.length > 3||
            "ce champ doit dois contenir au moins 6 caractères",
        ],
        Role:[
          (val) =>
            val.length > 3||
            "ce champ doit dois contenir au moins 6 caractères",
        ],
        Mail: [
          (val) => !!val || "Ce champ est obligatoire",
          //val => val.length >  || "ce champ doit dois contenir au moins 6 caractères"
        ],

        Password: [
          (val) => !!val || "Ce champ est obligatoire",
          //val => val.length > 5 || "ce champ doit dois contenir au moins 6 caractères"
        ],
      },
    };
  },

  components: {},

  methods: {
    async onSubmit() {
      await this.createUser();
    },

    onReset() {
      this.form.nom = "",
      this.form.prenom = "",
      this.form.email = "",
      this.form.username = "",
      this.form.password = "";
      
    },
    
  },
};
</script>

<style lang="stylus" scoped></style>