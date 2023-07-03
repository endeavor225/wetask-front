<template>
  <div>
    <div class="row"> 
      <div class="col-10">
        <q-item clickable v-ripple @click="lireNotif" :class="{'bg-teal-2': !item.notification.lu}" >
        <q-item-section color="blue">
    
          <q-item-label caption lines="3" :text-color="item.notification.color">
       
            <q-avatar size="8px" font-size="0px" :color="item.notification.color"/>
           {{item.notification.titre}}
          </q-item-label>
        </q-item-section>
      </q-item>
      </div>
      <div class="col-2">
        <q-item >
        <q-item-section >
          <q-btn icon="close" color="negative" size="10px" @click="suppNotif" flat round align="center" style="margin-left:-10px;" />
        </q-item-section>
      </q-item>
      </div>
    </div>
      
    <q-separator inset="item" />
  </div>
</template>

<script>
import NotificationMixin from 'components/Notification/NotificationMixin'
export default {
  // name: 'ComponentName',

  mixins:[NotificationMixin],

  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  created(){
    //console.log('item : ',this.item)
  },
  data () {
    return {
      
    }
  },

  methods: {
    status(item){
      return "teal-2"
    },
    
    
  }
}
</script>
