const database = require('../../_db/db');
const moment = require('moment');
const pg_punishments = require('../../Models/tables/pg_punishments');

class PunishmentsApi {
    constructor() {}

    async mute({ playerId, adminId, reason, date_of_punishment, till_date }) {
        const punishment_id = await this.generatePunishmentId();

        return await pg_punishments
            .create({
                player_id: playerId,
                muted: true,
                punishment_id,
                admin: adminId,
                reason,
                date_of_punishment,
                till_date,
            })
            .then((res) => {
                return true;
            })
            .catch((err) => {
                return false;
            });
    }

    async ban({ playerId, adminId, reason, date_of_punishment, till_date }) {
        const punishment_id = await this.generatePunishmentId();

        return await pg_punishments
            .create({
                player_id: playerId,
                banned: true,
                punishment_id,
                admin: adminId,
                reason,
                date_of_punishment,
                till_date,
            })
            .then((res) => {
                return true;
            })
            .catch((err) => {
                return false;
            });
    }

    async kick(player, reason) {
        player.kick(reason);
    }

    showPunishmentScreen(player, data) {
        const punishment_infos = {
            adminname: data.admin,
            reason: data.reason,
            end_of_punishement: data.till_date,
            date_of_punishment: data.date_of_punishment,
            punishment_id: data.punishment_id,
        };

        player.call('Player:Init:Punishmentscreen', [punishment_infos]);
    }

    async generatePunishmentId() {
        let id = Math.floor(Math.random() * 1000000000) + 1;

        const exists = await this.getPunishment(id);
        if (exists.punishment_id) {
            return this.generatePunishmentId();
        }

        return id;
    }

    async getPunishment(id) {
        return await pg_punishments.findOne({
            where: {
                punishment_id: id,
            },
        }).then(res => {
            return res;
        })
        .catch(err => {
            return false;
        })
    }
}

const PunishmentsAPI = new PunishmentsApi();
module.exports = PunishmentsAPI;
