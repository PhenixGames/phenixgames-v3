const { log } = require('../../../_assets/functions/log/logs');
const bcryptjs = require('bcryptjs');

const validator = require('validator');
const config = require('../../../_assets/json/config.json');
const pg_users = require('../../Models/tables/pg_users');
const pg_characters = require('../../Models/tables/pg_characters');

class Account {
    playerOnline = 0;

    constructor() {}

    async get(id) {
        return await pg_users
            .findOne({
                where: {
                    id,
                },
            })
            .then((user) => {
                return user;
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                })
                return false;
            });
    }

    async getByUsername(username) {
        return await pg_users
            .findOne({
                where: {
                    username,
                },
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                });
            });
    }

    async setInGameName(id, name) {
        const firstname = validator.trim(name[0]);
        const lastname = validator.trim(name[1]);

        const user = this.get(id);

        if (!user) {
            return false;
        }

        return await pg_characters.update(
            {
                firstname: firstname,
                lastname: lastname,
            },
            {
                where: {
                    player_id: id,
                },
            }
        ).catch((err) => {
            log({
                message: err,
                isFatal: true,
            })
            return false;
        });
    }

    async save(username, password) {
        password = await this.hash(password);

        return await pg_users
            .create({
                username: username,
                password: password,
            })
            .then(async (user) => {
                await user.createCharacter({
                    firstname: 'John',
                    lastname: 'Doe',
                });

                await user.createInventory();

                await user.createMoney({
                    bank_money: 0,
                    hand_money: 1500,
                });
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                })
                return false;
            });
    }

    changePos(player, pos, rot = false, dim = false) {
        try {
            player.position = new mp.Vector3(Number(pos.x), Number(pos.y), Number(pos.z));

            if (rot) player.heading = Number(rot);
            if (dim) player.dimension = Number(dim);
        } catch (err) {
            log({
                message: err,
                isFatal: true,
            });
            return false;
        }
    }

    async updatePos(id, pos) {
        return await pg_characters
            .update(
                {
                    last_pos: pos,
                },
                {
                    where: {
                        player_id: id,
                    },
                }
            )
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                })
                return false;
            });
    }

    async spawnAirport(player) {
        const id = player.getVariable('playerId');

        this.changePos(player, config.airport, config.airport.rot);

        this.updateHealth(id, await this.getHealth(id));
        this.updateArmour(id, await this.getArmour(id));

        this.setHud(player);
    }

    async getPos(player) {
        const user = await this.get(player.getVariable('playerId'));
        if (!user) return [];
        const character = await user.getCharacter();
        return character.last_pos ? character.last_pos : null;
    }

    checkPassword(password, dbpassword) {
        return bcryptjs.compareSync(password, dbpassword);
    }

    hash(string) {
        return new Promise((resolve) => {
            const salt = 12;
            return resolve(bcryptjs.hashSync(string, salt));
        });
    }

    setHud(player) {
        player.call('Player:ActivateHUD');
    }

    async updateHealth(id, health) {
        return await pg_characters
            .update(
                {
                    health: health,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                })
                return false;
            });
    }

    async updateArmour(id, armour) {
        return await pg_characters
            .update(
                {
                    armour: armour,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                })
                return false;
            });
    }

    async getHealth(id) {
        return await pg_characters
            .findOne({
                where: {
                    player_id: id,
                },
                attributes: ['health'],
            })
            .then((res) => {
                return res.health;
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                })
                return 100;
            });
    }

    async getArmour(id) {
        return await pg_characters
            .findOne({
                where: {
                    player_id: id,
                },
                attributes: ['armour'],
            })
            .then((res) => {
                return res.armour;
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                })
                return 0;
            });
    }

    getPlayerOnline() {
        return this.playerOnline;
    }

    updatePlayerOnline() {
        this.playerOnline = mp.players.toArray().length;
    }

    syncAllPlayers() {
        mp.players.forEach((player) => {
            if (!player.getVariable('isInEvent') && player.getVariable('syncPlayer')) {
                this.updatePos(player.getVariable('playerId'), player.position);
                this.updateHealth(player.getVariable('playerId'), player.health);
                this.updateArmour(player.getVariable('playerId'), player.armour);
            }
        });
    }

    async getRole(id) {
        return await pg_users
            .findOne({
                where: {
                    id: id,
                },
                attributes: ['roleId'],
            })
            .then((res) => {
                return res.roleId;
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                })
                return false;
            });
    }
}

const AccountAPI = new Account();
module.exports = AccountAPI;
