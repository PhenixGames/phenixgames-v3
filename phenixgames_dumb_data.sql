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
INSERT INTO `pg_permission_roles` VALUES (1,'Projekt Leitung',10),(5,'Administration',9),(6,'Support',8),(7,'Entwicklung',7),(8,'Content',6),(9,'Designer',5),(10,'Mapper',4);
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
INSERT INTO `pg_users` VALUES (158,'zKuna-','Kevin','Moon',1,0000,0,'{\"x\":-1638.6605224609375,\"y\":2705.794921875,\"z\":4.923133850097656}','$2a$12$C7VKYxekUdaC47dRxUI0k.ePMe.HUVGlZh2fvkq5RQlo1caPJPIl.',10,0,100,0),(159,'Ghoster599','David','Moon',1,0000,0,'{\"x\":-173.57411193847656,\"y\":6445.30126953125,\"z\":31.511274337768555}','$2a$12$B/arSCh1bCEst2pS36HOEeGflig5Pg5FGwbZ3yRDHqG0T6D3H.ms.',10,0,100,0),(160,'Kaldrasz','Jonny','Moon',1,0000,0,'{\"x\":232.37322998046875,\"y\":-1034.02294921875,\"z\":29.3792724609375}','$2a$12$/4SmpqUsX7UFzj7LYHmxaO8sc3YVaZa9gXb/6222zah86K7Rsw4pm',10,0,100,0),(177,'Mittelblut9','Benn','Moon',0,0000,0,'{\"x\":-921.9234008789062,\"y\":-2571.40234375,\"z\":13.980802536010742}','$2a$12$lDY0nDv6o6IXommnEdlOCuhqIsbHgiQSTmzAxKUwjJEVyyT0u0RRy',NULL,0,100,0);
/*!40000 ALTER TABLE `pg_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pg_vehicles`
--

LOCK TABLES `pg_vehicles` WRITE;
/*!40000 ALTER TABLE `pg_vehicles` DISABLE KEYS */;
INSERT INTO `pg_vehicles` VALUES (909,'p1','Mittelblut9','[156]',1,'{\"x\":-1978.1856689453125,\"y\":4807.13134765625,\"z\":-0.9483444094657898}','{\"x\":-5.875162124633789,\"y\":2.0966224670410156,\"z\":116.711181640625}','0','0',82.3333),(910,'p1','Mittelblut9','[156]',1,'{\"x\":-1408.392333984375,\"y\":4185.08154296875,\"z\":48.668235778808594}','{\"x\":2.7521321773529053,\"y\":-7.538638114929199,\"z\":-120.33944702148438}','0','0',96.2589),(911,'jugular','Ghoster599','[159]',1,'{\"x\":-2329.36767578125,\"y\":4053.162841796875,\"z\":30.57196807861328}','{\"x\":6.807161808013916,\"y\":-0.5291873216629028,\"z\":-33.3392448425293}','0','0',0),(912,'jugular','Ghoster599','[159]',1,'{\"x\":-2475.20654296875,\"y\":4071.033203125,\"z\":8.25411319732666}','{\"x\":9.137240409851074,\"y\":5.184337615966797,\"z\":-104.93571472167969}','0','0',0),(913,'jugular','Ghoster599','[159]',1,'{\"x\":-2938.454345703125,\"y\":2134.92822265625,\"z\":40.14534378051758}','{\"x\":-0.8018243312835693,\"y\":-2.1909070014953613,\"z\":-127.25627899169922}','0','0',0),(914,'jugular','Ghoster599','[159]',1,'{\"x\":-2999.972412109375,\"y\":1497.900146484375,\"z\":27.336469650268555}','{\"x\":-0.31850865483283997,\"y\":0.1041746586561203,\"z\":156.79458618164062}','0','0',0),(915,'jugular','Ghoster599','[159]',1,'{\"x\":-1470.52197265625,\"y\":-760.6005249023438,\"z\":10.51943588256836}','{\"x\":-1.9109355211257935,\"y\":-0.05266174301505089,\"z\":-170.51040649414062}','0','0',92.0359),(916,'jugular','Ghoster599','[159]',1,'{\"x\":-1460.785888671875,\"y\":-762.9520263671875,\"z\":10.512296676635742}','{\"x\":-0.3514964282512665,\"y\":-8.050270080566406,\"z\":-97.08840942382812}','0','0',76.2986),(917,'jugular','Ghoster599','[159]',1,'{\"x\":-1307.499755859375,\"y\":-717.4166870117188,\"z\":10.449965476989746}','{\"x\":-0.5897875428199768,\"y\":1.710426926612854,\"z\":101.59929656982422}','0','0',70.2482),(918,'jugular','Ghoster599','[159]',1,'{\"x\":-853.5575561523438,\"y\":-514.5194702148438,\"z\":22.579891204833984}','{\"x\":1.7920647859573364,\"y\":-2.237665891647339,\"z\":-26.041744232177734}','0','0',76.4987),(919,'jugular','Ghoster599','[159]',1,'{\"x\":-1449.4085693359375,\"y\":-760.6846313476562,\"z\":10.439627647399902}','{\"x\":-0.47707080841064453,\"y\":-2.00180721282959,\"z\":108.60807037353516}','0','0',0),(920,'jugular','Ghoster599','[159]',1,'{\"x\":-1572.197509765625,\"y\":-751.4264526367188,\"z\":10.69199275970459}','{\"x\":-1.6239755153656006,\"y\":-2.296830415725708,\"z\":-80.92420196533203}','0','0',0),(921,'jugular','Ghoster599','[159]',1,'{\"x\":-1317.3341064453125,\"y\":-734.6661987304688,\"z\":10.430283546447754}','{\"x\":0.6384894847869873,\"y\":-1.5682847499847412,\"z\":-0.12585100531578064}','0','0',150),(922,'jugular','Ghoster599','[159]',1,'{\"x\":-1080.6710205078125,\"y\":-610.6168823242188,\"z\":16.23727798461914}','{\"x\":4.019261360168457,\"y\":-1.8892507553100586,\"z\":-20.367549896240234}','0','0',88.332),(923,'jugular','Ghoster599','[159]',1,'{\"x\":-555.1842041015625,\"y\":-511.06488037109375,\"z\":24.590717315673828}','{\"x\":-1.1991891860961914,\"y\":-0.09619389474391937,\"z\":172.9377899169922}','0','0',36.8242),(924,'jugular','Ghoster599','[159]',1,'{\"x\":-527.530517578125,\"y\":-510.9765319824219,\"z\":24.603166580200195}','{\"x\":1.7663726806640625,\"y\":0.4763990044593811,\"z\":-18.312063217163086}','0','0',62.4111),(925,'jugular','Ghoster599','[159]',1,'{\"x\":-205.6012420654297,\"y\":-491.0591125488281,\"z\":26.497224807739258}','{\"x\":-1.1403425931930542,\"y\":-2.4785470962524414,\"z\":-23.369626998901367}','0','0',97.0116),(926,'jugular','Ghoster599','[159]',1,'{\"x\":-528.3522338867188,\"y\":-506.34588623046875,\"z\":24.726581573486328}','{\"x\":1.3233978748321533,\"y\":-0.05543306842446327,\"z\":-1.760554313659668}','0','0',150),(927,'jugular','Ghoster599','[159]',1,'{\"x\":1294.05078125,\"y\":754.0253295898438,\"z\":90.67723846435547}','{\"x\":-10.09914493560791,\"y\":7.77811336517334,\"z\":-100.01005554199219}','0','0',94.3184),(928,'jugular','Ghoster599','[159]',1,'{\"x\":489.267822265625,\"y\":1812.059814453125,\"z\":223.2858428955078}','{\"x\":7.049515247344971,\"y\":21.655630111694336,\"z\":104.45323944091797}','0','0',79.0249),(929,'jugular','Ghoster599','[159]',1,'{\"x\":1104.689453125,\"y\":850.9853515625,\"z\":154.7645263671875}','{\"x\":11.923362731933594,\"y\":19.403650283813477,\"z\":2.001199960708618}','0','0',150),(930,'jugular','Ghoster599','[159]',1,'{\"x\":139.01422119140625,\"y\":1636.3035888671875,\"z\":228.67547607421875}','{\"x\":-175.80828857421875,\"y\":-24.14447784423828,\"z\":-122.80272674560547}','0','0',98.8316),(931,'jugular','Ghoster599','[159]',1,'{\"x\":130.86306762695312,\"y\":1667.7369384765625,\"z\":228.62083435058594}','{\"x\":174.17198181152344,\"y\":-2.2390224933624268,\"z\":-170.92727661132812}','0','0',100),(932,'jugular','Ghoster599','[159]',1,'{\"x\":130.34426879882812,\"y\":1652.855712890625,\"z\":229.5789337158203}','{\"x\":0,\"y\":0,\"z\":0}','0','0',150),(933,'jugular','Ghoster599','[159]',1,'{\"x\":114.21546173095703,\"y\":1743.0994873046875,\"z\":209.3959503173828}','{\"x\":-28.344741821289062,\"y\":34.676551818847656,\"z\":41.13909912109375}','0','0',99.45),(934,'jugular','Ghoster599','[159]',1,'{\"x\":212.7413787841797,\"y\":2099.20556640625,\"z\":110.70118713378906}','{\"x\":7.015748500823975,\"y\":-57.329627990722656,\"z\":165.60891723632812}','0','0',100),(935,'jugular','Ghoster599','[159]',1,'{\"x\":155.24647521972656,\"y\":1972.6195068359375,\"z\":143.70059204101562}','{\"x\":5.090778827667236,\"y\":2.889551877975464,\"z\":-86.06315612792969}','0','0',100),(936,'jugular','Ghoster599','[159]',1,'{\"x\":109.82535552978516,\"y\":1708.73388671875,\"z\":223.09378051757812}','{\"x\":0,\"y\":0,\"z\":0}','0','0',150),(937,'jugular','Ghoster599','[159]',1,'{\"x\":108.36935424804688,\"y\":1752.875,\"z\":203.1148681640625}','{\"x\":-8.957404136657715,\"y\":-20.066457748413086,\"z\":-103.80549621582031}','0','0',100),(938,'jugular','Ghoster599','[159]',1,'{\"x\":115.03361511230469,\"y\":1717.0050048828125,\"z\":219.91488647460938}','{\"x\":0,\"y\":0,\"z\":0}','0','0',150),(939,'jugular','Ghoster599','[159]',1,'{\"x\":2866.671142578125,\"y\":2958.999267578125,\"z\":79.83905792236328}','{\"x\":-20.440336227416992,\"y\":-24.26839256286621,\"z\":51.941593170166016}','0','0',92.0867),(940,'jugular','Ghoster599','[159]',1,'{\"x\":2661.878173828125,\"y\":2976.65478515625,\"z\":38.491943359375}','{\"x\":-3.8071160316467285,\"y\":-6.515831470489502,\"z\":165.7815704345703}','0','0',92.1689),(941,'jugular','Ghoster599','[159]',1,'{\"x\":2612.090576171875,\"y\":2985.238525390625,\"z\":40.1550178527832}','{\"x\":-3.6760447025299072,\"y\":7.636562824249268,\"z\":1.598040223121643}','0','0',99.95),(942,'jugular','Ghoster599','[159]',1,'{\"x\":2668.8095703125,\"y\":2771.24755859375,\"z\":36.833587646484375}','{\"x\":0,\"y\":0,\"z\":100.8984375}','0','0',100),(943,'jugular','Ghoster599','[159]',1,'{\"x\":2795.208251953125,\"y\":2837.162353515625,\"z\":39.16441345214844}','{\"x\":0,\"y\":0,\"z\":-26.7187557220459}','0','0',100),(944,'jugular','Ghoster599','[159]',1,'{\"x\":2726.744384765625,\"y\":2800.14306640625,\"z\":36.775123596191406}','{\"x\":0,\"y\":0,\"z\":121.640625}','0','0',99.45),(945,'jugular','Ghoster599','[159]',1,'{\"x\":-969.6771850585938,\"y\":-2736.09033203125,\"z\":13.25413990020752}','{\"x\":0.015391328372061253,\"y\":-0.0003201455110684037,\"z\":-107.92964935302734}','0','0',62.9418),(946,'jugular','Ghoster599','[159]',1,'{\"x\":245.45809936523438,\"y\":508.4789733886719,\"z\":132.89566040039062}','{\"x\":0,\"y\":0,\"z\":-31.992183685302734}','0','0',34.9847),(947,'jugular','Ghoster599','[159]',1,'{\"x\":-464.1717834472656,\"y\":-668.7112426757812,\"z\":31.704051971435547}','{\"x\":0.4192471206188202,\"y\":2.2324371337890625,\"z\":39.35744857788086}','0','0',150),(948,'jugular','Ghoster599','[159]',1,'{\"x\":-457.0870361328125,\"y\":-659.2380981445312,\"z\":31.645599365234375}','{\"x\":-2.0674936771392822,\"y\":0.30986255407333374,\"z\":-79.82343292236328}','0','0',100),(949,'jugular','Ghoster599','[159]',1,'{\"x\":-479.18798828125,\"y\":-661.5687255859375,\"z\":32.122398376464844}','{\"x\":-1.1892484426498413,\"y\":-0.17760899662971497,\"z\":-98.78307342529297}','0','0',100),(950,'jugular','Ghoster599','[159]',1,'{\"x\":-471.5506591796875,\"y\":-656.8985595703125,\"z\":31.953462600708008}','{\"x\":0.7071689367294312,\"y\":1.1629096269607544,\"z\":30.606611251831055}','0','0',100),(951,'jugular','Ghoster599','[159]',1,'{\"x\":-478.79669189453125,\"y\":-644.5668334960938,\"z\":32.09364700317383}','{\"x\":-2.032423973083496,\"y\":-0.5778683423995972,\"z\":-106.11983489990234}','0','0',100),(952,'jugular','Ghoster599','[159]',1,'{\"x\":-461.9504699707031,\"y\":-665.9116821289062,\"z\":31.730648040771484}','{\"x\":0.4298575818538666,\"y\":-2.4167721271514893,\"z\":113.89726257324219}','0','0',150),(953,'t20','Ghoster599','[159]',1,'{\"x\":-1627.0023193359375,\"y\":1250.804443359375,\"z\":140.60012817382812}','{\"x\":-5.808973789215088,\"y\":1.6596951484680176,\"z\":1.9002065658569336}','0','0',0),(954,'bati','Ghoster599','[159]',1,'{\"x\":-1982.280517578125,\"y\":-433.60894775390625,\"z\":11.136962890625}','{\"x\":-6.066287994384766,\"y\":-11.044631004333496,\"z\":63.79655838012695}','0','0',73.5932),(955,'p1','Mittelblut9','[156]',1,'{\"x\":-460.0641174316406,\"y\":-1871.3853759765625,\"z\":17.744142532348633}','{\"x\":-0.7616353631019592,\"y\":1.8435659408569336,\"z\":126.79398345947266}','0','0',98.1894),(956,'p1','Mittelblut9','[156]',1,'{\"x\":-382.52099609375,\"y\":-1843.5260009765625,\"z\":21.14242935180664}','{\"x\":1.7796140909194946,\"y\":-1.4350272417068481,\"z\":1.1622644662857056}','0','0',150),(957,'bati','Ghoster599','[159]',1,'{\"x\":193.18299865722656,\"y\":1869.9810791015625,\"z\":174.94491577148438}','{\"x\":15.332740783691406,\"y\":36.068668365478516,\"z\":-177.7325439453125}','0','0',0),(958,'p1','Mittelblut9','[156]',1,'{\"x\":-1927.2523193359375,\"y\":2802.171875,\"z\":32.083805084228516}','{\"x\":-1.1822055578231812,\"y\":36.40512466430664,\"z\":-111.01187896728516}','0','0',21.9678),(959,'bati','Ghoster599','[159]',1,'{\"x\":-2791.204833984375,\"y\":2996.666259765625,\"z\":-1.0604321956634521}','{\"x\":-0.0576641745865345,\"y\":-9.275107383728027,\"z\":-174.55624389648438}','0','0',99.2146),(960,'bati','Ghoster599','[159]',1,'{\"x\":-2421.1005859375,\"y\":3856.52001953125,\"z\":23.345806121826172}','{\"x\":0,\"y\":0,\"z\":-75.23438262939453}','0','0',150),(961,'bati','Ghoster599','[159]',1,'{\"x\":-1483.9862060546875,\"y\":-254.2710723876953,\"z\":49.56679916381836}','{\"x\":-0.038160327821969986,\"y\":-10.782529830932617,\"z\":0.28054511547088623}','0','0',150),(962,'bati','Ghoster599','[159]',1,'{\"x\":-2832.95556640625,\"y\":2862.63427734375,\"z\":-3.833277702331543}','{\"x\":0,\"y\":0,\"z\":97.734375}','0','0',0),(963,'bati','Ghoster599','[159]',1,'{\"x\":407.73028564453125,\"y\":-1007.9778442382812,\"z\":28.61504364013672}','{\"x\":0.12602724134922028,\"y\":-10.850604057312012,\"z\":1.0664029121398926}','0','0',150),(964,'bati','Ghoster599','[159]',1,'{\"x\":-1990.322265625,\"y\":-493.4562683105469,\"z\":10.94739818572998}','{\"x\":2.2286059856414795,\"y\":-10.805795669555664,\"z\":-141.1343994140625}','0','0',0),(965,'bati','Ghoster599','[159]',1,'{\"x\":-1467.826904296875,\"y\":2221.00537109375,\"z\":32.15346908569336}','{\"x\":-19.042417526245117,\"y\":-54.99029541015625,\"z\":56.67279815673828}','0','0',0),(966,'bati','Ghoster599','[159]',1,'{\"x\":-33.19310760498047,\"y\":-1818.0023193359375,\"z\":25.49974822998047}','{\"x\":3.9396140575408936,\"y\":-4.416457653045654,\"z\":101.35057067871094}','0','0',62.5216),(967,'bati','Ghoster599','[159]',1,'{\"x\":-445.4175720214844,\"y\":-1774.452880859375,\"z\":19.894744873046875}','{\"x\":-3.8800065517425537,\"y\":-6.530483245849609,\"z\":-10.78380298614502}','0','0',0),(968,'bati','Ghoster599','[159]',1,'{\"x\":-461.514404296875,\"y\":-673.6497802734375,\"z\":31.645954132080078}','{\"x\":-0.06320091336965561,\"y\":-10.871702194213867,\"z\":-168.6758270263672}','0','0',76.0098),(969,'jugular','Ghoster599','[159]',1,'{\"x\":677.043701171875,\"y\":-858.7049560546875,\"z\":45.23119354248047}','{\"x\":0,\"y\":0,\"z\":178.94529724121094}','0','0',96.222),(970,'zentorno','Ghoster599','[159]',1,'{\"x\":-355.54010009765625,\"y\":-658.5630493164062,\"z\":31.440467834472656}','{\"x\":-0.1912880539894104,\"y\":-1.4307104349136353,\"z\":1.4074444770812988}','0','0',150),(971,'p1','Ghoster599','[159]',1,'{\"x\":408.1244201660156,\"y\":-989.1665649414062,\"z\":28.75218963623047}','{\"x\":-0.9649631977081299,\"y\":-0.05697249993681908,\"z\":52.38208770751953}','0','0',64.188),(972,'bati','Ghoster599','[159]',1,'{\"x\":398.66888427734375,\"y\":-1027.263427734375,\"z\":28.83377456665039}','{\"x\":0.047008343040943146,\"y\":-10.810882568359375,\"z\":0.7706550359725952}','0','0',150),(973,'bati','Ghoster599','[159]',1,'{\"x\":-1757.1842041015625,\"y\":-553.9910278320312,\"z\":36.23701477050781}','{\"x\":5.5212273597717285,\"y\":-10.883133888244629,\"z\":-80.8940658569336}','0','0',0),(974,'zentorno','Ghoster599','[159]',1,'{\"x\":-1439.5042724609375,\"y\":-299.4894104003906,\"z\":45.02632522583008}','{\"x\":0,\"y\":0,\"z\":-3.164057731628418}','0','0',150),(975,'bati','Ghoster599','[159]',1,'{\"x\":17.369060516357422,\"y\":632.96240234375,\"z\":206.67344665527344}','{\"x\":2.645228624343872,\"y\":-4.254001140594482,\"z\":166.40423583984375}','0','0',100),(976,'bait','Ghoster599','[159]',1,'{\"x\":17.03857421875,\"y\":632.4465942382812,\"z\":206.79299926757812}','{\"x\":0,\"y\":0,\"z\":175.78125}','0','0',100),(977,'bati','Ghoster599','[159]',1,'{\"x\":1799.5120849609375,\"y\":-1504.46826171875,\"z\":115.12078857421875}','{\"x\":0,\"y\":0,\"z\":149.41404724121094}','0','0',0),(978,'bati','Ghoster599','[159]',1,'{\"x\":18.32374382019043,\"y\":630.74951171875,\"z\":206.72232055664062}','{\"x\":0.4640651047229767,\"y\":-4.269601821899414,\"z\":-0.03493998199701309}','0','0',150),(979,'t20','Ghoster599','[159]',1,'{\"x\":106.26631927490234,\"y\":-965.2919921875,\"z\":28.903928756713867}','{\"x\":0.05584675446152687,\"y\":-2.786571502685547,\"z\":-9.498839378356934}','0','0',78.77),(980,'p1','Mittelblut9','[156]',1,'{\"x\":-1015.2240600585938,\"y\":-3099.57373046875,\"z\":13.809858322143555}','{\"x\":4.930898666381836,\"y\":-7.854417324066162,\"z\":137.5325164794922}','0','0',0),(981,'t20','Ghoster599','[159]',1,'{\"x\":291.3446350097656,\"y\":-1391.2933349609375,\"z\":30.434850692749023}','{\"x\":-4.634710788726807,\"y\":-0.28202328085899353,\"z\":146.2187042236328}','0','0',98.657),(982,'p1','Mittelblut9','[156]',1,'{\"x\":340.9619445800781,\"y\":-1397.2105712890625,\"z\":31.995161056518555}','{\"x\":-0.9277417659759521,\"y\":-0.053188469260931015,\"z\":0.7029534578323364}','0','0',150),(983,'repeair','Mittelblut9','[156]',1,'{\"x\":-738.1004638671875,\"y\":-1631.88720703125,\"z\":25.03409194946289}','{\"x\":-3.4809999465942383,\"y\":2.9664292335510254,\"z\":10.461593627929688}','0','0',91.6247),(984,'p1','Mittelblut9','[156]',1,'{\"x\":-325.16070556640625,\"y\":-1908.28466796875,\"z\":47.93220901489258}','{\"x\":-0.8831659555435181,\"y\":-0.06024046242237091,\"z\":-117.20557403564453}','0','0',0),(985,'p1','Mittelblut9','[156]',1,'{\"x\":552.4638061523438,\"y\":-2666.386962890625,\"z\":38.47773742675781}','{\"x\":-0.18707120418548584,\"y\":4.719332695007324,\"z\":-175.4171142578125}','0','0',72.2939),(986,'p1','Mittelblut9','[156]',1,'{\"x\":-581.8577270507812,\"y\":5390.6796875,\"z\":57.75193405151367}','{\"x\":-20.296581268310547,\"y\":-16.96491241455078,\"z\":-28.251018524169922}','0','0',0),(987,'p1','Mittelblut9','[156]',1,'{\"x\":557.5205078125,\"y\":-2661.75537109375,\"z\":39.65094757080078}','{\"x\":0,\"y\":0,\"z\":0}','0','0',150),(988,'p1','Mittelblut9','[156]',1,'{\"x\":306.1044921875,\"y\":5851.42138671875,\"z\":387.4973449707031}','{\"x\":-11.24583625793457,\"y\":-25.162757873535156,\"z\":68.2349853515625}','0','0',100),(989,'p1','Mittelblut9','[156]',1,'{\"x\":276.52325439453125,\"y\":5815.72705078125,\"z\":2170.76513671875}','{\"x\":1.7456769943237305,\"y\":0.3700936436653137,\"z\":0.009849129244685173}','0','0',150),(990,'p1','Mittelblut9','[156]',1,'{\"x\":-3098.1240234375,\"y\":1568.4979248046875,\"z\":-0.6549627184867859}','{\"x\":-6.765604019165039,\"y\":-1.8962911367416382,\"z\":141.96173095703125}','0','0',94.2385),(991,'p1','Mittelblut9','[156]',1,'{\"x\":-235.4374542236328,\"y\":-2074.220458984375,\"z\":27.107515335083008}','{\"x\":-0.8844860196113586,\"y\":-0.06062095984816551,\"z\":35.29252624511719}','0','0',24.367);
/*!40000 ALTER TABLE `pg_vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-01 17:06:53
