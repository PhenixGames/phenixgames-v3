const config = require('../../../_assets/json/config.json');
const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const PermissionSystem = require('../playerAPI/PermissionSystem');
const MoneyAPI = require('../moneyAPI/')
const {
    log
} = require('../../../_assets/functions/log/logs');
const AccountAPI = require('./AcountAPI');
const DiscordAPI = require('../discord/DiscordAPI');
const PunishmentsAPI = require('../punishments/PunishmentsAPI');

mp.events.add('playerJoin', async (player) => {
    const user = await AccountAPI.getByUsername(player.socialClub);
    if (!user) {
        //! TO-DO übergeben an LoginScreen, dass User kein Account hat
        player.call('Open:Login:Browser', ([false]));
        return log({
            message: `[SERVER]: [Not-Registered] ${player.socialClub} has joined the server!`,
            isFatal: false
        });
    }

    player.call('Open:Login:Browser', ([true]));

    generellAPI.saveLocalVar(player, {
        'playerId': user.id,
        'isTeam': user.isTeam,
        'isAdmin': user.isAdmin,
        'isMedia': user.isMedia
    });

    AccountAPI.updatePlayerOnline();

    log({
        message: `[SERVER]: [Registered] ${player.socialClub} has joined the server!`,
        isFatal: false
    });

    if(user.firstname && user.lastname) {
        player.name = user.firstname + " " + user.lastname;
        DiscordAPI.set(player.name);
    }
});


mp.events.add('LoginAccount', async (player, password) => {
    const user = await AccountAPI.getByUsername(player.socialClub);

    if(!user) {
        //TODO Redirect to register
    }

    const punishments = await PunishmentsAPI.getPunishment(user.id);

    if(punishments) {
        const isMuted = punishments.find(pushment => pushment.muted === '1' && active === '1');
        const isBanned = punishments.find(pushment => pushment.banned === '1' && active === '1');

        if(isMuted) player.setVariable('isMuted', true);

        if(isBanned) {
            PunishmentsAPI.showPunishmentScreen(player, isBanned);
            return;
        }
    }
    if (AccountAPI.checkPassword(password, user.password) === false) {
        return player.call('Wrong:Password')
    }

    
    PermissionSystem.setPerms(player, user.roleId);

    const hasCharacter = user.firstname && user.lastname;
    if (!hasCharacter) return player.call('Player:InGameName:Choose');

    player.call('Login:Succes:close:Windows');
    player.call('Player:Spawn:Options');
});


mp.events.add('RegisterAccount', async (player, password) => {
    await AccountAPI.save(player.socialClub, password);

    const user = await AccountAPI.getByUsername(player.socialClub);

    await generellAPI.saveLocalVar(player, {
        'playerId': user.id,
        'isTeam': 0,
        'isAdmin': 0,
        'isInHouse': false,
        'isLoggedIn': true,
    });

    await MoneyAPI.CreateNewMoneyEntry(user.id, 1500, 3000)

    PermissionSystem.setPerms(player, user.roleId);

    const items = [{
        invPos: 1,
        img: "https://cdn-icons-png.flaticon.com/32/3075/3075977.png",
        count: 1,
        isTop: true,
        isStackable: true
    }, {
        invPos: 1,
        img: "https://cdn-icons-png.flaticon.com/32/3075/3075977.png",
        count: 1,
        isTop: false,
        isStackable: false
    }];

    await AccountAPI.saveInventory(user.id, JSON.stringify(items));

    player.call('Player:InGameName:Choose');
    return;
});

mp.events.add('Player:Set:InGameName', async (player, firstname, lastname) => {
    const setInGameName = await AccountAPI.setInGameName(player.getVariable('playerId'), [firstname, lastname])
    if (!setInGameName) return;
    
    await generellAPI.saveLocalVar(player, {
        'isLoggedIn': true
    });
    player.name = firstname + " " + lastname;

    player.notify(`Erfolgreich registriert!`);

    player.call('Player:InGameName:Choose:Succes:close:Windows');
    player.call('Login:Succes:close:Windows');
    player.call('Destroy:Login:Cam');
    
    AccountAPI.spawnAirport(player);
})

mp.events.add('Player:Spawn:airport', async (player) => {
    AccountAPI.spawnAirport(player);
});


mp.events.add('Player:Spawn:LastPos', async (player) => {
    const id = player.getVariable('playerId');
    const lastPos = await AccountAPI.getPos(player);

    AccountAPI.updateHealth(id, await AccountAPI.getHealth(id));
    AccountAPI.updateArmour(id, await AccountAPI.getArmour(id));

    player.call("Destroy:Login:Cam");

    AccountAPI.changePos(player, lastPos);
    generellAPI.saveLocalVar(player, {
        'syncPlayer': true
    });

    return AccountAPI.setHud(player);
});



// ---------------------------------------------- //
mp.events.add('Player:Spawn:house', async (player) => {
    // TODO This Code needs to be Fixed when adding Homes. 
    const playerId = player.getVariable('playerId');
    ApplyHealthAndArmour(player, playerId);
    return setHUD(player);
});