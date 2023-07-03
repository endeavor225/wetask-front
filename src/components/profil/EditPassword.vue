<template>
    <div class="">
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
          <p>Modification en cours...</p>
        </div>
      </div>
    </q-card>

      <q-card v-show="!loading">

        <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Modification du mot de passe</div>
      <q-space />
      <q-btn icon="close" color="negative" flat round v-close-popup />
    </q-card-section>

        <q-card class="my-card">
          <q-card-section>
            <q-form
              ref="changepwd"
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="form.password"
                :type="isPwd ? 'password' : 'text'"
                label="Actuel mot de passe"
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

              <q-input
                filled
                v-model="form.newpassword"
                :type="isPwd2 ? 'password' : 'text'"
                label="Nouveau mot de passe"
                :rules="rules.newpassword"
              >

              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
                <template v-slot:prepend>
                  <q-icon name="https" class="text-primary" />
                </template>
              </q-input>

              <div class="" style="text-align: center">
                <q-btn
                  label="Modifier"
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
</template>

<script>
import EditMixin from "components/profil/ProfilMixin";
export default {
  mixins: [EditMixin],

  created() {
   
  },
  data() {
    return {
      form: {
        password: "",
        newpassword: "",
      },
      isPwd: true,
      isPwd2: true,
      loading: false,
      titre: "Connexion",
      rules: {
        password: [(val) => !!val || "Ce champ est obligatoire"],

        newpassword: [(val) => !!val || "Ce champ est obligatoire"],
      },
    };
  },
  // name: 'PageName',

  components: {},

  methods: {
    async onSubmit() {
       //console.log(this.form);
      if (this.$refs.changepwd) {
        this.loading = true;
        await this.ChangePassword();
        this.loading = false;
      }
    },

    onReset() {
      this.form.password = "";
      this.form.newpassword = "";
    },
  },
};
</script>
