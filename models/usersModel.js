const bcrypt = require('bcrypt');
const db = require('../services/db.js');

class UsersModel {
    static async registerLibrarianAndLibrary(username, password, name, email, libraryName, libraryAddress, libraryPhoneNumber, libraryEmail) {
        const hashedPassword = hashPassword(password);
        try {
            // Register librarian
            const librarianQuery = 'INSERT INTO users (username, password, name, email, role) VALUES (?, ?, ?, ?, ?)';
            const librarianParams = [username, hashedPassword, name, email, 'librarian'];
            const librarianResult = await db.query(librarianQuery, librarianParams);

            if (librarianResult && librarianResult.insertId) {
                //Register library and associate it with the librariab
                const libraryQuery = 'INSERT INTO libraries (name, address, phone_number, email, librarian_id) VALUES(?, ?, ?, ?, ?)';
                libraryParams = [libraryName, libraryAddress, libraryPhoneNumber, libraryEmail, librarianResult.insertId];
                const libraryResult = await db.query(libraryQuery, libraryParams);

                if (libraryResult) {
                    return { librarianId: librarianResult.insertId, libraryId: libraryResult.insertId };
                }

            }

            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(userId) {

    }

    static async getUserByName(username) {

    }

    static async updateUserDetails(userId, updateDetails) {

    }

    static async deletUser(userId) {

    }

    static async addStaff(username, password, name, email) {

    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}


module.exports = UsersModel;