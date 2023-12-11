USE library_db;

-- -- Insert data into libraries table
-- INSERT INTO
--     `libraries` (`name`, `address`, `phone_number`, `email`)
-- VALUES
--     (
--         'Kiambu Library',
--         '123 Kiambu Street',
--         '+12378987',
--         'kiambu.library@example.com'
--     ),
--     (
--         'Nairobi Central Library',
--         '456 Nairobi Street',
--         '+98765432',
--         'central.library@example.com'
--     ),
--     (
--         'Mombasa Public Library',
--         '789 Mombasa Street',
--         '+45612378',
--         'mombasa.library@example.com'
--     ),
--     (
--         'Eldoret City Library',
--         '101 Eldoret Street',
--         '+87654321',
--         'eldoret.library@example.com'
--     );
-- Insert data into books table
-- Insert data into books table
INSERT INTO
    `books` (
        `title`,
        `author`,
        `isbn`,
        `publication_date`,
        `genre`,
        `available`,
        `library_id`
    )
VALUES
    (
        'Advanced Java Programming',
        'James Smith',
        '9781234567890',
        '2021-05-15',
        'Programming',
        true,
        1
    ),
    (
        'Data Science Essentials',
        'Emily Johnson',
        '6543210987654',
        '2020-11-20',
        'Data Science',
        true,
        3
    ),
    (
        'Historical Fiction Masterpiece',
        'Amanda Lee',
        '1234567890123',
        '2019-08-10',
        'Fiction',
        true,
        4
    ),
    (
        'Introduction to Web Development',
        'Daniel Brown',
        '9876543210123',
        '2022-03-03',
        'Web Development',
        true,
        2
    );

-- -- Insert data into users table
INSERT INTO
    `users` (
        `username`,
        `password`,
        `name`,
        `email`,
        `role`,
        `library_id`
    )
VALUES
    (
        'john',
        'password123',
        'john kinyanjui',
        'john@example.com',
        'member',
        2
    );

-- -- Insert data into borrowing_history table
-- INSERT INTO
--     `borrowing_history` (
--         `borrowed_date`,
--         `due_date`,
--         `returned_date`,
--         `library_id`,
--         `user_id`,
--         `book_id`
--     )
-- VALUES
--     (
--         '2022-02-01',
--         '2022-02-15',
--         '2022-02-10',
--         2,
--         3,
--         3
--     );