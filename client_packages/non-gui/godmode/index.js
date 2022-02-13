mp.events.add("Set:God", (isGod) => {
    mp.players.local.setInvincible(isGod)
    mp.gui.chat.push((isGod) ? '!{#00FF00}Du bist im Godmode': '!{#FF0000}Du hast den Godmode verlassen');
});