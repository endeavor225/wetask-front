export default {
    methods: {

        async findNotify() {
            try {
                this.$query.setUrl('user.notification/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    populate: ["notification"],
                    query: {
                        user: this.$query.user.id
                    }
                })
                let res = await this.$query.start()

                this.notificationFind = res.data
                let lu = []
                for (const iterator of res.data) {
                    if (iterator.notification && !iterator.notification.lu) {
                        lu.push(iterator)
                    }
                }
                this.notif = lu.length

                console.log(res.data)

                return lu.length

            } catch (error) {
                this.$notify(
                    'Une erreur est survenue lors de la récupération des notifications',
                    'negative'
                )
            }
        },


        //
        async lireNotif() {
            try {
                if (!this.item.notification.lu) {


                    let res = null
                    this.$query.setUrl('notifications/update')
                    this.$query.setMethod("put")
                    this.$query.setParams({})
                    this.$query.setData({
                        id: this.item.notification.id,
                        lu: true
                    })

                    res = await this.$query.start()

                    this.$query.setUrl('user.notification/find')
                    this.$query.setMethod("get")
                    this.$query.setParams({
                        query: {
                            notification: this.item.notification.id,
                        },
                        populate: ["notification"]
                    })
                    this.$query.setData({})
                    res = await this.$query.start()
                    console.log(res.data);

                    let resp = await this.findNotify()
                    
                    this.$root.$emit('refresh-notif', res && res.data && res.data.length > 0 ? res.data[0] : null,resp)
                }
            } catch (error) {

            }
        },




        async suppNotif() {
            try {
                console.log(this.item.notification.id);
                let res = null
                this.$query.setUrl('notifications/remove')
                this.$query.setMethod("delete")
                this.$query.setParams({})
                this.$query.setData({
                    id: this.item.notification._id,
                })
                res = await this.$query.start()
                console.log(res.data);

                this.$query.setUrl('user.notification/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query: {
                        notification: this.item.notification.id,
                    },
                    populate: ["notification"]
                })
                this.$query.setData({})
                res = await this.$query.start()

                if (res && res.data && res.data.length > 0) {
                    this.$root.$emit('remove-notif-item', res.data[0])
                }


                //this.$root.$emit('refresh-notif', res && res.data && res.data.length > 0 ? res.data[0] : null)

            } catch (error) {

            }
        },


    }
}