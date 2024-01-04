const bcrypt = require('bcrypt');
const db = require('../services/db.js');
const libraries = require('./librariesModel.js')

class UsersModel {
    static async registerUser(username, password,  email, role ,  library_name, library_address, library_phone_number, library_email) {
        try {
            //first register the library to use the library_id below with user
            const addlibraryResult = await libraries.addLibrary(library_name,library_address,library_phone_number, library_email);
            console.log(`addLibrartResult ${addlibraryResult.library_id}`)
            console.log(JSON.stringify(addlibraryResult, null, 2));
            let library_id;
            console.log(`the library_id from registerUser ${addlibraryResult.library_id}`);
            if(addlibraryResult && addlibraryResult.library_id) {
                library_id = addlibraryResult.library_id;
                const hashedPassword = await hashPassword(password);
                console.log(`the params:${hashedPassword}`)
                role = "librarian"
                const query = 'INSERT INTO users (username, password, email, role, library_id) VALUES (?, ?, ?, ?, ?)';
                const params = [username, hashedPassword, email, role, library_id];
                console.log(`the params:${params}`)
                const result = await db.query(query, params);
                if (result) {
                    return { userId: result.insertId, username, email, role};
                } else {
                    return null;
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
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

// async function hashPassword(password) {
//     const saltRounds = 10;
//     return bcrypt.hash(password, saltRounds);
// }

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}



module.exports = UsersModel;