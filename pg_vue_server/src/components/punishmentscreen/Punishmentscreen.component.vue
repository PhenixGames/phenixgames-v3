<template>
    <div class="punishment">
        <div class="ps_logo">
            <img src="../../assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
        </div>

        <div class="punishment_info bold white">
            <h3 class="red big center">Dein Konto wurde gesperrt</h3>
            <div>
                <span>Admin:</span>
                <span>{{ adminname }}</span>
            </div>
            <div>
                <span>Grund:</span>
                <span>{{ reason }}</span>
            </div>
            <div>
                <span>Verbleibende Zeit:</span>
                <span class="red">{{ time_left }}</span>
            </div>
            <div>
                <span>Datum der Sperrung:</span>
                <span>{{ date_of_punishment }}</span>
            </div>
            <div>
                <span>Punishment ID:</span>
                <span>{{ punishment_id }}</span>
            </div>
        </div>
    </div>

    <!--IMPORTANT. DO NOT DELETE-->
    <span style="opacity: 0; pointer-events: none; user-select: none">X</span>
</template>

<script>
export default {
    name: 'PG_Punishmentscreen',
    data() {
        return {
            adminname: '',
            reason: '',
            time_left: '',
            date_of_punishment: '',
            date_of_punishment_timestamp: '',
            punishment_id: '',
        };
    },
    mounted() {
        this.calculateTimeLeft();
        setInterval(() => {
            this.calculateTimeLeft();
        }, 1000);

        const divHeight = document.querySelector('.punishment_info').offsetHeight;
        document.querySelector('.punishment_info').style.height = divHeight + 75 + 'px';

        gui.punishmentscreen = this;
    },
    methods: {
        initPunishmentscreen({ adminname, reason, time_left, date_of_punishment, punishment_id }) {
            this.adminname = adminname;
            this.reason = reason;
            this.date_of_punishment_timestamp = parseInt(date_of_punishment);
            this.date_of_punishment = new Date(parseInt(date_of_punishment)).toLocaleString(
                'de-DE',
                {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }
            );
            this.punishment_id = punishment_id;
        },

        calculateTimeLeft() {
            const today = new Date().getTime();
            const dateOfPunishment = new Date(this.date_of_punishment_timestamp).getTime();

            const timeLeft = dateOfPunishment - today;
            const timeLeftInDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const timeLeftInHours = Math.floor(timeLeft / (1000 * 60 * 60));
            const timeLeftInMinutes = Math.floor(timeLeft / (1000 * 60));
            const timeLeftInSeconds = Math.floor(timeLeft / 1000);

            switch (true) {
                case timeLeftInDays > 0:
                    this.time_left = timeLeftInDays + ` Tag${timeLeftInDays > 1 ? 'e' : ''}`;
                    break;
                case timeLeftInHours > 0:
                    this.time_left = timeLeftInHours + ` Stunde${timeLeftInHours > 1 ? 'n' : ''}`;
                    break;
                case timeLeftInMinutes > 0:
                    this.time_left =
                        timeLeftInMinutes + ` Minute${timeLeftInMinutes > 1 ? 'n' : ''}`;
                    break;
                case timeLeftInSeconds > 0:
                    this.time_left =
                        timeLeftInSeconds + ` Sekunde${timeLeftInSeconds > 1 ? 'n' : ''}`;
                    break;
                default:
                    this.time_left = 'Sperre abgelaufen!';
                    break;
            }
        },
    },
};
</script>

<style scoped>
@import url('@/assets/css/punishmentscreen/punishmentscreen.css');
</style>
