-- MySQL Script generated by MySQL Workbench
-- Mon Sep  9 21:35:41 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema educatruffe
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema educatruffe
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `educatruffe` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `educatruffe` ;

-- -----------------------------------------------------
-- Table `educatruffe`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `phoneNumber` VARCHAR(20) NULL DEFAULT NULL,
  `address` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`appointmentRequest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`appointmentRequest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` TEXT NOT NULL,
  `userId` INT NOT NULL,
  `date`  DATE,
  PRIMARY KEY (`id`, `userId`),
  INDEX `fk_appointment_request_user1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_appointment_request_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `educatruffe`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`service` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serviceName` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `servicePrice` DECIMAL(7,2) NOT NULL,
  `duration` VARCHAR(100) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`calendar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`calendar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serviceId` INT NOT NULL,
  `date` DATE NOT NULL,
  `hour` TIME NOT NULL,
  `dayIndex` TINYINT NOT NULL,
  `hourIndex` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_seance_has_service_service1_idx` (`serviceId` ASC) VISIBLE,
  CONSTRAINT `fk_seance_has_service_service1`
    FOREIGN KEY (`serviceId`)
    REFERENCES `educatruffe`.`service` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`commentaire` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serviceId` INT NOT NULL,
  `userId` INT NOT NULL,
  `text` TEXT NULL DEFAULT NULL,
  `rating` TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 0 AND 5),
  `approved` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_service_has_user_user1_idx` (`userId` ASC) VISIBLE,
  INDEX `fk_service_has_user_service1_idx` (`serviceId` ASC) VISIBLE,
  CONSTRAINT `fk_service_has_user_service1`
    FOREIGN KEY (`serviceId`)
    REFERENCES `educatruffe`.`service` (`id`),
  CONSTRAINT `fk_service_has_user_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `educatruffe`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`dog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`dog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `dogName` VARCHAR(100) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `userId`),
  INDEX `fk_Dogs_user_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_Dogs_user`
    FOREIGN KEY (`userId`)
    REFERENCES `educatruffe`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`newsletter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`newsletter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `letter` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`seance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`seance` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT ,
  `dogId` INT ,
  `serviceId` INT NOT NULL,
  `date` varchar(100) NOT NULL,
  `hour` TIME NOT NULL,
  `dayIndex` TINYINT,
  `hourIndex` TINYINT,
  PRIMARY KEY (`id`, `serviceId`),
  INDEX `fk_user_has_service_user1_idx` (`userId` ASC) VISIBLE,
  INDEX `fk_seance_dog1_idx` (`dogId` ASC) VISIBLE,
  INDEX `fk_seance_service1_idx` (`serviceId` ASC) VISIBLE,
  CONSTRAINT `fk_seance_dog1`
    FOREIGN KEY (`dogId`)
    REFERENCES `educatruffe`.`dog` (`id`),
  CONSTRAINT `fk_seance_service1`
    FOREIGN KEY (`serviceId`)
    REFERENCES `educatruffe`.`service` (`id`),
  CONSTRAINT `fk_user_has_service_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `educatruffe`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`seanceReport`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`seanceReport` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dogId` INT NOT NULL,
  `seanceId` INT NOT NULL,
  `report` TEXT NOT NULL,
  PRIMARY KEY (`id`, `dogId`, `seanceId`),
  INDEX `fk_seance_has_dog_dog1_idx` (`dogId` ASC) VISIBLE,
  INDEX `fk_seance_has_dog_seance1_idx` (`seanceId` ASC) VISIBLE,
  CONSTRAINT `fk_seance_has_dog_dog1`
    FOREIGN KEY (`dogId`)
    REFERENCES `educatruffe`.`dog` (`id`),
  CONSTRAINT `fk_seance_has_dog_seance1`
    FOREIGN KEY (`seanceId`)
    REFERENCES `educatruffe`.`seance` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educatruffe`.`newsletterUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`newsletterUser` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userEmail` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educatruffe`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educatruffe`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `hashed_password` VARCHAR(145) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Donnée test pour le front 
-- -----------------------------------------------------

-- Insérer des utilisateurs
INSERT INTO `educatruffe`.`user` (firstname, lastname, email, hashed_password, phoneNumber, address)
VALUES
('Jean', 'Dupont', 'test@example.com', '$argon2id$v=19$m=19456,t=2,p=1$a7Liq9JqwKO4KKt2ZcAHTA$zn51PxYxGHp2xGyBWsJfFTb/lVc4xM2msrPCjg8yO9E', '0601020304', '123 Rue de Paris'),
('Marie', 'Martin', 'marie.martin@example.com', 'password123', '0605060708', '456 Avenue des Champs'),
('Paul', 'Durand', 'paul.durand@example.com', 'password123', '0608091011', '789 Boulevard Saint-Germain'),
('Sophie', 'Bernard', 'sophie.bernard@example.com', 'password123', '0611121314', '321 Place de la République'),
('Adrien', 'Pichard', 'adrien.pich@ard.com', 'password123', '0611121314', '321 Rue de la Pich');


-- Insérer des chiens pour chaque utilisateur
INSERT INTO `educatruffe`.`dog` (userId, dogName, description)
VALUES
(1, 'Rex', 'Berger allemand, très énergique'),
(1, 'Bella', 'Chien de berger, doux et affectueux'),
(2, 'Milo', 'Golden retriever, joueur et fidèle'),
(2, 'Luna', 'Labrador, aimante et gentille'),
(3, 'Oscar', 'Beagle, curieux et malin'),
(3, 'Daisy', 'Bichon, calme et affectueuse'),
(4, 'Max', 'Husky, indépendant et intelligent'),
(4, 'Ruby', 'Cocker, joyeuse et active'),
(5, 'Pichou', 'bichon, il aboie en disant pich pich');

-- Insérer des services
INSERT INTO `educatruffe`.`service` (serviceName, description, servicePrice, duration, image)
VALUES
('Nosework', 'Séance de dressage pour apprendre les commandes de base.', 25.00, '1 heure', '/assets/images/charlie_with_flute.png'),
('Nosework initiation', 'Toilettage complet pour toutes les races de chiens.', 45.00, '1 heure', '/assets/images/dog1.jpg'),
('Comportement', 'Consultation générale avec un vétérinaire.', 25.00, '1 heure', '/assets/images/dog2.png'),
('Mantrailing', 'Consultation générale avec un vétérinaire.', 45.00, '7 heures', '/assets/images/what-is-mantrailing.webp');

-- Insérer des demandes de rendez-vous
INSERT INTO `educatruffe`.`appointmentRequest` (message, userId, date)
VALUES
('Je souhaite un rendez-vous pour un dressage de base pour mon chien Rex.', 1, '2024-09-15'),
('J aimerais un toilettage pour Luna.', 2, '2024-09-20'),
('Je souhaite une consultation vétérinaire pour Oscar.', 3, '2024-09-25');

-- Insérer des commentaires
INSERT INTO `educatruffe`.`commentaire` (serviceId, userId, text, rating, approved)
VALUES
(1, 1, 'Le dressage de base était excellent, très utile pour mon chien.', 5, 1),
(2, 2, 'Service de toilettage impeccable, je recommande !', 4, 0),
(3, 3, 'Consultation vétérinaire très professionnelle.', 5, 0);

-- Insérer des séances
INSERT INTO `educatruffe`.`seance` (userId, dogId, serviceId, date, hour, dayIndex, hourIndex)
VALUES (1, 1, 1, 'lundi 23 septembre', '10:00:00', 1, 1);  


-- -- Insérer des rapports de séances
-- INSERT INTO `educatruffe`.`seanceReport` (dogId, seanceId, report)
-- VALUES
-- (1, 1, 'Rex a très bien réagi aux commandes de base et a montré de bons progrès.'),
-- (4, 2, 'Luna a été très calme pendant le toilettage, pas de problème.'),
-- (5, 3, 'Oscar a une légère infection qui sera traitée avec des antibiotiques.');

-- Insérer des utilisateurs abonnés à la newsletter
INSERT INTO `educatruffe`.`newsletterUser` (userEmail)
VALUES
('thomasdziurdzi@gmail.com');

-- Insérer des administrateurs
INSERT INTO `educatruffe`.`admin` (email, hashed_password, name)
VALUES
('admin1@educatruffe.com', '$argon2id$v=19$m=19456,t=2,p=1$a7Liq9JqwKO4KKt2ZcAHTA$zn51PxYxGHp2xGyBWsJfFTb/lVc4xM2msrPCjg8yO9E', 'Admin Jade');

SET SQL_MODE=@OLD_SQL_MODE; 
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;