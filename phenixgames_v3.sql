/*
Navicat MySQL Data Transfer

Source Server         : PhenixGames
Source Server Version : 80028
Source Host           : 46.105.155.168:3306
Source Database       : phenixgames_v3

Target Server Type    : MYSQL
Target Server Version : 80028
File Encoding         : 65001

Date: 2022-04-09 21:00:19
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
INSERT INTO `pg_users` VALUES ('159', 'Ghoster599', 'David', 'Moon', '1', '0000', '0', '{\"x\":-923.5043334960938,\"y\":-670.5783081054688,\"z\":26.471790313720703}', '$2a$12$B/arSCh1bCEst2pS36HOEeGflig5Pg5FGwbZ3yRDHqG0T6D3H.ms.', '10', '0', '100', '0');
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
) ENGINE=InnoDB AUTO_INCREMENT=962 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of pg_vehicles
-- ----------------------------
INSERT INTO `pg_vehicles` VALUES ('909', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-438.9378662109375,\"y\":-378.43707275390625,\"z\":36.15855407714844}', '{\"x\":0,\"y\":0,\"z\":89.29686737060547}', '0', '0', '0');
INSERT INTO `pg_vehicles` VALUES ('910', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-451.8275451660156,\"y\":-647.0332641601562,\"z\":31.25680923461914}', '{\"x\":-3.512678861618042,\"y\":3.050663709640503,\"z\":-9.03707504272461}', '0', '0', '92.2791');
INSERT INTO `pg_vehicles` VALUES ('911', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-455.1144104003906,\"y\":-650.91162109375,\"z\":31.48012924194336}', '{\"x\":3.0182840824127197,\"y\":0.818755567073822,\"z\":92.09529876708984}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('912', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-453.9071044921875,\"y\":-647.3120727539062,\"z\":31.26820182800293}', '{\"x\":-4.424637794494629,\"y\":6.636711120605469,\"z\":-9.11790657043457}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('913', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-459.7917175292969,\"y\":-654.3798828125,\"z\":31.72480010986328}', '{\"x\":-1.5125102996826172,\"y\":0.061292968690395355,\"z\":-90.24742889404297}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('914', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-445.60162353515625,\"y\":-644.0771484375,\"z\":30.932401657104492}', '{\"x\":1.5090051889419556,\"y\":2.942269802093506,\"z\":32.60689926147461}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('915', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-456.5808410644531,\"y\":-647.6831665039062,\"z\":31.479726791381836}', '{\"x\":0.46058571338653564,\"y\":-1.7298636436462402,\"z\":149.4602508544922}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('916', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-467.711669921875,\"y\":-648.7926025390625,\"z\":31.761268615722656}', '{\"x\":-2.3874151706695557,\"y\":1.8679527044296265,\"z\":-29.467254638671875}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('917', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-440.8402099609375,\"y\":-645.85986328125,\"z\":30.601839065551758}', '{\"x\":-4.416134357452393,\"y\":-0.24421881139278412,\"z\":-75.54737091064453}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('918', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-462.8461608886719,\"y\":-642.597412109375,\"z\":31.745637893676758}', '{\"x\":-1.3695266246795654,\"y\":0.43750670552253723,\"z\":-71.949951171875}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('919', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-459.0500183105469,\"y\":-643.6773071289062,\"z\":31.643972396850586}', '{\"x\":0.23310281336307526,\"y\":-1.606510877609253,\"z\":172.84274291992188}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('920', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-456.2811584472656,\"y\":-643.3895874023438,\"z\":31.518117904663086}', '{\"x\":-1.6018973588943481,\"y\":2.6031394004821777,\"z\":-28.405973434448242}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('921', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-446.4547119140625,\"y\":-658.7567138671875,\"z\":31.037378311157227}', '{\"x\":0.5961467027664185,\"y\":3.7940075397491455,\"z\":10.884456634521484}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('922', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-450.8614807128906,\"y\":-643.3020629882812,\"z\":31.131118774414062}', '{\"x\":1.2681905031204224,\"y\":5.558030605316162,\"z\":31.492399215698242}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('923', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-469.099609375,\"y\":-653.6131591796875,\"z\":31.897592544555664}', '{\"x\":-0.47651100158691406,\"y\":0.9031673073768616,\"z\":-19.22034454345703}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('924', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-446.1446533203125,\"y\":-670.2682495117188,\"z\":30.845382690429688}', '{\"x\":-2.2809488773345947,\"y\":4.27637243270874,\"z\":-11.149768829345703}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('925', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-450.0606384277344,\"y\":-649.9705200195312,\"z\":31.185794830322266}', '{\"x\":3.386011838912964,\"y\":-0.9011166095733643,\"z\":103.36181640625}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('926', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-450.3218994140625,\"y\":-636.5693969726562,\"z\":31.104755401611328}', '{\"x\":-1.6900745630264282,\"y\":-4.62708854675293,\"z\":-174.27276611328125}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('927', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-459.49188232421875,\"y\":-649.1748046875,\"z\":31.592735290527344}', '{\"x\":-1.6136507987976074,\"y\":1.7983951568603516,\"z\":30.051429748535156}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('928', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-441.9950866699219,\"y\":-658.301025390625,\"z\":30.790355682373047}', '{\"x\":-2.7651281356811523,\"y\":1.3559718132019043,\"z\":-66.92781066894531}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('929', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-452.840576171875,\"y\":-643.9039306640625,\"z\":31.5037899017334}', '{\"x\":-6.845808029174805,\"y\":6.831722259521484,\"z\":32.12367248535156}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('930', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-436.7893371582031,\"y\":-649.3283081054688,\"z\":30.448060989379883}', '{\"x\":3.3679561614990234,\"y\":-0.49329641461372375,\"z\":135.9707794189453}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('931', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-443.5875244140625,\"y\":-640.7909545898438,\"z\":30.78856658935547}', '{\"x\":-1.7499866485595703,\"y\":4.24934720993042,\"z\":-30.454452514648438}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('932', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-448.489501953125,\"y\":-646.2869262695312,\"z\":31.387592315673828}', '{\"x\":1.7347856760025024,\"y\":22.73952293395996,\"z\":120.45651245117188}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('933', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-464.5775146484375,\"y\":-651.647216796875,\"z\":31.79194450378418}', '{\"x\":0.7273966073989868,\"y\":-1.4881701469421387,\"z\":-144.20887756347656}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('934', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-446.5679016113281,\"y\":-647.6602172851562,\"z\":30.92782211303711}', '{\"x\":0.9779072403907776,\"y\":3.320688247680664,\"z\":72.90956115722656}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('935', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-437.4201354980469,\"y\":-618.1036987304688,\"z\":29.15505599975586}', '{\"x\":5.5144805908203125,\"y\":2.6032674312591553,\"z\":-177.5686798095703}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('936', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-441.57415771484375,\"y\":-638.1087036132812,\"z\":30.613473892211914}', '{\"x\":-4.385141849517822,\"y\":-5.433839797973633,\"z\":-122.76353454589844}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('937', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-448.853271484375,\"y\":-642.55322265625,\"z\":31.046375274658203}', '{\"x\":0.0288223996758461,\"y\":-0.42765507102012634,\"z\":-151.20098876953125}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('938', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-437.9748229980469,\"y\":-643.2335205078125,\"z\":30.443628311157227}', '{\"x\":1.3301191329956055,\"y\":-2.075378894805908,\"z\":24.60821533203125}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('939', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-430.4219055175781,\"y\":-649.6923217773438,\"z\":30.19525909423828}', '{\"x\":1.4089988470077515,\"y\":-3.1134235858917236,\"z\":-154.32398986816406}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('940', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-453.9736633300781,\"y\":-680.9806518554688,\"z\":32.16133499145508}', '{\"x\":-0.10809222608804703,\"y\":0.6219421029090881,\"z\":149.88771057128906}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('941', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-458.57244873046875,\"y\":-667.35546875,\"z\":31.580251693725586}', '{\"x\":1.471950650215149,\"y\":-3.142699956893921,\"z\":93.90650939941406}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('942', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-469.7310485839844,\"y\":-673.5823364257812,\"z\":31.874391555786133}', '{\"x\":0.9455577731132507,\"y\":0.6477407813072205,\"z\":63.942893981933594}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('943', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-465.124267578125,\"y\":-663.16748046875,\"z\":31.839792251586914}', '{\"x\":-0.4295826256275177,\"y\":0.9259838461875916,\"z\":-46.33880615234375}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('944', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-461.15130615234375,\"y\":-670.202392578125,\"z\":31.64909553527832}', '{\"x\":-2.263042449951172,\"y\":2.1399407386779785,\"z\":24.740554809570312}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('945', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-461.8384704589844,\"y\":-659.3609008789062,\"z\":31.777997970581055}', '{\"x\":0.959658682346344,\"y\":-0.9370666742324829,\"z\":138.7374267578125}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('946', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-461.10687255859375,\"y\":-662.2107543945312,\"z\":31.77096176147461}', '{\"x\":-1.2744990587234497,\"y\":-0.3312039375305176,\"z\":-38.265846252441406}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('947', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-464.23809814453125,\"y\":-668.6913452148438,\"z\":31.73334503173828}', '{\"x\":-0.5441280603408813,\"y\":-0.868200957775116,\"z\":31.289657592773438}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('948', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-457.4205017089844,\"y\":-659.2584838867188,\"z\":31.657588958740234}', '{\"x\":-1.9903385639190674,\"y\":0.32364022731781006,\"z\":-79.9379653930664}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('949', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-479.4007873535156,\"y\":-661.5667724609375,\"z\":32.12662124633789}', '{\"x\":-1.1911954879760742,\"y\":-0.2147766351699829,\"z\":-100.52910614013672}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('950', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-471.7703552246094,\"y\":-656.8948364257812,\"z\":31.958459854125977}', '{\"x\":0.6705584526062012,\"y\":1.1843793392181396,\"z\":28.87735939025879}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('951', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-479.1502380371094,\"y\":-644.5576782226562,\"z\":32.106903076171875}', '{\"x\":-2.025235891342163,\"y\":-0.6357447504997253,\"z\":-107.85917663574219}', '0', '0', '100');
INSERT INTO `pg_vehicles` VALUES ('952', 'jugular', 'Ghoster599', '[159]', '1', '{\"x\":-462.1148681640625,\"y\":-665.6754760742188,\"z\":31.7371768951416}', '{\"x\":0.811918318271637,\"y\":-3.49765944480896,\"z\":112.698486328125}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('953', 't20', 'Ghoster599', '[159]', '1', '{\"x\":270.38726806640625,\"y\":-1295.0869140625,\"z\":28.90151023864746}', '{\"x\":-1.9386037588119507,\"y\":-1.1404035091400146,\"z\":0.3216088116168976}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('954', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-1981.5303955078125,\"y\":-433.7957763671875,\"z\":11.28169059753418}', '{\"x\":-4.624162673950195,\"y\":-4.578013896942139,\"z\":59.86519241333008}', '0', '0', '73.5932');
INSERT INTO `pg_vehicles` VALUES ('955', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-459.8766174316406,\"y\":-1871.5556640625,\"z\":17.75140380859375}', '{\"x\":-0.8876916766166687,\"y\":1.8077763319015503,\"z\":124.6100845336914}', '0', '0', '98.1894');
INSERT INTO `pg_vehicles` VALUES ('956', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-382.3145751953125,\"y\":-1843.2393798828125,\"z\":21.671436309814453}', '{\"x\":0,\"y\":0,\"z\":0}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('957', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":193.18299865722656,\"y\":1869.9810791015625,\"z\":174.94491577148438}', '{\"x\":15.332740783691406,\"y\":36.068668365478516,\"z\":-177.7325439453125}', '0', '0', '0');
INSERT INTO `pg_vehicles` VALUES ('958', 'p1', 'Mittelblut9', '[156]', '1', '{\"x\":-1927.2523193359375,\"y\":2802.171875,\"z\":32.083805084228516}', '{\"x\":-1.1822055578231812,\"y\":36.40512466430664,\"z\":-111.01187896728516}', '0', '0', '21.9678');
INSERT INTO `pg_vehicles` VALUES ('959', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-2791.3232421875,\"y\":2996.635009765625,\"z\":-1.3063406944274902}', '{\"x\":-23.48259925842285,\"y\":84.28577423095703,\"z\":-177.87734985351562}', '0', '0', '99.2146');
INSERT INTO `pg_vehicles` VALUES ('960', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-2425.235595703125,\"y\":3852.450927734375,\"z\":23.8371524810791}', '{\"x\":0,\"y\":0,\"z\":0}', '0', '0', '150');
INSERT INTO `pg_vehicles` VALUES ('961', 'bati', 'Ghoster599', '[159]', '1', '{\"x\":-1483.7591552734375,\"y\":-254.26698303222656,\"z\":50.21480941772461}', null, '0', '0', '150');
