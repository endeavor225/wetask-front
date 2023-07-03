<template>
  <div>
     <q-card>
      <div v-show="loading"  class="flex flex-center  full-width"  style="height: 50vh">
      <div>
        <div class="text-center q-mb-lg" >
          <q-spinner-hourglass size="xl" color="primary" />
        </div>
        <p>
          Modification de tâche en cours ...
        </p>
      </div>
    </div>
    </q-card>

    <q-card class="my-card" v-show="!loading">

      <!-- Boutton pour fermer le modal -->
      <q-card-section class="row items-center q-pb-none">
          <div class="text-h6" style="color: #0e8f33;">Modification de tâche</div>
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
            filled
            v-model="form.titre"
            type="text"
            label="Titre"
            :rules="rules.titre"
          />

          <q-input
            filled
            v-model="form.description"
            type="textarea"
            label="Description"
            :rules="rules.description"
          />

          <q-select 
          filled 
          v-model="form.priorite" 
          :options="priorites" 
          label="Priorité" 
          hint="Priorité" 
          option-label="titre"
          option-value="_id"
          />

          <!-- 
          <q-select 
          filled 
          v-model="form.user" 
          :options="users" 
          label="Développpeur" 
          hint="Développpeur" 
          option-label="nom"
          option-value="id"
          />
          -->

          <q-select
            filled
            v-model="form.categorie"
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

          <q-input readonly filled :label="$dateFormater(new Date(form.debut))">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.debut" :options="Debut">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Confirmer" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input readonly filled :label="$dateFormater(new Date(form.fin))">
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

          <div class="q-mt-md q-mb-sm" style="text-align: center">
            <q-btn label="Editer" type="submit" outline color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import EditTacheMixin from "components/tache/TacheMixin";
export default {

  mixins: [EditTacheMixin],

  props: {
    editTache: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },

  async created() {
    this.form = this.editTache;
    await this.findPriorite(true)

    await this.findCategorie(true);
    await this.findUsers(true)

  },
  data() {
    return {
      form: {
        titre: "",
        description: "",
        priorite: "",
        categorie: null,
        user: "",
        debut: new Date(),
        fin: new Date(),
      },

      stringOptions: [],
      filterOptions: this.stringOptions,
      priorites:[],
      loading: false,

      options: [],

      users: [],
      users_role:[],

      role: this.$query.role,

      rules: {
        titre: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) => val.length > 4 || "ce champ doit dois contenir au moins 6 caractères",
        ],
        description: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) => val.length > 5 || "ce champ doit dois contenir au moins 6 caractères",
        ],
      },
    };
  },

  methods: {
   async onSubmit() {
      if (this.$refs.newTache.validate()){
        this.loading = true
         await this.Update()
         this.loading = false
      }
    },
    onReset() {
      this.form.titre = "";
      this.form.description = "";
      this.form.debut = "";
      this.form.fin = "";
    },

    Debut(date) {
      let datenow = new Date();
      if (datenow.getDate() < 10) {
        let dateF = datenow.getFullYear()+"/" +
          (datenow.getMonth() + 1)+"/0" +datenow.getDate();
        return date >= dateF;
      } else {
        let dateF = datenow.getFullYear()+"/" +
          (datenow.getMonth() + 1)+"/"+datenow.getDate();
        return date >= dateF;
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
