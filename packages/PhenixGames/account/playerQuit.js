const AccountAPI = require("./AcountAPI");

mp.events.add("playerQuit", (player) => {
    AccountAPI.updatePlayerOnline();
});
