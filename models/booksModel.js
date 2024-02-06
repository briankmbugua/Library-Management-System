const db = require('../services/db');

class BooksModel {
    static async addBook(title, author, isbn, publication_date, genre, available = true, library_id) {
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

    static async updateBookDetails(bookId, libraryId, updatedDetails) {
        try {
            const queryParts = [];
            const params = [];
            for (const key in updatedDetails) {
                if (updatedDetails.hasOwnProperty(key)) {
                    queryParts.push(`${key} = ?`);
                    params.push(updatedDetails[key]);
                }
            }

            const query = `UPDATE books SET ${queryParts.join(',')} WHERE id = ? AND library_id = ?`;
            console.log(`from updateBookDetails the ${query}`);
            params.push(bookId, libraryId);

            const result = await db.query(query, params);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteBook(user, bookId) {
        try {
            const libraryId = user.library.id;
            const query = 'DELETE FROM books WHERE id = ? AND library_id = ?';
            const params = [bookId, libraryId];
            const results = await db.query(query, params);
            if (results) {
                return {"succes":"Book deleted succesfuly"}
            } else {
               return {"message":"Book not found"} 
            }
        } catch (error) {
            console.error("error", error);
        }
    }


    static async getAllBooksForLoggedInLibrarian(user) {
        try {
            const libraryId = user.library.id;
            const query = 'SELECT * FROM books WHERE library_id = ?';
            const params = [libraryId];
            const results = await db.query(query, params);

            return results;
        } catch (error) {
            throw error;
        }
    }

    static async checkBookAvailability(bookId, library_id) {
        try {
            console.log(`from checkBookAvailability:bookId ${bookId}`);
            console.log(`from checkBookAvailability:bookId ${library_id}`);
            const query = 'SELECT available FROM books WHERE id = ? AND library_id = ?';
            const params = [bookId, library_id];
            const [result] = await db.query(query, params);
            console.log(`from checkBookAvailability:queryResults ${result}`);
            if (result) {
                const isAvailable = result.available;
                return { available: isAvailable };
            } else {
                return { error: 'Book not found' };
            }
        } catch (error) {
            console.error('Error in checkBookAvailability:', error.message);
            return { error: 'Internal Server Error' };
        }
    }

    static async changeBookAvailability(bookId, library_id, newAvailability) {
        try {
            const query = 'UPDATE books SET available = ? WHERE id = ? AND library_id = ?';
            const params = [newAvailability, bookId, library_id];
            const result = await db.query(query, params);

            if (result.affectedRows > 0) {
                return { success: true };
            } else {
                return { error: 'Book not found or already has the specified availability' };
            }
        } catch (error) {
            console.error('Error in changeBookAvailability:', error.message);
            return { error: 'Internal Server Error' };
        }
    }



}

module.exports = BooksModel;

