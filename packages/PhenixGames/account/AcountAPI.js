const { log } = require("../../../_assets/functions/log/logs");
const database = require("../../_db/db");
const bcryptjs = require('bcryptjs');

const generellAPI = require('../allgemein/');
const validator = require('validator');
const config = require('../../../_assets/json/config.json');
const MoneyAPI = require("../moneyAPI");

class Account {

    playerOnline = 0;

    constructor() {}

    async get(id) {
        return await database.query(`SELECT * FROM pg_users WHERE id = ?`, [id]).then(async res => {
            if (res.length > 0) {
                return res[0];
            }
            return false;
        }).catch(err => {
            return false;
        });
    }

    async getByUsername(username) {
        return await database.query(`SELECT * FROM pg_users WHERE username = ? LIMIT 1`, [username]).then(async res => {
            if (res.length > 0) {
                return res[0];
            }
            return false;
        }).catch(err => {
            return false;
        });
    }

    async setInGameName(id, name) {
        const firstname = validator.trim(name[0]);
        const lastname = validator.trim(name[1]);
        
        return await database.query('UPDATE pg_users SET firstname = ?, lastname = ? WHERE id = ?', [firstname, lastname, id])
        .then(() => {
            return true
        })
        .catch(err => {
            return false;
        });
    }

    async save(username, password) {
        password = this.hash(password);
        return await database.query('INSERT INTO pg_users (username, password) VALUES (?, ?)', [username, password])
            .catch(err => {
                return false;
            });
    }

    async saveInventory(id, items) {
        return await database.query('INSERT INTO pg_user_inventory (id, items) VALUES (?, ?)', [id, JSON.stringify(items)])
        .catch(err => {
            return false;
        });
    }

    async updateInventory(id, items) {
        return await database.query(`UPDATE pg_user_inventory SET items = ? WHERE id = ?`, [JSON.stringify(items), id])
        .catch(err => {
            return false;
        });
    }

    changePos(player, pos, rot = false, dim = false) {
        try {
            player.position = new mp.Vector3(Number(pos.x), Number(pos.y), Number(pos.z));
    
            if (rot) player.heading = Number(rot);
            if (dim) player.dimension = Number(dim)
        } catch (err) {
            log({
                message: err,
                isFatal: true
            });
            return false;
        }
    }

    async updatePos(id, pos) {       
        return await database.query('UPDATE pg_users SET last_pos = ? WHERE id = ?', [pos, id])
        .catch(err => {
            return false;
        })
    }

    async spawnAirport(player) {
        const id = player.getVariable('playerId');
    
        this.changePos(player, config.airport, config.airport.rot)
    
        this.updateHealth(id, await this.getHealth(id));
        this.updateArmour(id, await this.getArmour(id));
        
        this.setHud(player);
    }

    async getPos(player) {
        return await database.query('SELECT last_pos FROM pg_users WHERE id = ?', [player.getVariable('playerId')])
        .then(res => {
            try {
                return JSON.parse(res[0].last_pos)
            }catch(err) {
                this.changePos(player, config.airport.pos, config.airport.rot)

                let newPos = config.airport.pos.split(', ');
                return JSON.parse(`{"x": "${newPos[0]}", "y": "${newPos[1]}", "z": "${newPos[2]}"}`)
            }
        })
        .catch(err => {
            return false;
        })
    }

    checkPassword(password, dbpassword) {
        return bcryptjs.compareSync(password, dbpassword);
    }

    hash(string) {
        const salt = 12;
        return bcryptjs.hashSync(string, salt);
    }

    setHud(player) {
        player.call('Player:ActivateHUD');
        MoneyAPI.updateHud(player);
    }

    async updateHealth(id, health) {
        return await database.query('UPDATE pg_users SET health = ? WHERE id = ?', [health, id])
        .catch(err => {
            return false;
        })
    }

    async updateArmour(id, armour) {
        return await database.query('UPDATE pg_users SET armour = ? WHERE id = ?', [armour, id])
        .catch(err => {
            return false;
        })
    }

    async getHealth(id) {
        return await database.query('SELECT health FROM pg_users WHERE id = ?', [id])
        .then(res => {
            return res[0].health;
        })
        .catch(err => {
            return false;
        })
    }

    async getArmour(id) {
        return await database.query('SELECT armour FROM pg_users WHERE id = ?', [id])
        .then(res => {
            return res[0].armour;
        })
        .catch(err => {
            return false;
        })
    }

    getPlayerOnline() {
        return this.playerOnline;
    }

    updatePlayerOnline() {
        this.playerOnline = mp.players.toArray().length;
    }

    syncAllPlayers() {
        mp.players.forEach((player) => {
            if(!player.getVariable('isInEvent') && player.getVariable('syncPlayer')) {

                this.updatePos(player.getVariable('playerId'), JSON.stringify(player.position));
                this.updateHealth(player.getVariable('playerId'), player.health); 
                this.updateArmour(player.getVariable('playerId'), player.armour); 

            }
        });
    }

    async getRole(id) {
        return await database.query('SELECT roleId FROM pg_users WHERE id = ?', [id])
        .then(res => {
            return res[0].roleId;
        })
        .catch(err => {
            return false;
        })
    }
}

const AccountAPI = new Account();
module.exports = AccountAPI;