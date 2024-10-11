-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: j11c205a.p.ssafy.io    Database: plan_db
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `day_plan`
--

DROP TABLE IF EXISTS `day_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day_plan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `day` bigint NOT NULL,
  `total_plan_id` bigint NOT NULL,
  `created_date` date NOT NULL DEFAULT (curdate()),
  `last_modified_date` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  KEY `fk_total_plan` (`total_plan_id`),
  CONSTRAINT `fk_total_plan` FOREIGN KEY (`total_plan_id`) REFERENCES `total_plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day_plan`
--

LOCK TABLES `day_plan` WRITE;
/*!40000 ALTER TABLE `day_plan` DISABLE KEYS */;
INSERT INTO `day_plan` VALUES (115,1,45,'2024-10-10','2024-10-10'),(116,2,45,'2024-10-10','2024-10-10'),(117,3,45,'2024-10-10','2024-10-10'),(118,1,46,'2024-10-10','2024-10-10'),(119,1,47,'2024-10-10','2024-10-10'),(120,2,47,'2024-10-10','2024-10-10'),(124,1,51,'2024-10-11','2024-10-11'),(125,2,51,'2024-10-11','2024-10-11'),(126,3,51,'2024-10-11','2024-10-11'),(127,1,52,'2024-10-11','2024-10-11'),(128,2,52,'2024-10-11','2024-10-11'),(129,3,52,'2024-10-11','2024-10-11'),(130,1,53,'2024-10-11','2024-10-11'),(131,2,53,'2024-10-11','2024-10-11'),(132,3,53,'2024-10-11','2024-10-11');
/*!40000 ALTER TABLE `day_plan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11  8:51:27
