<template>
  <q-page padding>
  <div class="flex flex-center">
    <img src="logo.png" style="height: 100px; max-width: 100px; margin-top: 50px"/>
  </div>
    <div class="" style="">
      <h5 style="text-align: center" class="text-primary">
        <b>Connectez-vous</b>
      </h5>

      <q-card>
      <div
        v-show="loading"
        class="flex flex-center full-width"
        style="height: 35vh; margin-top: 45px"
      >
        <div>
          <div class="text-center">
            <q-spinner-ios size="xl" color="primary" />
          </div>
          <p>Connexion en cours...</p>
        </div>
      </div>
    </q-card>

      <q-card v-show="!loading">
        <q-card class="my-card">
          <q-card-section>
            <q-form
              ref="SeConnecter"
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="form.username"
                type="text"
                label="Nom d'utilisateur"
                :rules="rules.username"
              >
                <template v-slot:prepend>
                  <q-icon name="person" class="text-primary" />
                </template>
              </q-input>

              <q-input
                filled
                v-model="form.password"
                :type="isPwd ? 'password' : 'text'"
                label="Mot de passe"
                :rules="rules.password"
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
                <q-btn
                  label="Connexion"
                  type="submit"
                  outline
                  color="primary"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Mixinconnexion from "components/connexion/Mixinconnexion";
export default {
  mixins: [Mixinconnexion],

  created() {
    //this.$root.$emit("titre-page", this.titre);
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
       isPwd: true,
      loading: false,
      titre: "Connexion",
      rules: {
        username: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) =>
            val.length > 3 ||
            "ce champ doit dois contenir au moins 4 caractères",
        ],
        password: [(val) => !!val || "Ce champ est obligatoire"],
      },
    };
  },
  // name: 'PageName',

  components: {},

  methods: {
    async onSubmit() {
      if (this.$refs.SeConnecter) {
        this.loading = true;
        await this.create();
        this.loading = false;
      }
    },

    onReset() {
      this.form.username = "";
      this.form.password = "";
    },
  },
};
</script>
