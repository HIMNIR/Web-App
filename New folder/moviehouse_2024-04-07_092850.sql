-- MariaDB dump 10.19  Distrib 10.5.21-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: moviehouse
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB-1:10.4.32+maria~ubu2004

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
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrator` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES ('admin','$2y$12$msVrlvMXHbKsgJZC8d/sIO/3IXjC07CQZM/3BYCKoZ8HlpR2KkqWS'),('jpratt','$2y$12$N/pPQrFm.55rsVj/uFVyo.0m0JyMLO0AXtKb.JCJM1haJwFFkEyMC');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `release_date` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (14,'American Beauty','1999-09-15'),(10775,'Infernal Affairs','2002-12-12'),(346698,'Barbie','2023-07-19'),(365620,'Ferrari','2023-12-25'),(466420,'Killers of the Flower Moon','2023-10-18'),(508883,'The Boy and the Heron','2023-12-08'),(558915,'The Color Purple','2023-12-25'),(572802,'Aquaman and the Lost Kingdom','2023-12-20'),(609681,'The Marvels','2023-11-08'),(673593,'Mean Girls','2024-01-10'),(695721,'The Hunger Games: The Ballad of Songbirds & Snakes','2023-11-15'),(753342,'Napoleon','2023-11-22'),(787699,'Wonka','2023-12-06'),(792307,'Poor Things','2023-11-21'),(823452,'The Boys in the Boat','2023-12-25'),(840430,'The Holdovers','2022-10-27'),(848187,'Role Play','2023-12-14'),(848326,'Rebel Moon - Part One: A Child of Fire','2023-12-15'),(866398,'The Beekeeper','2024-01-10'),(872585,'Oppenheimer','2023-07-19'),(906126,'Society of the Snow','2023-12-13'),(930564,'Saltburn','2023-11-16'),(940721,'Godzilla Minus One','2023-12-01'),(955916,'Lift','2024-01-10'),(956262,'The Kitchen','2023-10-15'),(1212073,'Sixty Minutes','2024-01-19');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;

--
-- Table structure for table `now_playing`
--

DROP TABLE IF EXISTS `now_playing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `now_playing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theatre_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_now_playing_theatre` (`theatre_id`),
  KEY `fk_now_playing_movie` (`movie_id`),
  CONSTRAINT `fk_now_playing_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `fk_now_playing_theatre` FOREIGN KEY (`theatre_id`) REFERENCES `theatre` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `now_playing`
--

/*!40000 ALTER TABLE `now_playing` DISABLE KEYS */;
INSERT INTO `now_playing` VALUES (4,2,10775),(5,2,508883),(6,3,365620),(7,4,365620),(20,1,609681),(21,1,466420),(22,1,508883),(23,1,558915),(25,1,14),(26,4,466420),(27,4,508883),(28,4,466420),(29,4,508883),(30,1,930564),(31,2,930564);
/*!40000 ALTER TABLE `now_playing` ENABLE KEYS */;

--
-- Table structure for table `theatre`
--

DROP TABLE IF EXISTS `theatre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `theatre` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theatre`
--

/*!40000 ALTER TABLE `theatre` DISABLE KEYS */;
INSERT INTO `theatre` VALUES (1,'Plaza Theatre','1133 Kensington Rd NW',51.052412578151916,-114.08788680334811),(2,'Globe Cinema','617 8 Ave SW',51.045686640675555,-114.07502973218419),(3,'Scotiabank Theatre Chinook','6455 Macleod Trail SW',50.99660636689441,-114.07416176102294),(4,'Landmark Cinemas 5 Market Mall','3412 49 St NW',51.08298029486308,-114.15741816357233),(5,'Cineplex Cinemas at Sunridge Mall','2525 36 St NE',51.07420328510282,-113.99119781558664);
/*!40000 ALTER TABLE `theatre` ENABLE KEYS */;

--
-- Dumping routines for database 'moviehouse'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-07  9:28:57
