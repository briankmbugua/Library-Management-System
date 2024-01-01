const bcrypt = require('bcrypt');
const db = require('../services/db.js');
const libraries = require('./librariesModel.js')

class UsersModel {
    static async registerUser(username, password,  user_email, usertype, library_name, address, phone_number) {
        try {
            //first register the library to use the library_id below with user
            const addlibraryResult = libraries.addLibrary(library_name,address, phone_number, email);
            const hashedPassword = hashPassword(password);
            const query = 'INSERT INTO users (username, password, name, email, role, library_id) VALUES (?, ?, ?, ?, ?)';
            const params = [username || null, hashedPassword || null, email || null, usertype || null, addlibraryResult.insertId || null];
            console.log(params)
            const result = await db.query(query, params);
            if (result && result.insertId) {
                return { userId: result.insertId, username, email, role: usertype };
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
    /*
    const bcrypt = require('bcryptjs');

// Registration middleware (modified)
async function registrationMiddleware(req, res, next) {
    const { username, password, name, email, role, library_name, library_address } = req.body;

    try {
        // Validate user input and library information

        // Create library if necessary
        const libraryInsertResult = await db.query('INSERT INTO libraries (name, address) VALUES (?, ?)', [library_name, library_address]);

        const library_id = libraryInsertResult.insertId;

        // Hash password and insert user
        const hashedPassword = await bcrypt.hash(password, 10);

        const userInsertResult = await db.query('INSERT INTO users (username, password, name, email, role, library_id) VALUES (?, ?, ?, ?, ?, ?)', [username, hashedPassword, name, email, role, library_id]);

        // Handle success
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
}

module.exports = registrationMiddleware;

     */


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