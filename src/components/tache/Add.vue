<template>
  <div>
    <q-card>
      <div
        v-show="loading"
        class="flex flex-center full-width"
        style="height: 50vh"
      >
        <div>
          <div class="text-center q-mb-lg">
            <q-spinner-hourglass size="xl" color="primary" />
          </div>
          <p>Création de la tâche en cours ...</p>
        </div>
      </div>
    </q-card>

    <q-card class="my-card" v-show="!loading">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6" style="color: #0e8f33">Nouvelle tâche</div>
        <q-space />
        <q-btn icon="close" color="negative" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="max-height: 70vh" class="scroll">
        <q-form
          ref="newTache"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            clearable
            filled
            v-model="form.titre"
            type="text"
            label="Titre"
            :rules="rules.titre"
          />

          <q-input
            clearable
            filled
            v-model="form.description"
            type="textarea"
            label="Description"
            :rules="rules.description"
          />

          <q-select
            filled
            clearable
            v-model="form.priorite"
            :options="priorites"
            label="Priorité"
            hint="Priorité"
            option-label="titre"
            option-value="id"
            :rules="rules.priorite"
          />

          <!-- <q-select 
          filled 
          clearable 
          v-model="form.user" 
          :options="users" 
          label="Développpeur" 
          hint="Développpeur" 
          option-label="username"
          option-value="id"
          :rules="rules.user"
          /> -->

          <q-select
            filled
            v-model="form.categorie"
            use-input
            use-chips
            simple
            input-debounce="0"
            @new-value="createValue"
            :options="filterOptions"
            @filter="filterFn"
            label="Étiquette"
            hint="Étiquette"
            option-label="titre"
            option-value="id"
          />

          <q-input
            readonly
            filled
            :label="$dateFormater(new Date(form.debut))"
            placeholder="Date de debut"
            hint="Date de debut"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.debut" :options="Debut">
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
            readonly
            filled
            :label="$dateFormater(new Date(form.fin))"
            placeholder="Date de fin"
            hint="Date de fin"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.fin" :options="Fin">
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

          <div class="q-mt-lg q-mb-sm" style="text-align: center">
            <q-btn label="Ajouter" type="submit" outline color="primary" />
            <q-btn
              label="annuler"
              type="reset"
              outline
              color="negative"
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
//const stringOptions = ['gg']
import AddTacheMixin from "components/tache/TacheMixin";
export default {
  // name: 'ComponentName',

  mixins: [AddTacheMixin],

  async created() {
    await this.findPriorite(true);
    await this.findUsers(true);
    await this.findCategorie(true);
    //console.log(this.$query.role);
  },
  data() {
    return {
      form: {
        titre: "",
        description: "",
        priorite: "",
        categorie: null,
        debut: new Date(),
        fin: new Date(),
      },
      stringOptions: [],
      filterOptions: this.stringOptions,
      loading: false,

      priorites: [],

      users: [],
      users_role: [],

      role: this.$query.role,

      rules: {
        titre: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) =>
            val.length > 3 ||
            "ce champ doit dois contenir au moins 4 caractères",
        ],
        description: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) =>
            val.length > 4 ||
            "ce champ doit dois contenir au moins 5 caractères",
        ],
        priorite: [(val) => !!val || "Ce champ est obligatoire"],

        //user: [(val) => !!val || "Ce champ est obligatoire"],

        //debut: [(val) => !!val || "Ce champ est obligatoire"],

        //fin: [(val) => !!val || "Ce champ est obligatoire"],
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.newTache.validate()) {
        this.loading = true;
        await this.create();
        this.loading = false;
      }
    },
    onReset() {
      this.form.titre = "";
      this.form.description = "";
      this.form.priorite = "";
      this.form.debut = "";
      this.form.fin = "";
    },

    Debut(date) {
      let datenow = new Date();
      //console.log(datenow.getDate());

      // si date < 10 on verifie si je mois est inferieur a 10 ou pas
      if (datenow.getDate() < 10) {
        if ( datenow.getMonth()+ 1 < 10) {
          let dateF = datenow.getFullYear() + "/0" + (datenow.getMonth() + 1) + "/0" + datenow.getDate();
          //console.log(dateF);
          return date >= dateF;
        } else {
          let dateF = datenow.getFullYear() + "/" + (datenow.getMonth() + 1) + "/0" + datenow.getDate();
          //console.log(dateF);
          return date >= dateF;
        }
        // si date > 10 on verifie si je mois est inferieur a 10 ou pas
      } else {
        if ( datenow.getMonth()+ 1 < 10) {
          let dateF = datenow.getFullYear() + "/0" + (datenow.getMonth() + 1) + "/" + datenow.getDate();
          //console.log(dateF);
          return date >= dateF;
        } else {
          let dateF = datenow.getFullYear() + "/" + (datenow.getMonth() + 1) + "/" + datenow.getDate();
          //console.log(dateF);
          return date >= dateF;
        }
      }
    },

    Fin(date) {
      return date >= this.form.debut;
    },

    filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.filterOptions = this.stringOptions;
        } else {
          const needle = val.toLowerCase();
          this.filterOptions = this.stringOptions.filter(
            (v) => v.titre.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
  },
};
</script>
