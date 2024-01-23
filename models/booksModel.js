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


    static async getAllBooksForLoggedInLibrarian(user) {
        try {
            const libraryId = user.library.id; // Assuming the library id is available in req.user.library.id
            const query = 'SELECT * FROM books WHERE library_id = ?';
            const params = [libraryId];
            const results = await db.query(query, params);

            return results;
        } catch (error) {
            throw error;
        }
    }

    // static async updateBookDetails(bookId, library_id, updatedDetails) {
    //     try {
    //         const { title, author, isbn, publicationDate, genre } = updatedDetails;
    //         const query = 'UPDATE books SET title = ?, author = ?, genre = ? publicationDate = ? WHERE id = ?  AND library_id = ?';
    //         //UPDATE books SET title = "bri" ,genre = "comedy" WHERE id = 1 AND library_id = 2;
    //         const params = [title, author, isbn, publicationDate, genre, bookId, library_id];
    //         const result = await db.query(query, params);

    //         return result.affectedRows > 0;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    static async updateBookDetails(bookId, library_id, updatedDetails) {
        try {
            const { title, author, isbn, publicationDate, genre } = updatedDetails;
            const queryParams = [];
            const updateFields = [];
    
            if (title) {
                updateFields.push('title = ?');
                queryParams.push(title);
            }
    
            if (author) {
                updateFields.push('author = ?');
                queryParams.push(author);
            }
    
            if (isbn) {
                updateFields.push('isbn = ?');
                queryParams.push(isbn);
            }
    
            if (publicationDate) {
                updateFields.push('publicationDate = ?');
                queryParams.push(publicationDate);
            }
    
            if (genre) {
                updateFields.push('genre = ?');
                queryParams.push(genre);
            }
    
            // Ensure that there's at least one field to update
            if (updateFields.length === 0) {
                return false; // No fields to update
            }
    
            const query = `UPDATE books SET ${updateFields.join(', ')} WHERE id = ? AND library_id = ?`;
            console.log(`from updatebook ${query}`);
            queryParams.push(bookId, library_id);
    
            const result = await db.query(query, queryParams);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
    

    static async deleteBook(bookId, library_id) {
        try {
            const query = 'DELETE FROM books WHERE id = ? AND library_id = ?;';
            const result = await db.query(query, [bookId, library_id]);

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

