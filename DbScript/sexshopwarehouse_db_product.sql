CREATE DATABASE  IF NOT EXISTS `sexshopwarehouse_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sexshopwarehouse_db`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: sexshopwarehouse_db
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` decimal(16,2) NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(2000) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Сашка Чулка',1599.00,54,'https://images-ext-1.discordapp.net/external/wbNEw9gtScoU90ZENXNVYmSzV9fN8NbjWcPOC49y8ec/https/yandex-images.clstorage.net/Se98kx351/d17a135_/VFrSlKyQR4C6PBx_FmL0WT9DJHSD01cP-HFhtFXo-j4iTlNEOBHK_XDNMlc3LsJuuJHnUA5yL3OoP9rj625OXuF-N_CpBEJkyjxNO6bGNfn-QnC1V-L2KniyAgOSv_ychDyUMz-FOsmk-RQhkzpU3ljTUwR5cW7BrViYFgh-agiFCYDlDLPVp0nNfypncBSZXHMA5fHhYs5ekWMhkby9vhc8d2D9VrmtFtr00lfrB73ZouFVaUOfMw2IO9R4_LgIxUtQtVzhdYUZvnwYpTIEO11C8AQzUvB_PbGjQVHvX_0VjMTx_ZRITBaIZYN0OwbuSlPCpMqTf5D8a1km6gz6y1ULUgRNojX1ON0-GsXj57p_A5KkQqJQzZ2zAGNwbo3sN51FAd3W-D-k2DSjZgun_jkB80bYE23gvlpptLv9qclWu9Dn_RO0lMmOvkrVEsfpD_HQ5IKRg4z-o6Fwo_8879XvRIMPBAjPB3kGciZZJZ3KESKWSJAOIXwqC7dI7YsbhhkSl35gJycoXj3LJKK1i42S4FbyAkGufPGy8VHtTG60XNfj7ETp_xSIhSAVe4fOGEKDRapgniDuKlg1C75oKZZqsAc9kRXm6g8P2FfiF8vPYoIWMOOQ7H_i86FQLz4s5Q0VYp3HKX3W63Wy1Xtn_Ggw03fpMk8CTgi7xinO-pgFC6K3TQFGR9u87-nXA-WoD5OSxTLiY6-O0NFhIQzfDTWMlcIu97pftJhV4rYrZ3558JEHmrF98bzKqkU4zKo4lQgzBVwxFFQ43vxohZF12m-gQRVDwNPfLIFxgdD_TG1XnOVQzmY4PZUodVLUCYZ96HMgtRqBPwO_Kao3aYwYaLZb4vcu4kX3en8uyTdyNfjtQdLlwcNifE-xEbEino-d12ynUO1FuEwViAXAtWjnjYjwgzeJYL4zHTqKt8gtyqnnWNJVjZJnNHvefBk3wCTaHlIgZuNjYL7OoLND0f5dg?format=webp&width=750&height=968','Нежная, добрая, страстная'),(2,'Рома Наручники PINK',2345.00,23,'https://a.allegroimg.com/original/113ce5/b85e1e6647959adda857747857b8/KAJDANKI-NA-RECE-DLA-DOROSLYCH-EROTYCZNE-Z-FUTERKIEM-DLA-DWOJGA','Не знаю сами придумайте. Мне всё равно'),(13,'Маска Кошечки',223.00,65,'https://image.kazanexpress.ru/c0vntdfb2uaa7lif24i0/original.jpg','Для РЕФЛЕННЫХ кис'),(14,'Гриша Мили Ошейничек',543.00,34,'https://images-ext-1.discordapp.net/external/Yugn17ZCyIlZwDTytSOvg3rqNK-AQsYuh5NVvnswULc/https/intimoamore.ru/media/CACHE/images/products/2c69e607-bede-4385-a829-a5ff2ffd285e/2e0883c51c330e1cf97aaf2230ebdcd3.jpg?format=webp','ММММ ТАК НРАВИТСЯ...'),(15,'Антон Виагра',786.00,32,'https://images-ext-1.discordapp.net/external/QWpo78c1UsWwsw8zerzRPzkUYcy03E0-xb3B9FKWFyM/%3Fid%3D8af80318a5c9f09ecb3031b0e063bfa61f2a3dad-4298850-images-thumbs%26n%3D13/https/avatars.mds.yandex.net/i?format=webp','Писки Попки Какашечки'),(16,'Табурет',1999.00,43,'https://images-ext-1.discordapp.net/external/IlakgMvYizXIXrmTARpKFoQLuWXB2qsEuzsEo3dS7AM/https/avatars.mds.yandex.net/get-mpic/4936002/img_id438986286373365798.jpeg/9?format=webp','Табурет'),(17,'Геймотоген',233.00,75,'https://images-ext-1.discordapp.net/external/CqC0HjVdmwyhQq3QD9ApNlJExx5Jk2j3uTTa1T84484/https/avatars.mds.yandex.net/get-mpic/18015493/2a00000199f2e4f4f071a5d87cef800ee7fe/orig?format=webp','0+'),(18,'Мия Плётка',765.00,34,'https://images-ext-1.discordapp.net/external/yeyeSCQ5Qtx8z1yPRvY61iGsa5GlAjoUe5vshp7ZFCw/https/yandex-images.clstorage.net/Se98kx351/d17a135_/VFrSlKyQR4C6PBx_FmL0WT9DJHSD01cP-HFhtFD4qhsiSyZh7SS66HBd15d3XvKLrdG3kNs3b1atD3qzK25OXrFOl8Cp1EPAinyNW4ej0Gg_k_BEQrZzGriUwgJyv81Nhe0k09_2S01ROWaBlM_Wbdgx0MRKMHwSTyrI5Pj-amsnavC3jGFUB0n_fGmWYmZJXzHBNBIQcI5csuFjULzODKd-JDCMNJjONYtFYWcLBz67sKF2GyBO472KGEc6jui5JyqyZ9wxBqdrrw9qpKAkWf0w8MTz0sMc7dHBozB8ne7kfJSDHTRaP9SLF_A2KNc_6CNQVeqDngMee_slyBwY--S68mVtIEXnG45sKKbA9bp8ErGmU6MzvF9xwwASXRw89V6FAu0UGI-nOUehFjrnnvhQAmQIkR4RbjnKFVpN6ajmuULnjpD0Znp_P6j20ASaL2JD5BNjAG8eEtOhAY6Njfa89wNvxsp_V5rmk8d6tRyboxK12AGdcq_7undZvvmKNGngJf4Th_XJnu8rdyG06E3gINShE5OtPJCBsoB8n_133USQDyWKnmeJFxCVSZe-yHFBFAvjbeKuabok2_2qaQZ5k4duUHbHCFy-GWRS9EoNotC24dFyfH6TkvPQfV2PNYwVUo5UCV7lS3TgB4mXXvoBM0Q5oD8zjMmYxyjf2vu36vKV3iDmlKltDflV0hW4bmIhpjLTc489YqDREAx-bhRclNIu5znNxykHwFfqx154EPMGSdO8AX87WtarztirF3rxBGwx1sa6jm_q1ICHKBwCEnXiolE_TcDxcfD9jf10PoSivAeoT6UIt-DniOW_e4Fwt_tTjEONOLnW2Z-YGUdZotWeQwWXGczOOHUyZGg-gPPmEiBSju6jwRHAD-w-hL504Lwki8_UiBeQdemE3ovh8xR5wG3CvZqq9lk-OcuGCKHlPOB1tdrNb2qlMtZ5HHPgFJEC8owsItCzMvyM4?format=webp','Хлещет не по-детски'),(20,'Помидор',54.40,55,'https://avatars.mds.yandex.net/i?id=8785e994a955359f46fdf101b280e55542a9f00d-4575726-images-thumbs&n=13','Красный вкусный');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16  2:15:15
