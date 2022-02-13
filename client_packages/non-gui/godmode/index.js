mp.events.add("Set:God", (isGod) => {
    mp.players.local.setInvincible(isGod)
});