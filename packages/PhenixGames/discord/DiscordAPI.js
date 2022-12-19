class DiscordApi {
    constructor() {}

    set(player) {
        let name = player.name;
        let title = 'Spielt auf PhenixGames V3';
        let playing = `Spielt als ${name}`;
        player.call('Set:Discord', [title, playing]);
    }
}

const DiscordAPI = new DiscordApi();
module.exports = DiscordAPI;
