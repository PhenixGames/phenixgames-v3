mp.events.add("Set:Discord", (title, playing) => {
    mp.discord.update(title, playing);
});