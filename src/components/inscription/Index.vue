<template>
  <q-page padding>
    <!-- content -->
    <div class="">
      <h5 style="text-align: center" class="text-primary">
        <b>Ajout d'utilisateur</b>
      </h5>

      <q-card class="my-card">
        <q-card-section>
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
              :rules="rules.Nom"
            >
              <template v-slot:prepend>
                <q-icon name="person" class="text-primary" />
              </template>
            </q-input>
             <q-input
              filled
              v-model="form.prenom"
              type="text"
              label="Prenom"
              :rules="rules.username"
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
              :rules="rules.username"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" class="text-primary" />
              </template>
            </q-input>

            <q-input
              filled
              v-model="form.email"
              type="email"
              label="Email"
              :rules="rules.mail"
            >
              <template v-slot:prepend>
                <q-icon name="email" class="text-primary" />
              </template>
            </q-input>

            <q-input
              filled
              v-model="form.password"
              type="Password"
              label="Mot de passe"
              :rules="rules.password"
            >
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
  </q-page>
</template>

<script>
import MixinInscription from "components/inscription/MixinInscription";
export default {
  mixins: [MixinInscription],

  created(){
    this.$root.$emit("titre-page", this.titre)
  },

  data() {
    return {
      form: {
        nom:"",
        prenom:"",
        username: "",
        email: "",
        password: "",
      },
      titre: "Inscription",

      rules: {
        username: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) =>
            val.length > 4 ||
            "ce champ doit dois contenir au moins 6 caractères",
        ],
        mail: [(val) => !!val || "Ce champ est obligatoire"],
       
        password: [(val) => !!val || "Ce champ est obligatoire"],
      },
    };
  },
  // name: 'PageName',

  components: {},

  methods: {
    async onSubmit() {
      await this.create();
    },

    onReset() {
      this.form.nom= "";
      this.form.prenom = "";
      this.form.username = "";
      this.form.mail = "";
      this.form.password = "";
    },
  },
};
</script>
