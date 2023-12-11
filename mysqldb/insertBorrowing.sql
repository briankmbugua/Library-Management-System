USE library_db;

-- Insert borrowing history for Kiambu Library (library_id = 1)
INSERT INTO
    `borrowing_history` (
        `borrowed_date`,
        `due_date`,
        `returned_date`,
        `library_id`,
        `user_id`,
        `book_id`
    )
VALUES
    (
        '2022-03-01',
        '2022-03-15',
        '2022-03-10',
        1,
        1,
        1
    ),
    (
        '2022-04-01',
        '2022-04-15',
        '2022-04-10',
        1,
        2,
        2
    ),
    (
        '2022-05-01',
        '2022-05-15',
        '2022-05-10',
        1,
        3,
        3
    ),
    (
        '2022-06-01',
        '2022-06-15',
        '2022-06-10',
        1,
        4,
        4
    );

-- Insert borrowing history for Nairobi Central Library (library_id = 2)
INSERT INTO
    `borrowing_history` (
        `borrowed_date`,
        `due_date`,
        `returned_date`,
        `library_id`,
        `user_id`,
        `book_id`
    )
VALUES
    (
        '2022-03-15',
        '2022-03-30',
        '2022-03-25',
        2,
        5,
        5
    ),
    (
        '2022-04-15',
        '2022-04-30',
        '2022-04-25',
        2,
        6,
        6
    ),
    (
        '2022-05-15',
        '2022-05-30',
        '2022-05-25',
        2,
        7,
        7
    ),
    (
        '2022-06-15',
        '2022-06-30',
        '2022-06-25',
        2,
        8,
        8
    );

-- Insert borrowing history for Mombasa Public Library (library_id = 3)
INSERT INTO
    `borrowing_history` (
        `borrowed_date`,
        `due_date`,
        `returned_date`,
        `library_id`,
        `user_id`,
        `book_id`
    )
VALUES
    (
        '2022-03-30',
        '2022-04-15',
        '2022-04-10',
        3,
        9,
        9
    ),
    (
        '2022-04-30',
        '2022-05-15',
        '2022-05-10',
        3,
        10,
        10
    ),
    (
        '2022-05-30',
        '2022-06-15',
        '2022-06-10',
        3,
        11,
        11
    ),
    (
        '2022-06-30',
        '2022-07-15',
        '2022-07-10',
        3,
        12,
        12
    );

-- Insert borrowing history for Eldoret City Library (library_id = 4)
INSERT INTO
    `borrowing_history` (
        `borrowed_date`,
        `due_date`,
        `returned_date`,
        `library_id`,
        `user_id`,
        `book_id`
    )
VALUES
    (
        '2022-04-15',
        '2022-04-30',
        '2022-04-25',
        4,
        13,
        13
    ),
    (
        '2022-05-15',
        '2022-05-30',
        '2022-05-25',
        4,
        14,
        14
    ),
    (
        '2022-06-15',
        '2022-06-30',
        '2022-06-25',
        4,
        15,
        15
    ),
    (
        '2022-07-15',
        '2022-07-30',
        '2022-07-25',
        4,
        16,
        16
    );