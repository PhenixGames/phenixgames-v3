<template>
    <form id="setName" @submit="submitForm">
        <span class="red bold">{{error_msg}}</span><br/>
        <input type="text" id="firstname" v-model="firstname" placeholder="Vorname" />
        <input type="text" id="lastname" v-model="lastname" placeholder="Nachname" />
        <input type="submit" />
    </form>
</template>

<script>
export default {
    name: 'pg_namechooser',
    data() {
        return {
            firstname: '',
            lastname: '',
            error_msg: ''
        }
    },
    methods: {
        submitForm(e) {
            e.preventDefault();
            if(this.firstname === '' || this.lastname === '') {
                return this.error_msg = 'Der Vor- und Nachname darf nicht frei bleiben!';
            }
            if(this.firstname.length < 4 || this.lastname.length < 4) {
                return this.error_msg = 'Der Vor- und Nachname darf nicht kürzer als 4 Zeichen sein!'
            }

            mp.trigger('uiNameChooser_accept', this.firstname, this.lastname)
        }
    }
}
</script>