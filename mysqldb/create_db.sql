CREATE DATABASE IF NOT EXISTS library_db;

USE library_db;

-- Table library
CREATE TABLE IF NOT EXISTS `library` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `address` VARCHAR(255),
    `phone_number` VARCHAR(15) NULL,
    `email` VARCHAR(255) NULL,
    PRIMARY KEY (`id`),
) ENGINE = InnoDB COMMENT = 'Information about the library';

-- Table books
CREATE TABLE IF NOT EXISTS `books` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255),
    `author` VARCHAR(255),
    `isbn` VARCHAR(13) NOT NULL,
    `publication_date` DATE NULL,
    `genre` VARCHAR(255) NULL,
    `available` BOOLEAN,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_library` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`),
    UNIQUE INDEX `isbn_UNIQUE` (`isbn` ASC) VISIBLE,
    UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE
) ENGINE = InnoDB COMMENT = 'A single book details';

-- Table users
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255),
    `password` VARCHAR(255),
    `name` VARCHAR(255),
    `email` VARCHAR(255),
    `role` ENUM('librarian', 'staff', 'member'),
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_library` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
) ENGINE = InnoDB COMMENT = 'A table for user details';

-- Borrowing history
CREATE TABLE IF NOT EXISTS `borrowing_history` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `borrowed_date` DATETIME,
    `due_date` DATETIME,
    `returned_date` DATETIME,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_library` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`),
    CONSTRAINT `fk_user_id` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_book_id` FOREIGN KEY (`id`) REFERENCES `book` (`id`),
) ENGINE = InnoDB COMMENT = 'A table to record borrowing history';

-- Fines
CREATE TABLE IF NOT EXISTS `fines` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL,
    `paid` BOOLEAN,
    CONSTRAINT `fk_library` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`),
    CONSTRAINT `borrowing_histroy` FOREIGN KEY (`id`) REFERENCES `borrowing_history`(`id`),
) ENGINE = InnoDB COMMENT = `A table to record book overdue days`