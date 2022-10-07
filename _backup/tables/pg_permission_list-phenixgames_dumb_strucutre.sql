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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-02 11:58:19
