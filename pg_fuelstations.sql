/*
Navicat MySQL Data Transfer

Source Server         : PhenixGames
Source Server Version : 80029
Source Host           : 45.145.224.15:3306
Source Database       : phenixgames_v3_dev

Target Server Type    : MYSQL
Target Server Version : 80029
File Encoding         : 65001

Date: 2022-06-24 12:29:29
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
  `name` varchar(255) DEFAULT 'Name Not Set',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of pg_fuelstations
-- ----------------------------
INSERT INTO `pg_fuelstations` VALUES ('1', '2', '1500', '1', '1', '1', '0', '0.5', '-2096.231689453125, -320.1805114746094, 12.16186809539795', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('2', '2', '1500', '1', '1', '1', '0', '0.5', '-1437.87451171875, -276.6646423339844, 45.20764923095703', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('3', '2', '1500', '1', '1', '1', '0', '0.5', '265.10870361328125, -1259.649658203125, 28.142915725708', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('4', '2', '1500', '1', '1', '1', '0', '0.5', '-70.5535888671875, -1761.115478515625, 28.5340366363525', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('5', '2', '1500', '1', '1', '1', '0', '0.5', '819.5802612304688, -1028.227783203125, 25.40379524230957', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('6', '2', '1500', '1', '1', '1', '0', '0.5', '1208.087646484375, -1402.546630859375, 34.22418975830078', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('7', '2', '1500', '1', '1', '1', '0', '0.5', '1181.0179443359375, -330.87725830078125, 68.31642150878906', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('8', '2', '1500', '1', '1', '1', '0', '0.5', '620.7024536132812, 268.8438415527344, 102.0894775390625', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('9', '2', '1500', '1', '1', '1', '0', '0.5', '-723.3829956054688, -935.1769409179688, 18.213932037353516', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('10', '2', '1500', '1', '1', '1', '0', '0.5', '-2555.127197265625, 2334.345458984375, 32.078041076660156', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('11', '2', '1500', '1', '1', '1', '0', '0.5', '-92.83749389648438, 6417.72802734375, 30.48018455505371', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('12', '2', '1500', '1', '1', '1', '0', '0.5', '179.82217407226562, 6602.79345703125, 30.8681697845459', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('13', '2', '1500', '1', '1', '1', '0', '0.5', '1702.66064453125, 6420.0625, 31.637767791748047', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('14', '2', '1500', '1', '1', '1', '0', '0.5', '2004.308349609375, 3776.0361328125, 31.180767059326172', 'Name Not SET');
INSERT INTO `pg_fuelstations` VALUES ('15', '2', '1500', '1', '1', '1', '0', '0.5', '-1799.5919189453125, 802.6926879882812, 137.65121459960938', 'Name Not SET');
