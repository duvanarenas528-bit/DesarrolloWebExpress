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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idPersona` int NOT NULL AUTO_INCREMENT,
  `idTipoId` int NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `idGenero` int NOT NULL,
  `codigo_verificacion` varchar(6) DEFAULT NULL,
  `verificado` tinyint(1) DEFAULT '0',
  `rol` varchar(20) DEFAULT 'usuario',
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idPersona`),
  UNIQUE KEY `correo` (`correo`),
  KEY `idTipoId` (`idTipoId`),
  KEY `idGenero` (`idGenero`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idTipoId`) REFERENCES `TiposId` (`idTipoId`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`idGenero`) REFERENCES `Genero` (`idGenero`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (3,2,'Ana','Rincon','anarincon914@gmail.com','$2b$10$PUZ0rYES1npDUtwX39jY2.Wvl8RgWPwvz7Xtc912ltuRQtReGyyla',2,NULL,1,'usuario',NULL),(6,1,'Duvan','Arenas','amparoarenasdiaz84@gmail.com','$2a$10$F36CUicDDgfQacV/JE5QneY.E4EdUdL3nb5AJka44Pj/biM.Z2zee',1,NULL,1,'admin',NULL),(7,1,'duban','Tibaquira','duvanarenas528@gmail.com','$2b$10$oaEZwKdKtMg4e6u4DxbK9ekfZNUbtUXFKwwECYt2k8qMl24Ha75P2',1,NULL,1,'2',NULL),(8,1,'esteban','morales','estemoca@gmail.com','$2b$10$16sU7r/v8VgHaPH51GYvFOc2hY8CWLSfRFc3a8xyagQWUgxydrAK2',1,NULL,1,'1',NULL),(9,1,'duban','tivaquira','amparoarenasdiazz84@gmail.com','$2b$10$zn81CwSCvB.EQyouL.fiSegHuexhPO6p8ekmAib7dePS09Q3lZ4SO',1,NULL,1,'1','1764175082631-307963909.jpeg');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 16:47:13
