USE library_db;

-- Insert users for Kiambu Library (library_id = 1)
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
        'user1',
        'password123',
        'User One',
        'user1@example.com',
        'member',
        1
    ),
    (
        'user2',
        'password456',
        'User Two',
        'user2@example.com',
        'member',
        1
    ),
    (
        'librarian1',
        'librarian123',
        'Librarian One',
        'librarian1@example.com',
        'librarian',
        1
    ),
    (
        'staff1',
        'staff123',
        'Staff One',
        'staff1@example.com',
        'staff',
        1
    );

-- Insert users for Nairobi Central Library (library_id = 2)
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
        'user3',
        'password789',
        'User Three',
        'user3@example.com',
        'member',
        2
    ),
    (
        'user4',
        'passwordabc',
        'User Four',
        'user4@example.com',
        'member',
        2
    ),
    (
        'librarian2',
        'librarian456',
        'Librarian Two',
        'librarian2@example.com',
        'librarian',
        2
    ),
    (
        'staff2',
        'staff456',
        'Staff Two',
        'staff2@example.com',
        'staff',
        2
    );

-- Insert users for Mombasa Public Library (library_id = 3)
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
        'user5',
        'passworddef',
        'User Five',
        'user5@example.com',
        'member',
        3
    ),
    (
        'user6',
        'passwordghi',
        'User Six',
        'user6@example.com',
        'member',
        3
    ),
    (
        'librarian3',
        'librarian789',
        'Librarian Three',
        'librarian3@example.com',
        'librarian',
        3
    ),
    (
        'staff3',
        'staff789',
        'Staff Three',
        'staff3@example.com',
        'staff',
        3
    );

-- Insert users for Eldoret City Library (library_id = 4)
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
        'user7',
        'passwordjkl',
        'User Seven',
        'user7@example.com',
        'member',
        4
    ),
    (
        'user8',
        'passwordmno',
        'User Eight',
        'user8@example.com',
        'member',
        4
    ),
    (
        'librarian4',
        'librarianabc',
        'Librarian Four',
        'librarian4@example.com',
        'librarian',
        4
    ),
    (
        'staff4',
        'staffabc',
        'Staff Four',
        'staff4@example.com',
        'staff',
        4
    );