const db = require('../services/db');

class BorrowingModel {
    static async issueBook(userId, bookId, libraryId) {
        try {
            const query = 'INSERT INTO borrowing_history (user_id, book_id, library_id, borrowed_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';
            const params = [userId, bookId, libraryId];
            const result = await db.query(query, params);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async returnBook(borrowingId) {
        try {
            const query = 'UPDATE borrowing_history SET returned_date = CURRENT_TIMESTAMP WHERE id = ?';
            const result = await db.query(query, [borrowingId]);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async calculateFine(borrowingId) {
        try {
            const historyQuery = 'SELECT borrowed_date, due_date, returned_date FROM borrowing_history WHERE id = ?';
            const historyResult = await db.query(historyQuery, [borrowingId]);

            if (historyResult.length > 0) {
                const { borrowed_date, due_date, returned_date } = historyResult[0];
                const overdueDays = Math.max(0, new Date(returned_date || new Date()) - new Date(due_date));
                const fineAmountPerDay = 1; // Adjust this value based on your fine calculation logic
                const fine = overdueDays * fineAmountPerDay;

                return fine;
            } else {
                return 0;
            }
        } catch (error) {
            throw error;
        }
    }

    static async getBorrowingHistory(userId, libraryId) {
        try {
            const query = 'SELECT * FROM borrowing_history WHERE user_id = ? AND library_id = ?';
            const results = await db.query(query, [userId, libraryId]);

            return results || [];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BorrowingModel;
