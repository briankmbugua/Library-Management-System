const db = require('../services/db');

class FinesModel {
    static async recordFine(borrowingId, amount) {
        try {
            const query = 'INSERT INTO fines (borrowing_history_id, amount, paid) VALUES (?, ?, false)';
            const params = [borrowingId, amount];
            const result = await db.query(query, params);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async markFineAsPaid(fineId) {
        try {
            const query = 'UPDATE fines SET paid = true WHERE id = ?';
            const result = await db.query(query, [fineId]);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getUnpaidFines(userId) {
        try {
            const query = 'SELECT * FROM fines WHERE user_id = ? AND paid = false';
            const results = await db.query(query, [userId]);

            return results || [];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FinesModel;
