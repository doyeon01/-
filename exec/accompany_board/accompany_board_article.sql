-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: j11c205.p.ssafy.io    Database: accompany_board
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
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `created_date` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `total_plan_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES ('2024-08-07 12:01:52.810000',1,'2024-10-07 12:01:52.810600',52,2892,'동행 인원 모집합니다.','구합니다'),('2024-05-09 12:02:09.888000',2,'2024-10-07 12:02:09.888281',52,2892,'동행 인원 모집합니다.','동행'),('2024-03-06 12:02:16.733000',3,'2024-10-07 12:02:16.733000',52,2892,'동행 인원 모집합니다.','같이 여행 가실 분'),('2024-05-09 12:02:25.272000',4,'2024-10-07 12:02:25.272364',52,2892,'동행 인원 모집합니다.','같이 동행!'),('2024-07-07 12:02:34.487000',5,'2024-10-07 12:02:34.487040',52,2892,'동행 인원 모집합니다.','선착순 2명!'),('2024-10-07 12:02:40.247053',6,'2024-10-07 12:02:40.247053',52,2891,'동행 인원 모집합니다.','점심 먹으러'),('2024-10-07 12:02:53.077139',7,'2024-10-07 12:02:53.077139',52,2892,'동행 인원 모집합니다.','같이 가실 분 있나요?'),('2024-10-07 12:02:59.858394',8,'2024-10-07 12:02:59.858394',52,2892,'동행 인원 모집합니다.','동행 구해용'),('2024-10-07 12:03:06.110844',9,'2024-10-07 12:03:06.110844',52,2892,'동행 인원 모집합니다.','동행 가보자~'),('2024-10-07 12:03:11.121333',10,'2024-10-07 12:03:11.121333',52,2892,'동행 인원 모집합니다.','같이 가요'),('2024-10-07 15:16:14.380805',11,'2024-10-07 15:16:14.380805',52,2892,'동행 인원 모집합니다.','Together'),('2024-10-07 15:16:20.362907',12,'2024-10-07 15:16:20.362907',52,2892,'동행 인원 모집합니다.','Together lunch');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11  8:50:40
