const db = require('../services/db');
const BookModel = require('./booksModel');

class BorrowingModel {
    static async issueBook(book_id, member_id, libraryId) {
        try {
            console.log(`the id of the book being issued ${book_id}`);
            console.log(`the id of the member being issued the book ${member_id}`);
            console.log(`the library_id ${libraryId}`);
            const bookAvailability = await BookModel.checkBookAvailability(book_id, libraryId);
            console.log(`from borrowing Model ${JSON.stringify(bookAvailability)}`);
            if (!bookAvailability.error && bookAvailability.available) {
                
                const query = 'INSERT INTO borrowing_history (book_id, member_id, library_id, borrowed_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';
                const params = [book_id, member_id, libraryId];
                const result = await db.query(query, params);

                if (result.affectedRows > 0) {
                    
                    await BookModel.changeBookAvailability(book_id, libraryId, false);
                    return true;
                } else {
                    return false;
                }
            } else {
                
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    static async returnBook(borrowingId) {
        try {
            const query = 'UPDATE borrowing_history SET returned_date = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [borrowingId]);

            if (result.affectedRows > 0) {
                const borrowingHistory = await this.getBorrowingHistoryById(borrowingId);
                if (borrowingHistory && borrowingHistory.book_id && borrowingHistory.library_id) {
                    await BookModel.changeBookAvailability(borrowingHistory.book_id, borrowingHistory.library_id, true);
                }
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    static async calculateFine(borrowingId) {


        const historyQuery = 'SELECT borrowed_date, due_date, returned_date FROM borrowing_history WHERE id = ?';
        const historyResult = await db.query(historyQuery, [borrowingId]);

        if (historyResult.length > 0) {
            const { borrowed_date, due_date, returned_date } = historyResult[0];
            const overdueDays = Math.max(0, new Date(returned_date || new Date()) - new Date(due_date));
            const fineAmountPerDay = 1;
            const fine = overdueDays * fineAmountPerDay;

            return fine;
        } else {
            return 0;
        }
    } catch(error) {
        throw error;
    }


    static async getBorrowingHistory(userId, libraryId) {
        try {
            const query = 'SELECT * FROM borrowing_history WHERE member_id = ? AND library_id = ?';
            const results = await db.query(query, [userId, libraryId]);

            return results || [];
        } catch (error) {
            throw error;
        }
    }

    static async getBorrowingHistoryById(borrowingId) {
        try {
            const query = 'SELECT * FROM borrowing_history WHERE id = ?';
            const results = await db.query(query, [borrowingId]);

            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BorrowingModel;