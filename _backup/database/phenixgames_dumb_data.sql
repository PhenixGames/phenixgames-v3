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
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `pg_fuelstations`
--

LOCK TABLES `pg_fuelstations` WRITE;
/*!40000 ALTER TABLE `pg_fuelstations` DISABLE KEYS */;
INSERT INTO `pg_fuelstations` VALUES (1,2,1500,1,1,1,0,1.5,'-2096.231689453125, -320.1805114746094, 12.16186809539795','Name Not SET'),(2,2,1500,1,1,1,0,1.5,'-1437.87451171875, -276.6646423339844, 45.20764923095703','Name Not SET'),(3,2,1500,1,1,1,0,1.5,'265.10870361328125, -1259.649658203125, 28.142915725708','Name Not SET'),(4,2,1500,1,1,1,0,1.5,'-70.5535888671875, -1761.115478515625, 28.5340366363525','Name Not SET'),(5,2,1500,1,1,1,0,1.5,'819.5802612304688, -1028.227783203125, 25.40379524230957','Name Not SET'),(6,2,1500,1,1,1,0,1.5,'1208.087646484375, -1402.546630859375, 34.22418975830078','Name Not SET'),(7,2,1500,1,1,1,0,1.5,'1181.0179443359375, -330.87725830078125, 68.31642150878906','Name Not SET'),(8,2,1500,1,1,1,0,1.5,'620.7024536132812, 268.8438415527344, 102.0894775390625','Name Not SET'),(9,2,1500,1,1,1,0,1.5,'-723.3829956054688, -935.1769409179688, 18.213932037353516','Name Not SET'),(10,2,1500,1,1,1,0,1.5,'-2555.127197265625, 2334.345458984375, 32.078041076660156','Name Not SET'),(11,2,1500,1,1,1,0,1.5,'-92.83749389648438, 6417.72802734375, 30.48018455505371','Name Not SET'),(12,2,1500,1,1,1,0,1.5,'179.82217407226562, 6602.79345703125, 30.8681697845459','Name Not SET'),(13,2,1500,1,1,1,0,1.5,'1702.66064453125, 6420.0625, 31.637767791748047','Name Not SET'),(14,2,1500,1,1,1,0,1.5,'2004.308349609375, 3776.0361328125, 31.180767059326172','Name Not SET'),(15,2,1500,1,1,1,0,1.5,'-1799.5919189453125, 802.6926879882812, 137.65121459960938','Name Not SET');
/*!40000 ALTER TABLE `pg_fuelstations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_fuelstations_marker`
--

LOCK TABLES `pg_fuelstations_marker` WRITE;
/*!40000 ALTER TABLE `pg_fuelstations_marker` DISABLE KEYS */;
INSERT INTO `pg_fuelstations_marker` VALUES (1,1,'-2088.719482421875, -327.52532958984375, 12.1',5),(2,1,' -2087.860107421875, -321.11541748046875, 12.1',5),(3,1,'-2087.17529296875, -312.86273193359375, 12.1',5),(4,1,' -2095.85205078125, -312.02020263671875, 12.1',5),(5,1,'-2096.8662109375, -320.28997802734375, 12.1',5),(6,1,' -2097.326416015625, -326.56317138671875, 12.1',5),(7,1,'-2105.908203125, -325.7210693359375, 12.1',5),(8,1,'-2105.2109375, -319.3222351074219, 12.1',5),(9,1,'-2104.612060546875, -311.1736755371094, 12.1',5),(10,2,'-1435.48388671875, -284.8983459472656, 45.4',5),(11,2,'-1429.3233642578125, -279.15826416015625, 45.4',5),(12,2,'-1438.031494140625, -268.7479248046875, 45.4',5),(13,2,'-1444.1319580078125, -274.4800109863281, 45.4',5),(14,3,'257.019287109375, -1253.5419921875, 28.2878475189209',5),(15,3,'257.0165100097656, -1261.2974853515625, 28.292953491210',5),(16,3,'257.0194396972656, -1268.6412353515625, 28.291019439697',5),(17,3,'264.4770202636719, -1268.1856689453125, 28.285774230957',5),(18,3,'265.6485290527344, -1261.325439453125, 28.2929477691650',5),(19,3,'265.6486511230469, -1253.809814453125, 28.2929325103759',5),(20,3,'274.4381103515625, -1253.61328125, 28.292945861816406',5),(21,3,'274.4244689941406, -1261.3138427734375, 28.292943954467',5),(22,3,'274.4245300292969, -1268.848388671875, 28.2919731140136',5),(23,4,'-61.54207992553711, -1760.5301513671875, 28.25951004028',5),(24,4,'-64.13148498535156, -1767.6470947265625, 28.25738716125',5),(25,4,'-71.7453384399414, -1765.93896484375, 28.52115821838379',5),(26,4,'-68.89092254638672, -1758.1839599609375, 28.53406333923',5),(27,4,'-76.63903045654297, -1755.0579833984375, 28.80983734130',5),(28,4,'-79.62542724609375, -1762.3548583984375, 28.79469871520',5),(29,5,'826.650146484375, -1026.0987548828125, 25.60308074951172',5),(30,5,'826.7279663085938, -1030.8363037109375, 25.60822105407715',5),(31,5,'819.5718994140625, -1031.41064453125, 25.404321670532227',5),(32,5,'818.4002075195312, -1025.9676513671875, 25.40343475341797',5),(33,5,'811.4053955078125, -1026.15478515625, 25.41167640686035',5),(34,5,'811.2819213867188, -1030.974609375, 25.400480270385742',5),(35,6,'1207.4771728515625, -1398.58056640625, 34.37740707397461',5),(36,6,'1204.5802001953125, -1401.4771728515625, 34.385520935058594',5),(37,6,'1209.6473388671875, -1406.4918212890625, 34.38521957397461',5),(38,6,'1212.520751953125, -1403.6181640625, 34.37619400024414',5),(39,7,'1178.6962890625, -338.9515380859375, 68.36003875732422',5),(40,7,'1186.252685546875, -337.69842529296875, 68.35582733154297',5),(41,7,'1184.8883056640625, -330.32818603515625, 68.26081085205078',5),(42,7,'1177.5660400390625, -331.5906066894531, 68.31694793701172',5),(43,7,'1175.7884521484375, -322.88568115234375, 68.34132385253906',5),(44,7,'1183.2469482421875, -321.6408996582031, 68.35301208496094',5),(45,8,'629.048583984375, 263.98028564453125, 102.2616195678711',5),(46,8,'629.0447998046875, 273.9710388183594, 102.25389862060547',5),(47,8,'621.5701904296875, 273.567626953125, 102.22160339355469',5),(48,8,'621.5761108398438, 263.81463623046875, 102.20919799804688',5),(49,8,'613.013427734375, 263.7915344238281, 102.13687133789062',5),(50,8,'613.0068359375, 273.9511413574219, 102.2669448852539',5),(51,9,'-715.9319458007812, -939.384765625, 18.209949493408203',5),(52,9,'-716.0150146484375, -932.4348754882812, 18.21392822265625',5),(53,9,'-723.4224853515625, -932.5189208984375, 18.208057403564453',5),(54,9,'-723.4212646484375, -939.456787109375, 18.203495025634766',5),(55,9,'-731.907958984375, -939.1605834960938, 18.171321868896484',5),(56,9,'-732.0656127929688, -932.6857299804688, 18.21395492553711',5),(57,10,'-2552.44580078125, 2333.77001953125, 32.244449615478516',5),(58,10,'-2558.483154296875, 2333.60595703125, 32.256675720214844',5),(59,10,'-2558.53076171875, 2340.75927734375, 32.232627868652344',5),(60,10,'-2552.156982421875, 2341.168212890625, 32.25579833984375',5),(61,10,'-2551.2236328125, 2327.94140625, 32.150394439697266',5),(62,10,'-2558.0576171875, 2327.289306640625, 32.25434112548828',5),(63,11,'-90.6957015991211, 6422.0595703125, 30.63750648498535',5),(64,11,'-96.4642333984375, 6416.2958984375, 30.6395206451416',5),(65,13,'1697.453857421875, 6417.81201171875, 31.764034271240234',5),(66,13,'1701.4764404296875, 6415.95166015625, 31.755958557128906',5),(67,13,'1705.38134765625, 6414.11962890625, 31.762042999267578',5),(68,12,'172.93472290039062, 6603.58154296875, 31.047393798828125',5),(69,12,'179.0832061767578, 6604.90966796875, 31.041072845458984',5),(70,12,'186.39474487304688, 6606.11083984375, 31.047401428222656',5),(71,14,'2009.7064208984375, 3776.16162109375, 31.403934478759766',5),(72,14,'2006.519287109375, 3774.357177734375, 31.403949737548828',5),(73,14,'2004.2933349609375, 3772.820068359375, 31.403949737548828',5),(74,14,'2001.8160400390625, 3771.420166015625, 31.403942108154297',5),(75,15,'-1796.6671142578125, 800.8064575195312, 137.6512451171875',5),(76,15,'-1801.93896484375, 806.787841796875, 137.64878845214844',5),(77,15,'-1796.377685546875, 811.57958984375, 137.6680450439453',5),(78,15,'-1791.2464599609375, 805.934326171875, 137.68492126464844',5),(79,15,'-1802.96875, 794.5437622070312, 137.6739044189453',5),(80,15,'-1808.2857666015625, 800.3460083007812, 137.67874145507812',5);
/*!40000 ALTER TABLE `pg_fuelstations_marker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_houses`
--

LOCK TABLES `pg_houses` WRITE;
/*!40000 ALTER TABLE `pg_houses` DISABLE KEYS */;
INSERT INTO `pg_houses` VALUES (102,103,'261.4586, -998.8196, -99.00863'),(103,104,'261.4586, -998.8196, -99.00863'),(104,105,'261.4586, -998.8196, -99.00863');
/*!40000 ALTER TABLE `pg_houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_inventory`
--

LOCK TABLES `pg_inventory` WRITE;
/*!40000 ALTER TABLE `pg_inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `pg_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_item_config`
--

LOCK TABLES `pg_item_config` WRITE;
/*!40000 ALTER TABLE `pg_item_config` DISABLE KEYS */;
INSERT INTO `pg_item_config` VALUES (12,'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',0,10),(7,'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',0,20),(4,'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',0,0);
/*!40000 ALTER TABLE `pg_item_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_marker`
--

LOCK TABLES `pg_marker` WRITE;
/*!40000 ALTER TABLE `pg_marker` DISABLE KEYS */;
INSERT INTO `pg_marker` VALUES (1,'265.9962158203125, -1007.3060302734375, -102.00233892822266',NULL,NULL,NULL,1,NULL,27,1);
/*!40000 ALTER TABLE `pg_marker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_money`
--

LOCK TABLES `pg_money` WRITE;
/*!40000 ALTER TABLE `pg_money` DISABLE KEYS */;
INSERT INTO `pg_money` VALUES (162,'1500',NULL,'3000'),(163,'1500',NULL,'3000'),(164,'1500',NULL,'3000'),(165,'1500',NULL,'3000'),(166,'1500',NULL,'3000'),(167,'1500',NULL,'3000'),(168,'1500',NULL,'3000'),(169,'1500',NULL,'3000'),(170,'1500',NULL,'3000'),(171,'1500',NULL,'3000'),(172,'1500',NULL,'3000'),(173,'1500',NULL,'3000'),(174,'1500',NULL,'3000'),(175,'1500',NULL,'3000'),(176,'1500',NULL,'3000'),(177,'1500',NULL,'3000');
/*!40000 ALTER TABLE `pg_money` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_permission_list`
--

LOCK TABLES `pg_permission_list` WRITE;
/*!40000 ALTER TABLE `pg_permission_list` DISABLE KEYS */;
INSERT INTO `pg_permission_list` VALUES (9,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1),(10,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `pg_permission_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_permission_roles`
--

LOCK TABLES `pg_permission_roles` WRITE;
/*!40000 ALTER TABLE `pg_permission_roles` DISABLE KEYS */;
INSERT INTO `pg_permission_roles` VALUES (1,'Projekt Leitung',10),(5,'Administration',9),(6,'Support',8),(7,'Entwicklung',7),(8,'Content',6),(9,'Designer',5),(10,'Mapper',4),(11,'Default',0);
/*!40000 ALTER TABLE `pg_permission_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_punishments`
--

LOCK TABLES `pg_punishments` WRITE;
/*!40000 ALTER TABLE `pg_punishments` DISABLE KEYS */;
/*!40000 ALTER TABLE `pg_punishments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_user_inventory`
--

LOCK TABLES `pg_user_inventory` WRITE;
/*!40000 ALTER TABLE `pg_user_inventory` DISABLE KEYS */;
INSERT INTO `pg_user_inventory` VALUES (165,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(166,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(167,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(168,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(169,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(170,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(171,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(172,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(173,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(174,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(175,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(176,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"'),(177,'\"[{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":true,\\\"isStackable\\\":true},{\\\"invPos\\\":1,\\\"img\\\":\\\"https://cdn-icons-png.flaticon.com/32/3075/3075977.png\\\",\\\"count\\\":1,\\\"isTop\\\":false,\\\"isStackable\\\":false}]\"');
/*!40000 ALTER TABLE `pg_user_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_users`
--

LOCK TABLES `pg_users` WRITE;
/*!40000 ALTER TABLE `pg_users` DISABLE KEYS */;
INSERT INTO `pg_users` VALUES (158,'zKuna-','Kevin','Moon',1,0000,0,'{\"x\":-1638.6605224609375,\"y\":2705.794921875,\"z\":4.923133850097656}','$2a$12$C7VKYxekUdaC47dRxUI0k.ePMe.HUVGlZh2fvkq5RQlo1caPJPIl.',10,0,100,0),(159,'Ghoster599','David','Moon',1,0000,0,'{\"x\":-173.57411193847656,\"y\":6445.30126953125,\"z\":31.511274337768555}','$2a$12$B/arSCh1bCEst2pS36HOEeGflig5Pg5FGwbZ3yRDHqG0T6D3H.ms.',10,0,100,0),(160,'Kaldrasz','Jonny','Moon',1,0000,0,'{\"x\":232.37322998046875,\"y\":-1034.02294921875,\"z\":29.3792724609375}','$2a$12$/4SmpqUsX7UFzj7LYHmxaO8sc3YVaZa9gXb/6222zah86K7Rsw4pm',10,0,100,0),(177,'Mittelblut9','Benn','Moon',1,0000,0,'{\"x\":784.3729858398438,\"y\":-729.5731201171875,\"z\":27.313310623168945}','$2a$12$lDY0nDv6o6IXommnEdlOCuhqIsbHgiQSTmzAxKUwjJEVyyT0u0RRy',10,0,100,0);
/*!40000 ALTER TABLE `pg_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_vehicles`
--

LOCK TABLES `pg_vehicles` WRITE;
/*!40000 ALTER TABLE `pg_vehicles` DISABLE KEYS */;
INSERT INTO `pg_vehicles` VALUES (1010,'p1','Mittelblut9','[177]',1,'{\"x\":784.3729858398438,\"y\":-729.5731201171875,\"z\":27.313310623168945}','-38.62086486816406','0','0',98.4096);
/*!40000 ALTER TABLE `pg_vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-02 11:58:47
