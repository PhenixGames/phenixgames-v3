/*
Navicat MySQL Data Transfer

Source Server         : PhenixGames
Source Server Version : 80028
Source Host           : 46.105.155.168:3306
Source Database       : phenixgames_v3

Target Server Type    : MYSQL
Target Server Version : 80028
File Encoding         : 65001

Date: 2022-04-14 22:15:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `pg_fuelstations`
-- ----------------------------
DROP TABLE IF EXISTS `pg_fuelstations`;
CREATE TABLE `pg_fuelstations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` tinyint DEFAULT '2',
  `fuel_stored` float DEFAULT '1500',
  `fuel_buy_price` int DEFAULT '1',
  `fuel_sell_price_b` int DEFAULT '1',
  `fuel_sell_price_d` int DEFAULT '1',
  `business_owner_id` int DEFAULT '0' COMMENT '0 = Staat',
  `business_profit_mp` float DEFAULT '0.5',
  `pos` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of pg_fuelstations
-- ----------------------------
INSERT INTO `pg_fuelstations` VALUES ('1', '2', '1500', '1', '1', '1', '0', '0.5', '-2096.231689453125, -320.1805114746094, 12.16186809539795');
INSERT INTO `pg_fuelstations` VALUES ('2', '2', '1500', '1', '1', '1', '0', '0.5', '-1437.87451171875, -276.6646423339844, 45.20764923095703');

-- ----------------------------
-- Table structure for `pg_fuelstations_marker`
-- ----------------------------
DROP TABLE IF EXISTS `pg_fuelstations_marker`;
CREATE TABLE `pg_fuelstations_marker` (
  `marker_id` int NOT NULL AUTO_INCREMENT,
  `fuelstation_id` int DEFAULT NULL,
  `pos` varchar(255) DEFAULT NULL,
  `size` float DEFAULT '5',
  PRIMARY KEY (`marker_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of pg_fuelstations_marker
-- ----------------------------
INSERT INTO `pg_fuelstations_marker` VALUES ('1', '1', '-2088.719482421875, -327.52532958984375, 12.1', '5');

-- ----------------------------
-- Table structure for `pg_houses`
-- ----------------------------
DROP TABLE IF EXISTS `pg_houses`;
CREATE TABLE `pg_houses` (
  `house_id` bigint NOT NULL AUTO_INCREMENT,
  `player_id` bigint NOT NULL,
  `house_pos` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '''''',
  PRIMARY KEY (`house_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_houses
-- ----------------------------
INSERT INTO `pg_houses` VALUES ('102', '103', '261.4586, -998.8196, -99.00863');
INSERT INTO `pg_houses` VALUES ('103', '104', '261.4586, -998.8196, -99.00863');
INSERT INTO `pg_houses` VALUES ('104', '105', '261.4586, -998.8196, -99.00863');

-- ----------------------------
-- Table structure for `pg_marker`
-- ----------------------------
DROP TABLE IF EXISTS `pg_marker`;
CREATE TABLE `pg_marker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marker_pos` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `marker_rot` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `marker_dir` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `marker_color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `marker_visible` tinyint DEFAULT NULL,
  `marker_dim` bigint DEFAULT NULL,
  `marker_type` int NOT NULL,
  `marker_scale` int DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_marker
-- ----------------------------
INSERT INTO `pg_marker` VALUES ('1', '265.9962158203125, -1007.3060302734375, -102.00233892822266', null, null, null, '1', null, '27', '1');

-- ----------------------------
-- Table structure for `pg_money`
-- ----------------------------
DROP TABLE IF EXISTS `pg_money`;
CREATE TABLE `pg_money` (
  `playerid` bigint DEFAULT NULL,
  `hand_money` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `bank_pin` int DEFAULT NULL,
  `bank_money` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_money
-- ----------------------------

-- ----------------------------
-- Table structure for `pg_permission_list`
-- ----------------------------
DROP TABLE IF EXISTS `pg_permission_list`;
CREATE TABLE `pg_permission_list` (
  `roleid` int DEFAULT NULL,
  `root` tinyint NOT NULL DEFAULT '0',
  `manage_rang` tinyint NOT NULL DEFAULT '0',
  `manage_team` tinyint NOT NULL DEFAULT '0',
  `manager_member_ext` tinyint NOT NULL DEFAULT '0',
  `ban_member` tinyint NOT NULL DEFAULT '0',
  `admin_menu` tinyint NOT NULL DEFAULT '0',
  `manage_member` tinyint NOT NULL DEFAULT '0',
  `godmode` tinyint NOT NULL DEFAULT '0',
  `mute_member` tinyint NOT NULL DEFAULT '0',
  `kick_member` tinyint NOT NULL DEFAULT '0',
  `spawn_weapon` tinyint NOT NULL DEFAULT '0',
  `tp_to` tinyint NOT NULL DEFAULT '0',
  `car_spawn` tinyint NOT NULL DEFAULT '0',
  `no_clip` tinyint NOT NULL DEFAULT '0',
  `own_prefix` tinyint NOT NULL DEFAULT '0',
  `isTeam` tinyint NOT NULL DEFAULT '0',
  `tp` tinyint NOT NULL DEFAULT '0',
  `heal` tinyint DEFAULT '0',
  `revive` tinyint DEFAULT '0',
  PRIMARY KEY (`tp`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_permission_list
-- ----------------------------
INSERT INTO `pg_permission_list` VALUES ('9', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '1', '1');
INSERT INTO `pg_permission_list` VALUES ('10', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1');

-- ----------------------------
-- Table structure for `pg_permission_roles`
-- ----------------------------
DROP TABLE IF EXISTS `pg_permission_roles`;
CREATE TABLE `pg_permission_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `roleid` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_permission_roles
-- ----------------------------
INSERT INTO `pg_permission_roles` VALUES ('1', 'Projekt Leitung', '10');
INSERT INTO `pg_permission_roles` VALUES ('5', 'Administration', '9');
INSERT INTO `pg_permission_roles` VALUES ('6', 'Support', '8');
INSERT INTO `pg_permission_roles` VALUES ('7', 'Entwicklung', '7');
INSERT INTO `pg_permission_roles` VALUES ('8', 'Content', '6');
INSERT INTO `pg_permission_roles` VALUES ('9', 'Designer', '5');
INSERT INTO `pg_permission_roles` VALUES ('10', 'Mapper', '4');

-- ----------------------------
-- Table structure for `pg_punishments`
-- ----------------------------
DROP TABLE IF EXISTS `pg_punishments`;
CREATE TABLE `pg_punishments` (
  `id` bigint NOT NULL,
  `banned` tinyint NOT NULL DEFAULT '0',
  `muted` tinyint NOT NULL DEFAULT '0',
  `till_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `admin_id` bigint NOT NULL,
  `punishment_id` bigint DEFAULT NULL,
  `reason` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_punishments
-- ----------------------------

-- ----------------------------
-- Table structure for `pg_users`
-- ----------------------------
DROP TABLE IF EXISTS `pg_users`;
CREATE TABLE `pg_users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `isTeam` tinyint DEFAULT '0',
  `isAdmin` tinyint(4) unsigned zerofill DEFAULT '0000',
  `coins` bigint DEFAULT '0',
  `last_pos` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleId` int DEFAULT NULL,
  `isMedia` tinyint DEFAULT '0',
  `health` int DEFAULT '100',
  `armour` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_users
-- ----------------------------
INSERT INTO `pg_users` VALUES ('156', 'Mittelblut9', 'Benedikt', 'Moon', '1', '0000', '0', '{\"x\":320.94317626953125,\"y\":-1387.1719970703125,\"z\":31.90981674194336}', '$2a$12$RDDh4DCZzngycXzQJ8pfUOHwhpntcxwT3VaPQvp2DbRFCGrlp0nP6', '10', '0', '100', '0');
INSERT INTO `pg_users` VALUES ('158', 'zKuna-', 'Kevin', 'Moon', '1', '0000', '0', '{\"x\":-1638.6605224609375,\"y\":2705.794921875,\"z\":4.923133850097656}', '$2a$12$C7VKYxekUdaC47dRxUI0k.ePMe.HUVGlZh2fvkq5RQlo1caPJPIl.', '10', '0', '100', '0');
INSERT INTO `pg_users` VALUES ('159', 'Ghoster599', 'David', 'Moon', '1', '0000', '0', '{\"x\":-2094.336181640625,\"y\":-330.8694152832031,\"z\":13.017926216125488}', '$2a$12$B/arSCh1bCEst2pS36HOEeGflig5Pg5FGwbZ3yRDHqG0T6D3H.ms.', '10', '0', '96', '0');
INSERT INTO `pg_users` VALUES ('160', 'Kaldrasz', 'Jonny', 'Moon', '1', '0000', '0', '{\"x\":232.37322998046875,\"y\":-1034.02294921875,\"z\":29.3792724609375}', '$2a$12$/4SmpqUsX7UFzj7LYHmxaO8sc3YVaZa9gXb/6222zah86K7Rsw4pm', '10', '0', '100', '0');

-- ----------------------------
-- Table structure for `pg_vehicles`
-- ----------------------------
DROP TABLE IF EXISTS `pg_vehicles`;
CREATE TABLE `pg_vehicles` (
  `veh_id` int NOT NULL AUTO_INCREMENT,
  `veh_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `veh_owner` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `veh_keys` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `veh_state` tinyint DEFAULT NULL,
  `veh_pos` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '''''',
  `veh_rot` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `veh_prim` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `veh_sec` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `veh_fuel` float DEFAULT '150',
  PRIMARY KEY (`veh_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=973 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_vehicles
-- ----------------------------
INSERT INTO `pg_vehicles` VALUES ('909', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-438.9054260253906,\"y\":-378.3857421875,\"z\":33.71247863769531}', '{\"x\":0,\"y\":0,\"z\":89.29686737060547}', '0', '0', '0');
INSERT INTO `pg_vehicles` VALUES ('910', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-451.78350830078125,\"y\":-647.0376586914062,\"z\":31.24867057800293}', '{\"x\":-3.580669641494751,\"y\":1.2100363969802856,\"z\":-8.845606803894043}', '0', '0', '92.2791');
INSERT INTO `pg_vehicles` VALUES ('911', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-455.0657653808594,\"y\":-650.9041137695312,\"z\":31.475988388061523}', '{\"x\":3.0840015411376953,\"y\":0.993735671043396,\"z\":91.59783172607422}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('912', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-453.85736083984375,\"y\":-647.3095092773438,\"z\":31.279455184936523}', '{\"x\":-4.078774452209473,\"y\":5.785264015197754,\"z\":-9.75728702545166}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('913', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-459.76470947265625,\"y\":-654.3803100585938,\"z\":31.723058700561523}', '{\"x\":-1.5627325773239136,\"y\":0.0546661913394928,\"z\":-90.22970581054688}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('914', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-445.5506591796875,\"y\":-644.0715942382812,\"z\":30.93042755126953}', '{\"x\":1.7319284677505493,\"y\":3.0338587760925293,\"z\":32.929840087890625}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('915', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-456.5390930175781,\"y\":-647.6458740234375,\"z\":31.471935272216797}', '{\"x\":0.8621628880500793,\"y\":-1.9717373847961426,\"z\":148.98097229003906}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('916', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-467.6826171875,\"y\":-648.8024291992188,\"z\":31.760828018188477}', '{\"x\":-2.3959436416625977,\"y\":1.7554033994674683,\"z\":-29.667219161987305}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('917', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-440.7792663574219,\"y\":-645.84423828125,\"z\":30.597444534301758}', '{\"x\":-4.4341912269592285,\"y\":-0.2519400119781494,\"z\":-75.21229553222656}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('918', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-462.8247985839844,\"y\":-642.597412109375,\"z\":31.745140075683594}', '{\"x\":-1.3736815452575684,\"y\":0.4345831274986267,\"z\":-71.99982452392578}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('919', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-459.0251159667969,\"y\":-643.6768798828125,\"z\":31.643356323242188}', '{\"x\":0.23269042372703552,\"y\":-1.6054805517196655,\"z\":172.82760620117188}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('920', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-456.24481201171875,\"y\":-643.370849609375,\"z\":31.512727737426758}', '{\"x\":-1.5958212614059448,\"y\":3.098815441131592,\"z\":-28.43355369567871}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('921', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-446.3970642089844,\"y\":-658.7537231445312,\"z\":31.031953811645508}', '{\"x\":0.543919563293457,\"y\":3.7716660499572754,\"z\":10.92775821685791}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('922', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-450.79327392578125,\"y\":-643.2725219726562,\"z\":31.123863220214844}', '{\"x\":1.1298476457595825,\"y\":4.7828803062438965,\"z\":30.560077667236328}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('923', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-469.084228515625,\"y\":-653.6088256835938,\"z\":31.89736557006836}', '{\"x\":-0.47597312927246094,\"y\":0.9011322259902954,\"z\":-19.141016006469727}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('924', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-446.2437438964844,\"y\":-670.2764282226562,\"z\":30.902040481567383}', '{\"x\":-1.4191604852676392,\"y\":-4.630463123321533,\"z\":-13.489906311035156}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('925', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-450.0076904296875,\"y\":-649.9744873046875,\"z\":31.18305015563965}', '{\"x\":3.3846354484558105,\"y\":-0.981621265411377,\"z\":103.16128540039062}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('926', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-450.2270812988281,\"y\":-636.5662231445312,\"z\":31.064632415771484}', '{\"x\":-0.15223731100559235,\"y\":-1.8091366291046143,\"z\":-175.7946319580078}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('927', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-459.46820068359375,\"y\":-649.1417236328125,\"z\":31.588157653808594}', '{\"x\":-1.5377665758132935,\"y\":2.5855085849761963,\"z\":30.00152587890625}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('928', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-441.9479064941406,\"y\":-658.303466796875,\"z\":30.787918090820312}', '{\"x\":-2.767979860305786,\"y\":1.346367359161377,\"z\":-67.05773162841797}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('929', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-452.7904357910156,\"y\":-643.8219604492188,\"z\":31.52383041381836}', '{\"x\":-7.604320526123047,\"y\":6.659246921539307,\"z\":31.266918182373047}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('930', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-436.749267578125,\"y\":-649.2978515625,\"z\":30.445222854614258}', '{\"x\":3.3891611099243164,\"y\":-0.4771512746810913,\"z\":135.95655822753906}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('931', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-443.51776123046875,\"y\":-640.796630859375,\"z\":30.78533935546875}', '{\"x\":-2.3738362789154053,\"y\":4.170833110809326,\"z\":-30.84916877746582}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('932', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-448.4784851074219,\"y\":-646.218994140625,\"z\":31.361221313476562}', '{\"x\":1.7320524454116821,\"y\":22.134769439697266,\"z\":118.96641540527344}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('933', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-464.5548400878906,\"y\":-651.623291015625,\"z\":31.790658950805664}', '{\"x\":0.7654891014099121,\"y\":-1.5017277002334595,\"z\":-144.7352752685547}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('934', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-446.43499755859375,\"y\":-647.716064453125,\"z\":30.929275512695312}', '{\"x\":1.6835490465164185,\"y\":2.4483675956726074,\"z\":73.38932037353516}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('935', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-437.4420166015625,\"y\":-618.089599609375,\"z\":29.153621673583984}', '{\"x\":5.503578186035156,\"y\":2.5497658252716064,\"z\":-177.34779357910156}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('936', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-441.50274658203125,\"y\":-638.0905151367188,\"z\":30.606050491333008}', '{\"x\":-4.38850736618042,\"y\":-3.2262022495269775,\"z\":-122.53544616699219}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('937', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-448.8389892578125,\"y\":-642.5247802734375,\"z\":31.042821884155273}', '{\"x\":-0.04952259361743927,\"y\":-1.561811923980713,\"z\":-150.77561950683594}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('938', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-437.9576110839844,\"y\":-643.2564086914062,\"z\":30.443117141723633}', '{\"x\":1.3308731317520142,\"y\":-2.2043216228485107,\"z\":24.55226707458496}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('939', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-430.3860778808594,\"y\":-649.6585693359375,\"z\":30.19253158569336}', '{\"x\":1.4479291439056396,\"y\":-3.1089065074920654,\"z\":-154.67759704589844}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('940', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-453.9782409667969,\"y\":-680.97998046875,\"z\":32.15716552734375}', '{\"x\":-0.08172795921564102,\"y\":0.2026418298482895,\"z\":149.87939453125}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('941', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-458.5423278808594,\"y\":-667.4013061523438,\"z\":31.577049255371094}', '{\"x\":1.493700623512268,\"y\":-3.1334965229034424,\"z\":93.712890625}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('942', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-469.71282958984375,\"y\":-673.5825805664062,\"z\":31.874130249023438}', '{\"x\":0.9403024911880493,\"y\":0.6479380130767822,\"z\":63.91392135620117}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('943', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-465.1121826171875,\"y\":-663.1709594726562,\"z\":31.8397274017334}', '{\"x\":-0.42654433846473694,\"y\":0.9332431554794312,\"z\":-46.19430160522461}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('944', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-461.10748291015625,\"y\":-670.2484741210938,\"z\":31.64652442932129}', '{\"x\":-2.323699712753296,\"y\":0.8221980333328247,\"z\":24.663097381591797}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('945', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-461.81915283203125,\"y\":-659.359130859375,\"z\":31.7777099609375}', '{\"x\":0.9621589779853821,\"y\":-0.9401199817657471,\"z\":138.649169921875}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('946', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-461.08697509765625,\"y\":-662.2128295898438,\"z\":31.766427993774414}', '{\"x\":-0.896622896194458,\"y\":1.029805302619934,\"z\":-38.22189712524414}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('947', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-464.245849609375,\"y\":-668.72265625,\"z\":31.72593879699707}', '{\"x\":-0.36748823523521423,\"y\":0.6747784614562988,\"z\":32.046791076660156}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('948', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-457.3897399902344,\"y\":-659.2567138671875,\"z\":31.656217575073242}', '{\"x\":-1.993935465812683,\"y\":0.3102208971977234,\"z\":-79.98825073242188}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('949', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-479.3822021484375,\"y\":-661.5670166015625,\"z\":32.126277923583984}', '{\"x\":-1.1911448240280151,\"y\":-0.2138250768184662,\"z\":-100.51980590820312}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('950', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-471.7493896484375,\"y\":-656.8950805664062,\"z\":31.958072662353516}', '{\"x\":0.67201828956604,\"y\":1.1859890222549438,\"z\":28.90970230102539}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('951', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-479.11614990234375,\"y\":-644.5588989257812,\"z\":32.10561752319336}', '{\"x\":-2.0226187705993652,\"y\":-0.632245659828186,\"z\":-107.81291198730469}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('952', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-462.09381103515625,\"y\":-665.7057495117188,\"z\":31.737548828125}', '{\"x\":0.5015836358070374,\"y\":-2.236090660095215,\"z\":112.78793334960938}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('953', 't20', 'Ghoster599', '[159]', '1', '{\"x\":-1627.0023193359375,\"y\":1250.804443359375,\"z\":140.60012817382812}', '{\"x\":-5.808973789215088,\"y\":1.6596951484680176,\"z\":1.9002065658569336}', '0', '0', '0');
INSERT INTO `pg_vehicles` VALUES ('954', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-1981.5543212890625,\"y\":-433.7987365722656,\"z\":11.275155067443848}', '{\"x\":-4.786989212036133,\"y\":-5.377875328063965,\"z\":60.3541145324707}', '0', '0', '73.5932');
INSERT INTO `pg_vehicles` VALUES ('955', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-459.8905029296875,\"y\":-1871.547119140625,\"z\":17.750041961669922}', '{\"x\":-0.8632722496986389,\"y\":1.7965283393859863,\"z\":124.80836486816406}', '0', '0', '98.1894');
INSERT INTO `pg_vehicles` VALUES ('956', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-382.32470703125,\"y\":-1843.248046875,\"z\":21.158119201660156}', '{\"x\":1.7179404497146606,\"y\":-1.4706577062606812,\"z\":0.008485996164381504}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('957', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":193.18299865722656,\"y\":1869.9810791015625,\"z\":174.94491577148438}', '{\"x\":15.332740783691406,\"y\":36.068668365478516,\"z\":-177.7325439453125}', '0', '0', '0');
INSERT INTO `pg_vehicles` VALUES ('958', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-1927.2523193359375,\"y\":2802.171875,\"z\":32.083805084228516}', '{\"x\":-1.1822055578231812,\"y\":36.40512466430664,\"z\":-111.01187896728516}', '0', '0', '21.9678');
INSERT INTO `pg_vehicles` VALUES ('959', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-2791.3232421875,\"y\":2996.635009765625,\"z\":-1.3063406944274902}', '{\"x\":-23.48259925842285,\"y\":84.28577423095703,\"z\":-177.87734985351562}', '0', '0', '99.2146');
INSERT INTO `pg_vehicles` VALUES ('960', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-2425.235595703125,\"y\":3852.450927734375,\"z\":23.8371524810791}', '{\"x\":0,\"y\":0,\"z\":0}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('961', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-1483.7943115234375,\"y\":-254.26901245117188,\"z\":49.562644958496094}', '{\"x\":0.021321402862668037,\"y\":-2.6990411281585693,\"z\":-0.004209098406136036}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('962', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-2832.95556640625,\"y\":2862.63427734375,\"z\":-4.573894500732422}', '{\"x\":-2.1959004402160645,\"y\":-6.621109485626221,\"z\":97.434814453125}', '0', '0', '0');
INSERT INTO `pg_vehicles` VALUES ('963', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":408.16253662109375,\"y\":-1007.9627075195312,\"z\":28.616744995117188}', '{\"x\":0.14192938804626465,\"y\":-5.708460807800293,\"z\":-0.06650952249765396}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('964', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":316.7777404785156,\"y\":-1355.65625,\"z\":31.494699478149414}', '{\"x\":2.316161632537842,\"y\":-5.7833380699157715,\"z\":-1.0554790496826172}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('965', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-1467.826904296875,\"y\":2221.00537109375,\"z\":32.15346908569336}', '{\"x\":-19.042417526245117,\"y\":-54.99029541015625,\"z\":56.67279815673828}', '0', '0', '0');
INSERT INTO `pg_vehicles` VALUES ('966', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-33.50709915161133,\"y\":-1817.818603515625,\"z\":25.51799201965332}', '{\"x\":4.014383792877197,\"y\":-4.301366806030273,\"z\":106.83102416992188}', '0', '0', '62.5216');
INSERT INTO `pg_vehicles` VALUES ('967', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-445.26885986328125,\"y\":-1774.745361328125,\"z\":19.908370971679688}', '{\"x\":-2.021710157394409,\"y\":-12.695606231689453,\"z\":-19.144502639770508}', '0', '0', '0');
INSERT INTO `pg_vehicles` VALUES ('968', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-461.81402587890625,\"y\":-673.7068481445312,\"z\":31.73843002319336}', '{\"x\":-0.21685750782489777,\"y\":-1.352473258972168,\"z\":-170.40829467773438}', '0', '0', '76.0098');
INSERT INTO `pg_vehicles` VALUES ('969', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":677.0489501953125,\"y\":-858.6924438476562,\"z\":42.571407318115234}', '{\"x\":-1.8691304922103882,\"y\":0.6809780597686768,\"z\":178.7288818359375}', '0', '0', '96.222');
INSERT INTO `pg_vehicles` VALUES ('970', 'zentorno', 'Ghoster599', '[159]', '1', '{\"x\":-355.3067321777344,\"y\":-658.5755004882812,\"z\":31.872812271118164}', '{\"x\":0,\"y\":0,\"z\":0}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('971', 'p1', 'Ghoster599', '[159]', '1', '{\"x\":407.6806945800781,\"y\":-988.8050537109375,\"z\":28.752595901489258}', '{\"x\":-0.9266347289085388,\"y\":-0.03498145565390587,\"z\":50.53358840942383}', '0', '0', '67.2162');
INSERT INTO `pg_vehicles` VALUES ('972', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":398.9919738769531,\"y\":-1027.2591552734375,\"z\":29.48419761657715}', '{\"x\":0,\"y\":0,\"z\":0}', '0', '0', '150');
