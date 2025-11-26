-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: localhost    Database: parking_now
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
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `placa` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo_vehiculo` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_ingreso` datetime DEFAULT NULL,
  `servicios` text,
  `idPersona` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `placa` (`placa`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES (1,'HQX446','DUBAN','CARRO','3222940225','2025-05-27 00:00:00','Lavado',0),(3,'IJU284','Duban','Automóvil','3008483479','2025-05-27 00:00:00','Lavado',0),(4,'THY23F','Duban','Moto','3008483479','2025-05-27 00:00:00','Lavado',0),(5,'EHP688','Camilo','Carro','3448826253','2025-05-27 00:00:00','Bajo Techo',0),(6,'LLP663','LENNY','Carro','99937625','2025-05-04 00:00:00','Bajo Techo',0),(7,'BMW283','Duban','Carro','399297733','2025-05-27 00:00:00','Lavado',0),(8,'BMW123','duban','carro','3222940225','2025-06-19 00:00:00','Bajo Techo',0),(10,'kkl284','duban','carro','3222940225','2025-06-02 00:00:00','Bajo Techo',0),(11,'IJU285','DUBAN','CARRO','3222940225','2025-06-02 00:00:00','Bajo Techo, Lavado',0),(12,'IJU286','DUBAN','MOTO','322942205','2025-06-03 00:00:00','Bajo Techo',0),(13,'iju287','duban','carro','322940226','2025-06-02 17:23:00','Ninguno',0),(14,'duban','duban','Carro','2134234234','2025-06-11 16:30:00','Ninguno',0),(15,'camilo','camilo','carro','4234234','2025-06-03 03:30:00','Ninguno',0),(16,'JJB299','Duban','Carro','3223h3h3','2025-11-06 14:52:00','Bajo Techo',0),(18,'LENNI','LENNI','LENNI','3772654','2025-06-11 14:53:00','Bajo Techo',0),(19,'HHQ445','duvan','CARRO','3222940226','2025-11-26 00:00:00','Lavado',9),(20,'JJH284','DUVAN','CARRO','322394585','2025-11-26 00:00:00','LALA',9),(21,'KJL145','camilo','carro','33322233','2025-11-26 00:00:00','333',9),(22,'HHQ2993','DUBAN','CARRO','224234235','2025-11-26 00:00:00','',9),(23,'JHHD23','DUBAN','CARRO','312423423','2025-11-26 00:00:00','',9),(24,'SDGSDG','SDGSDG','SDGSDG','SDGSDG','2025-11-26 00:00:00','',9),(25,'GWP165','ESTEMOCA','CARRO','3222940227','2025-11-26 00:00:00','LAVADO',9);
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 16:47:14
