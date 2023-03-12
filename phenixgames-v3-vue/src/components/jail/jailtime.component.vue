<template>
    <section class="jailtime_wrapper">
        <img src="@/assets/img/_logo/web/PhenixGames_Logo_no_text.svg" />
        <div class="content" :class="isAdmin ? 'isAdmin' : ''" id="content">
            <div id="time_reason" :class="hideTimeAndReasonClass ? '' : 'show'">
                <p class="jailtime_content">
                    {{ timeLeftString }}
                </p>
                <p class="jailtime_reason">
                    {{ reason }}
                </p>
            </div>
            <span class="jailtime_default" :class="hideDefaultTextClass ? '' : 'show'">
                {{ defaultText }}
            </span>
        </div>
    </section>

    <div class="reason_expand">
        <p>Full Reason: {{ fullReason }}</p>
    </div>
</template>

<script>
export default {
    name: 'pg_jailtime',
    data() {
        return {
            timeLeft: '',
            timeLeftString: '',
            reason: '',
            fullReason: '',
            defaultText: '',
            hideTimeAndReasonClass: true,
            hideDefaultTextClass: true,
            isAdmin: false,
            interval: null,
            defaultTextWasBefore: false,
            timeAndReasonWasBefore: false,
            animationRunned: false,
        };
    },

    methods: {
        formatTime() {
            const timeLeft = this.timeLeft - new Date().getTime();
            const seconds = Math.floor((timeLeft / 1000) % 60);
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

            let string = '';

            switch (true) {
                case days > 0:
                    string += `${days}d `;
                case hours > 0:
                    string += `${hours}h `;
                case minutes > 0:
                    string += `${minutes}m `;
                case seconds > 0:
                    string += `${seconds}s`;
            }

            return string;
        },

        updateTimer() {
            this.timeLeftString = this.formatTime();
        },

        removeInterval() {
            clearInterval(this.interval);
        },

        addInterval() {
            this.interval = setInterval(this.updateTimer, 100);
        },

        showDefaultText() {
            this.hideDefaultTextClass = false;
        },

        hideDefaultText() {
            this.hideDefaultTextClass = true;
        },

        showTimeAndReason() {
            this.hideTimeAndReasonClass = false;
        },

        hideTimeAndReason() {
            this.hideTimeAndReasonClass = true;
        },

        animation() {
            const contentDiv = document.getElementById('content');
            if (contentDiv.clientWidth >= 350) {
                if (this.animationRunned) return;
                switch (true) {
                    case this.defaultTextWasBefore:
                        this.hideDefaultText();
                        setTimeout(() => {
                            this.addInterval();
                            this.showTimeAndReason();

                            this.defaultTextWasBefore = false;
                            this.timeAndReasonWasBefore = true;
                        }, 400);
                        break;
                    case this.timeAndReasonWasBefore:
                        this.hideTimeAndReason();
                        this.removeInterval();
                        setTimeout(() => {
                            this.showDefaultText();
                            this.timeAndReasonWasBefore = false;
                            this.defaultTextWasBefore = true;
                        }, 400);
                        break;
                    default:
                        this.showDefaultText();
                        this.defaultTextWasBefore = true;
                }
                this.animationRunned = true;
            } else {
                this.animationRunned = false;
                this.hideDefaultText();
                this.hideTimeAndReason();
                this.removeInterval();
            }
        },

        init(timeleft, reason, isAdmin) {
            this.timeLeft = timeleft;
            this.reason = reason;
            this.fullReason = reason;
            this.isAdmin = isAdmin;
        },
    },

    mounted() {
        this.defaultText = 'Du bist im Gefängnis';

        if (this.reason.length > 16) {
            this.reason = this.reason.substring(0, 16) + '...(Press H for more)';
        }

        window.addEventListener('keydown', (evt) => {
            if (evt.key !== 'h') return;

            if (this.reason.length > 16) {
                document.querySelector('.reason_expand').style.opacity = '1';
            }
        });

        window.addEventListener('keyup', (evt) => {
            document.querySelector('.reason_expand').style.opacity = '0';
        });

        new ResizeObserver(this.animation).observe(document.getElementById('content'));

        gui.jailtime = this;
    },
};
</script>

<style scoped>
@import url('@/assets/css/jail/style.css');
</style>
