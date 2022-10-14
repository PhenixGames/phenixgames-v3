class DiscordApi {
    constructor() {}

    set(name) {
        let title = 'Spielt auf PhenixGames V3';
        let playing = `Spielt als ${name}`;
        mp.players.call('Set:Discord', [title, playing]);
    }
}

const DiscordAPI = new DiscordApi();
module.exports = DiscordAPI;
