const bcrypt = require('bcrypt');
const db = require('../services/db.js');

class UsersModel {
    static async registerUser(username, password, name, email, usertype, library_id = 4) {
        try {
            const hashedPassword = hashPassword(password);
            const query = 'INSERT INTO users (username, password, name, email, role, library_id) VALUES (?, ?, ?, ?, ?)';
            const params = [username || null, hashedPassword || null, name || null, email || null, usertype || null, library_id] || null;
            console.log(params.username)
            const result = await db.query(query, params);
            if (result && result.insertId) {
                return { userId: result.insertId, username, name, email, role: usertype };
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }


    static async getUserById(userId) {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const params = [userId];
            const results = await db.query(query, params);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw error;
        }
    }


    static async updateUserDetails(userId, updateDetails) {
        try {
            const { username, password, name, email } = updateDetails;

            const query = 'UPDATE users SET username = ?, password = ?, name = ?, email = ? WHERE id = ?';
            const params = [username, password, name, email, userId];

            const result = await db.query(query, params);

            // Check if the update was successful
            if (result.affectedRows > 0) {
                return { success: true, message: 'User details updated successfully' };
            } else {
                return { success: false, message: 'User not found or no changes applied' };
            }
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(userId) {
        try {
            const query = 'DELETE FROM users WHERE id = ?';
            const params = [userId];

            const result = await db.query(query, params);
            if (result.affectedRows > 0) {
                return { success: true, message: 'User deleted successfully' };
            } else {
                return { success: false, message: 'User not found or deletion unsuccessful' };
            }
        } catch (error) {
            throw error;
        }
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}


module.exports = UsersModel;