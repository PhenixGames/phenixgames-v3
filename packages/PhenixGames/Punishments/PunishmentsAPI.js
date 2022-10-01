const database = require("../../_db/db");
const moment = require('moment')


class PunishmentsApi {
    constructor() {}

    async mute({playerId, adminId, reason, date_of_punishment, till_date}) {
        const punishment_id = await this.generatePunishmentId();

        return await database.query(`INSERT INTO pg_punishments (id, muted, punishment_id, admin, reason, date_of_punishment, till_date) VALUES (?, ?, ?, ?, ?, ?)`, 
        [playerId, '1', punishment_id, adminId, reason, date_of_punishment, till_date]
        ).catch(err => {
            return false;
        })
    }

    async ban({playerId, adminId, reason, date_of_punishment, till_date}) {
        const punishment_id = await this.generatePunishmentId();

        return await database.query(`INSERT INTO pg_punishments (id, banned, punishment_id, admin, reason, date_of_punishment, till_date) VALUES (?, ?, ?, ?, ?, ?)`, 
        [playerId, '1', punishment_id, adminId, reason, date_of_punishment, till_date]
        ).catch(err => {
            return false;
        })
    }

    async kick(player, reason) {
        player.kick(reason);
    }

    showPunishmentScreen(player, data) {
        const date = data.till_date.split(',');
        const days = date[0].split('.');
        moment.locale('de')
        var end_of_punishement = moment([days[2], days[1], days[0]]).fromNow() + ` (${days[2]}.${days[1]}.${days[0]} ${date[1]})`;

        let punishment_infos = {
            adminname: data.admin,
            reason: data.reason,
            end_of_punishement,
            date_of_punishment: data.date_of_punishment,
            punishment_id: data.punishment_id
        }; 

        player.call('Player:Init:Punishmentscreen', [punishment_infos]);
    }

    async generatePunishmentId() {
        let id = Math.floor(Math.random() * 1000000000) + 1;

        const exists = await this.getPunishment(id);
        if (exists) {
            return this.generatePunishmentId();
        }

        return id;
    }

    async getPunishment(id) {
        return await database.query(`SELECT * FROM pg_punishments WHERE punishment_id = ?`, [id]).then(async res => {
            if (res.length > 0) {
                return res[0];
            }
            return false;
        }).catch(err => {
            return false;
        });
    }
}

const PunishmentsAPI = new PunishmentsApi();
module.exports = PunishmentsAPI;