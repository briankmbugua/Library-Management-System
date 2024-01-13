const db = require('../services/db');

class BooksModel {
    static async addBook(title, author, isbn, publication_date, genre, available, library_id) {
        try {
            console.log('Received parameters in addBook model:');
            console.log('title:', title);
            console.log('author:', author);
            console.log('isbn:', isbn);
            console.log('publication_date:', publication_date);
            console.log('genre:', genre);
            console.log('available:', available);
            console.log('library_id:', library_id);
            const query = 'INSERT INTO books (title, author, isbn, publication_date, genre, available, library_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const params = [
                title || null,
                author || null,
                isbn || null,
                new Date(publication_date) || null,
                genre || null,
                available,
                library_id || null
            ];
            const result = await db.query(query, params);

            if (result && result.insertId) {
                const bookId = result.insertId;
                return { bookId, title, author, isbn, publication_date, genre, available: true, library_id };
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    static async getBookById(bookId) {
        try {
            const query = 'SELECT * FROM books WHERE id = ?';
            const results = await db.query(query, [bookId]);

            return results[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async updateBookDetails(bookId, updatedDetails) {
        try {
            const { title, author, isbn, publicationDate, genre } = updatedDetails;
            const query = 'UPDATE books SET title = ?, author = ?, isbn = ?, publication_date = ?, genre = ? WHERE id = ?';
            const params = [title, author, isbn, publicationDate, genre, bookId];
            const result = await db.query(query, params);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteBook(bookId) {
        try {
            const query = 'DELETE FROM books WHERE id = ?';
            const result = await db.query(query, [bookId]);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getAllBooks(libraryId) {
        try {
            const query = 'SELECT * FROM books WHERE library_id = ?';
            const results = await db.query(query, [libraryId]);

            return results || [];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BooksModel;

