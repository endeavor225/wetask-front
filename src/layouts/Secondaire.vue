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

        <q-toolbar-title>
          WeTasks
        </q-toolbar-title>

        <div>
          <q-btn-dropdown dense flat  style="font-size: 0.8rem;" color="white" round icon="notifications" :label="this.notif">
          <q-list bordered separator style="width: 250px; max-width: 350px;">
            <div v-for="item in this.notificationFind"
                :key="'item-notif'.concat(item._id)" >
              <notification 
              v-if="item && item.notification"
                :item="item"/>
            </div>
            
          </q-list>
        </q-btn-dropdown>

        </div>

        <!--
          <q-btn
          flat
          dense
          round
          icon="account_circle"
        />
        -->
        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          MENU
        </q-item-label>
        <span v-if="role === 'super-admin' || role==='admin'">
          <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        </span>
 
        
        <span v-if="role === 'user'">
          <EssentialLink2
          v-for="link in essentialLinks2"
          :key="link.title"
          v-bind="link"
        />
        </span>
        

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import EssentialLink2 from 'components/EssentialLink2.vue'
import Notification from 'components/Notification/Index'
import NotificationMixin from 'components/Notification/NotificationMixin'


const linksData = [
  {
    title: "Tâches",
    caption: "Liste des tâches",
    icon: "assignment_turned_in",
    link: "/#/taches"
  },

  {
    title: "Utilisateurs",
    caption: "Gestion des utilisateurs",
    icon: "supervisor_account",
    link: "/#/utilisateur"
  },
  
  {
    title: "Mon Profil",
    caption: "Infromations de l'utilisateur ",
    icon: "perm_identity",
    link: "/#/profil"
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

const linksData2 = [
  {
    title: "Tâches",
    caption: "Liste des tâches",
    icon: "assignment_turned_in",
    link: "/#/taches"
  },
  
  {
    title: "Mon Profil",
    caption: "Infromations de l'utilisateur ",
    icon: "perm_identity",
    link: "/#/profil"
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
  name: 'MainLayout',

  mixins:[NotificationMixin],

  components: { 
    EssentialLink, 
    EssentialLink2,
    Notification 
    
    },

  async created(){
    this.$root.$on("refresh-notif", this.actualNotif)
    this.$root.$on("remove-notif-item", this.removeNotificationItem)
    
    await this.findNotify(true)
  },


  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      essentialLinks2: linksData2,
      notificationFind: [],
      notif: '',
      role: this.$query.role,
    }
  },
  methods:{
    actualNotif(notification, nbLu){
      //console.log("marche", notification,  this.notificationFind.find(val => val.notification.id === notification.id));
      console.log(this.notificationFind);
      for (const item of this.notificationFind) {
        if (item.id === notification.id) {
              this.notificationFind.splice(
                this.notificationFind.indexOf(item),
                1,
                notification
              )    
        }
      }
      this.notif = nbLu
      
    },
    removeNotificationItem(notification){
      for (const item of this.notificationFind) {
        if (item.id === notification.id) {
              this.notificationFind.splice(
                this.notificationFind.indexOf(item),
                1,
              )    
        }
      }
    }
  }
}
</script>
