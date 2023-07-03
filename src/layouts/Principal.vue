<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> WeTasks </q-toolbar-title>

        <div>
          <q-btn-dropdown
            dense
            flat
            style="font-size: 0.8rem"
            color="white"
            round
            icon="notifications"
            :label="this.notif"
          >
            <q-list bordered separator style="width: 250px; max-width: 350px">
              <div
                v-for="item in this.notificationFind"
                :key="'item-notif'.concat(item._id)"
              >
                <notification v-if="item && item.notification" :item="item" />
              </div>
            </q-list>
          </q-btn-dropdown>
        </div>

        <div>
          <q-btn-dropdown
            dense
            flat
            style="font-size: 0.8rem"
            color="white"
            round
            icon="account_circle"
          >
            <div class="row no-wrap q-pa-md">

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="user2.png"/>
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ this.user.prenom }} {{ this.user.nom }} </div>

                <q-btn
                  color="primary"
                  label="Deconnexion"
                  push
                  size="sm"
                  @click="deconnexion"
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> MENU </q-item-label>

        <a
          @click="$router.push('/taches')"
          style="text-decoration: none; color: black"
        >
          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar
                class="q-ma-none"
                flat
                size="40px"
                icon="assignment_turned_in"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Taches</q-item-label>
              <q-item-label caption>Liste des tâches</q-item-label>
            </q-item-section>
          </q-item>
        </a>

        <a
          @click="$router.push('/utilisateur')"
          style="text-decoration: none; color: black"
          v-if="role === 'super-admin' || role === 'admin'"
        >
          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar
                class="q-ma-none"
                flat
                size="40px"
                icon="supervisor_account"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Utilisateur</q-item-label>
              <q-item-label caption>Gestion des utilisateurs</q-item-label>
            </q-item-section>
          </q-item>
        </a>

        <a
          @click="$router.push('/profil')"
          style="text-decoration: none; color: black"
        >
          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar
                class="q-ma-none"
                flat
                size="40px"
                icon="perm_identity"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Mon Profil</q-item-label>
              <q-item-label caption>Infromations de l'utilisateur</q-item-label>
            </q-item-section>
          </q-item>
        </a>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import Notification from "components/Notification/Index";
import NotificationMixin from "components/Notification/NotificationMixin";
import ProfilMixin from "components/profil/ProfilMixin";

const linksData = [
  {
    title: "Tâches",
    caption: "Liste des tâches",
    icon: "assignment_turned_in",
    link: "/#/taches",
  },

  {
    title: "Utilisateurs",
    caption: "Gestion des utilisateurs",
    icon: "supervisor_account",
    link: "/#/utilisateur",
  },

  {
    title: "Mon Profil",
    caption: "Infromations de l'utilisateur ",
    icon: "perm_identity",
    link: "/#/profil",
  },

  /*
  {
    title: "Humeur",
    caption: "Humeur du jour du développeur",
    icon: "sentiment_very_satisfied",
    link: "/#/"
  },

  {
    title: "Ligne de code",
    caption: "Nombre de ligne de code par jour",
    icon: "add_task",
    link: "/#/"
  },
*/
];


export default {
  name: "MainLayout",

  mixins: [NotificationMixin, ProfilMixin],

  components: {
    EssentialLink,
    Notification,
  },

  async created() {
    this.$root.$on("refresh-notif", this.actualNotif);
    this.$root.$on("remove-notif-item", this.removeNotificationItem);

    await this.findNotify(true);
    await this.findUer();

    //console.log(this.$query.query_params.headers.Authorization);
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      notificationFind: [],
      notif: "",
      role: this.$query.role,
      user: "",
    };
  },
  methods: {
    actualNotif(notification, nbLu) {
      //console.log("marche", notification,  this.notificationFind.find(val => val.notification.id === notification.id));
      console.log(this.notificationFind);
      for (const item of this.notificationFind) {
        if (item.id === notification.id) {
          this.notificationFind.splice(
            this.notificationFind.indexOf(item),
            1,
            notification
          );
        }
      }
      this.notif = nbLu;
    },
    removeNotificationItem(notification) {
      for (const item of this.notificationFind) {
        if (item.id === notification.id) {
          this.notificationFind.splice(this.notificationFind.indexOf(item), 1);
        }
      }
    },

    deconnexion(){
      this.$query.query_params.headers.Authorization = null
      this.$router.push("/")
    }
  },
};
</script>
