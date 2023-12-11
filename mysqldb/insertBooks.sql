USE library_db;

-- Insert books for Kiambu Library (library_id = 1)
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
        'Python Fundamentals',
        'Michael Johnson',
        '1111111111111',
        '2022-01-15',
        'Programming',
        true,
        1
    ),
    (
        'Introduction to Data Structures',
        'Emma White',
        '2222222222222',
        '2021-05-20',
        'Computer Science',
        true,
        1
    ),
    (
        'The Art of SQL',
        'David Miller',
        '3333333333333',
        '2020-12-10',
        'Database',
        true,
        1
    ),
    (
        'Web Development with JavaScript',
        'Sophia Turner',
        '4444444444444',
        '2022-02-28',
        'Web Development',
        true,
        1
    );

-- Insert books for Nairobi Central Library (library_id = 2)
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
        'Java Programming Basics',
        'Alex Carter',
        '5555555555555',
        '2021-03-05',
        'Programming',
        true,
        2
    ),
    (
        'Machine Learning for Beginners',
        'Olivia Davis',
        '6666666666666',
        '2021-08-15',
        'Artificial Intelligence',
        true,
        2
    ),
    (
        'Cybersecurity Essentials',
        'William Johnson',
        '7777777777777',
        '2020-11-25',
        'Cybersecurity',
        true,
        2
    ),
    (
        'Frontend Web Development',
        'Emma Turner',
        '8888888888888',
        '2022-04-10',
        'Web Development',
        true,
        2
    );

-- Insert books for Mombasa Public Library (library_id = 3)
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
        'C++ Programming Guide',
        'Liam Smith',
        '9999999999999',
        '2021-02-01',
        'Programming',
        true,
        3
    ),
    (
        'Data Analysis with Python',
        'Sophie Brown',
        '1010101010101',
        '2021-06-12',
        'Data Science',
        true,
        3
    ),
    (
        'Historical Novels Collection',
        'Daniel Lee',
        '1212121212121',
        '2020-10-20',
        'Fiction',
        true,
        3
    ),
    (
        'Responsive Web Design',
        'Ava Wilson',
        '1313131313131',
        '2022-03-18',
        'Web Development',
        true,
        3
    );

-- Insert books for Eldoret City Library (library_id = 4)
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
        'Advanced Python Programming',
        'Ethan Johnson',
        '1414141414141',
        '2021-04-10',
        'Programming',
        true,
        4
    ),
    (
        'Big Data Analytics',
        'Isabella Davis',
        '1515151515151',
        '2021-07-30',
        'Data Science',
        true,
        4
    ),
    (
        'Classic Literature Masterpieces',
        'Mia Turner',
        '1616161616161',
        '2020-12-05',
        'Fiction',
        true,
        4
    ),
    (
        'Full Stack Web Development',
        'Liam Brown',
        '1717171717171',
        '2022-02-25',
        'Web Development',
        true,
        4
    );