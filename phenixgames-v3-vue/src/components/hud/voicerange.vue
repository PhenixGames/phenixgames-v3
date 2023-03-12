<template>
    <section class="voice">
        <img src="@/assets/img/hud/speak.png" v-if="isSpeaking" />
        <img src="@/assets/img/hud/muted.png" v-if="!isSpeaking" />

        <div class="range">
            <img src="@/assets/img/hud/voicerange/whisper.png" v-if="voiceRange == 0" />
            <img src="@/assets/img/hud/voicerange/low.png" v-if="voiceRange == 1" />
            <img src="@/assets/img/hud/voicerange/mid.png" v-if="voiceRange == 2" />
            <img src="@/assets/img/hud/voicerange/high.png" v-if="voiceRange == 3" />
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isSpeaking: false,
            voiceRange: 2,
        };
    },
    methods: {
        manageVoice(isSpeaking) {
            this.isSpeaking = isSpeaking;
        },
        manageVoiceRange(range) {
            // 0 - Whisper
            // 1 - Low
            // 2 - Mid
            // 3 - High
            this.voiceRange = range;
        },
    },
    mounted() {
        gui.hud.voicerange = this;
    },
};
</script>
