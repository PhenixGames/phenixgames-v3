<template>
    <div class="namechooser">
        <img
            src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg"
            ondragstart="return false"
        />

        <form class="namechooserform" @submit="submitForm" v-show="showNamechooser">
            <p class="desc white bold user-select-none">
                Bitte gebe deinen zukünftigen Charakternamen ein.
            </p>
            <span class="red bold">{{ error_msg }}</span>
            <br />
            <input
                type="text"
                id="firstname"
                v-model="firstname"
                placeholder="Dein zukünftiger Vorname..."
            />
            <input
                type="text"
                id="lastname"
                v-model="lastname"
                placeholder="Dein zukünftiger Nachname..."
            />
            <input type="submit" class="cursor-pointer" value="Weiter" />
        </form>

        <div class="confirmMessage white" v-show="showConfirmMessage">
            <h3>Bist du dir sicher?</h3>
            <p>
                Der Name kann <i><strong>nicht</strong></i> ohne weiteres verändert werden!
            </p>
            <form>
                <button @click="confirmRegister" class="cursor-pointer bold">Ja</button>
                <button @click="cancelRegister" class="cursor-pointer bold">Nein</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pg_namechooser',
    data() {
        return {
            firstname: '',
            lastname: '',
            error_msg: '',
            showNamechooser: true,
            showConfirmMessage: false,
        };
    },
    methods: {
        submitForm(e) {
            e.preventDefault();
            if (this.firstname === '' || this.lastname === '') {
                return (this.error_msg = 'Der Vor- und Nachname darf nicht frei bleiben!');
            }
            if (this.firstname.length < 4 || this.lastname.length < 4) {
                return (this.error_msg =
                    'Der Vor- und Nachname darf nicht kürzer als 4 Zeichen sein!');
            }
            e.target.classList.add('slide_left');
            setTimeout(() => {
                this.showNamechooser = false;
                e.target.classList.remove('slide_left');
                this.showConfirm();
            }, 900);
        },
        showConfirm() {
            this.showConfirmMessage = true;
            document.querySelector('.confirmMessage').classList.add('slide_right');

            setTimeout(() => {
                document.querySelector('.confirmMessage').classList.remove('slide_right');
            }, 900);
        },
        confirmRegister(e) {
            e.preventDefault();
            mp.trigger('Ui:Namechooser:Accept', this.firstname, this.lastname);
        },
        cancelRegister(e) {
            e.preventDefault();

            this.showConfirmMessage = false;
            this.showNamechooser = true;
        },
    },
};
</script>

<style scoped>
@import url('../../assets/css/login/namechooser.css');
</style>
