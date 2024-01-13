CREATE DATABASE IF NOT EXISTS library_db;

USE library_db;

-- Table library
CREATE TABLE IF NOT EXISTS `libraries` (
    `library_id` INT NOT NULL AUTO_INCREMENT,
    `library_name` VARCHAR(255) NOT NULL,
    `library_address` VARCHAR(255) NOT NULL,
    `library_phone_number` VARCHAR(15) NOT NULL,
    `library_email` VARCHAR(255) NOT NULL,
    UNIQUE INDEX `library_name_UNIQUE` (`library_name` ASC) VISIBLE,
    UNIQUE INDEX `library_address_UNIQUE` (`library_address` ASC) VISIBLE,
    UNIQUE INDEX `library_phone_number_UNIQUE` (`library_phone_number` ASC) VISIBLE,
    UNIQUE INDEX `library_email_UNIQUE` (`library_email` ASC) VISIBLE,
    PRIMARY KEY (`library_id`)
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
    -- Added the missing library_id field
    `library_id` INT,
    PRIMARY KEY (`id`),
    CONSTRAINT `book_library` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`library_id`),
    UNIQUE INDEX `isbn_UNIQUE` (`isbn` ASC) VISIBLE,
) ENGINE = InnoDB COMMENT = 'A single book details';

-- Table users
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` ENUM('librarian', 'staff', 'member'),
    `library_id` INT,
    -- Added the missing library_id field
    PRIMARY KEY (`user_id`),
    CONSTRAINT `users_library` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`library_id`),
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
) ENGINE = InnoDB COMMENT = 'A table for user details';

-- Borrowing history
CREATE TABLE IF NOT EXISTS `borrowing_history` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `borrowed_date` DATETIME,
    `due_date` DATETIME,
    `returned_date` DATETIME,
    -- missing library_id field
    `library_id` INT,
    -- added missing user_id field
    `user_id` INT,
    -- added the missing book_id field
    `book_id` INT,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_library_borrowing` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`library_id`),
    CONSTRAINT `fk_user_borrowing` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
    CONSTRAINT `fk_book_borrowing` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE = InnoDB COMMENT = 'A table to record borrowing history';

-- Fines
CREATE TABLE IF NOT EXISTS `fines` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL,
    `paid` BOOLEAN,
    -- Added the missing library_id field
    `library_id` INT,
    -- Added the missing borrowing_history_id field
    `borrowing_history_id` INT,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_library_fines` FOREIGN KEY (`library_id`) REFERENCES `libraries` (`library_id`),
    CONSTRAINT `borrowing_histroy_fines` FOREIGN KEY (`borrowing_history_id`) REFERENCES `borrowing_history`(`id`)
) ENGINE = InnoDB COMMENT = 'A table to record book overdue days';