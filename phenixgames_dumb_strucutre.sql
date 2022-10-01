-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: phenixgames-v3
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pg_fuelstations`
--

DROP TABLE IF EXISTS `pg_fuelstations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_fuelstations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) DEFAULT 2,
  `fuel_stored` float DEFAULT 1500,
  `fuel_buy_price` int(11) DEFAULT 1,
  `fuel_sell_price_b` int(11) DEFAULT 1,
  `fuel_sell_price_d` int(11) DEFAULT 1,
  `business_owner_id` int(11) DEFAULT 0 COMMENT '0 = Staat',
  `business_profit_mp` float DEFAULT 0.5,
  `pos` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT 'Name Not Set',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_fuelstations_marker`
--

DROP TABLE IF EXISTS `pg_fuelstations_marker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_fuelstations_marker` (
  `marker_id` int(11) NOT NULL AUTO_INCREMENT,
  `fuelstation_id` int(11) DEFAULT NULL,
  `pos` varchar(255) DEFAULT NULL,
  `size` float DEFAULT 5,
  PRIMARY KEY (`marker_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_houses`
--

DROP TABLE IF EXISTS `pg_houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_houses` (
  `house_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `player_id` bigint(20) NOT NULL,
  `house_pos` varchar(255) NOT NULL DEFAULT '''''',
  PRIMARY KEY (`house_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_inventory`
--

DROP TABLE IF EXISTS `pg_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_inventory` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) DEFAULT NULL,
  `item_amount` int(11) DEFAULT 1,
  `item_user_id` bigint(20) DEFAULT NULL,
  `item_slot` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_item_config`
--

DROP TABLE IF EXISTS `pg_item_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_item_config` (
  `item_id` bigint(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT '',
  `isStackable` tinyint(4) DEFAULT NULL,
  `maxCount` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_marker`
--

DROP TABLE IF EXISTS `pg_marker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_marker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marker_pos` varchar(255) NOT NULL DEFAULT '',
  `marker_rot` varchar(255) DEFAULT NULL,
  `marker_dir` varchar(255) DEFAULT NULL,
  `marker_color` varchar(255) DEFAULT NULL,
  `marker_visible` tinyint(4) DEFAULT NULL,
  `marker_dim` bigint(20) DEFAULT NULL,
  `marker_type` int(11) NOT NULL,
  `marker_scale` int(11) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_money`
--

DROP TABLE IF EXISTS `pg_money`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_money` (
  `playerid` bigint(20) DEFAULT NULL,
  `hand_money` varchar(255) DEFAULT '',
  `bank_pin` int(11) DEFAULT NULL,
  `bank_money` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_permission_list`
--

DROP TABLE IF EXISTS `pg_permission_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_permission_list` (
  `roleid` int(11) DEFAULT NULL,
  `root` tinyint(4) NOT NULL DEFAULT 0,
  `manage_rang` tinyint(4) NOT NULL DEFAULT 0,
  `manage_team` tinyint(4) NOT NULL DEFAULT 0,
  `manager_member_ext` tinyint(4) NOT NULL DEFAULT 0,
  `ban_member` tinyint(4) NOT NULL DEFAULT 0,
  `admin_menu` tinyint(4) NOT NULL DEFAULT 0,
  `manage_member` tinyint(4) NOT NULL DEFAULT 0,
  `godmode` tinyint(4) NOT NULL DEFAULT 0,
  `mute_member` tinyint(4) NOT NULL DEFAULT 0,
  `kick_member` tinyint(4) NOT NULL DEFAULT 0,
  `spawn_weapon` tinyint(4) NOT NULL DEFAULT 0,
  `tp_to` tinyint(4) NOT NULL DEFAULT 0,
  `car_spawn` tinyint(4) NOT NULL DEFAULT 0,
  `no_clip` tinyint(4) NOT NULL DEFAULT 0,
  `own_prefix` tinyint(4) NOT NULL DEFAULT 0,
  `isTeam` tinyint(4) NOT NULL DEFAULT 0,
  `tp` tinyint(4) NOT NULL DEFAULT 0,
  `heal` tinyint(4) DEFAULT 0,
  `revive` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`tp`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_permission_roles`
--

DROP TABLE IF EXISTS `pg_permission_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_permission_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(255) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_punishments`
--

DROP TABLE IF EXISTS `pg_punishments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_punishments` (
  `id` bigint(20) NOT NULL,
  `banned` tinyint(4) NOT NULL DEFAULT 0,
  `muted` tinyint(4) NOT NULL DEFAULT 0,
  `till_date` varchar(255) NOT NULL,
  `admin` varchar(20) NOT NULL,
  `punishment_id` bigint(20) DEFAULT NULL,
  `reason` longtext DEFAULT NULL,
  `date_of_punishment` varchar(255) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_user_inventory`
--

DROP TABLE IF EXISTS `pg_user_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_user_inventory` (
  `id` int(11) NOT NULL,
  `items` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_users`
--

DROP TABLE IF EXISTS `pg_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT '',
  `lastname` varchar(255) DEFAULT '',
  `isTeam` tinyint(4) DEFAULT 0,
  `isAdmin` tinyint(4) unsigned zerofill DEFAULT 0000,
  `coins` bigint(20) DEFAULT 0,
  `last_pos` varchar(255) DEFAULT '',
  `password` varchar(255) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `isMedia` tinyint(4) DEFAULT 0,
  `health` int(11) DEFAULT 100,
  `armour` int(11) DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_vehicles`
--

DROP TABLE IF EXISTS `pg_vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_vehicles` (
  `veh_id` int(11) NOT NULL AUTO_INCREMENT,
  `veh_name` varchar(255) DEFAULT NULL,
  `veh_owner` varchar(20) DEFAULT '',
  `veh_keys` longtext DEFAULT NULL,
  `veh_state` tinyint(4) DEFAULT NULL,
  `veh_pos` varchar(255) DEFAULT '''''',
  `veh_rot` varchar(255) DEFAULT NULL,
  `veh_prim` varchar(255) DEFAULT '0',
  `veh_sec` varchar(255) DEFAULT '0',
  `veh_fuel` float DEFAULT 150,
  PRIMARY KEY (`veh_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=992 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-01 17:06:53
