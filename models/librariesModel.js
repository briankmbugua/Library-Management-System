const db = require('../services/db.js');
const { getOffset } = require('../helper.js')

class Libraries {
    static async getAllLibraries(currentPage = 1) {
        const listPerPage = require('../config.js').listPerPage;
        const offset = getOffset(currentPage, listPerPage);
        const query = `SELECT * FROM libraries LIMIT ${offset}, ${listPerPage}`;
        try {
            const results = await db.query(query);
            return results;
        } catch (error) {
            throw error;
        }
    }
    static async getLibraryById(id) {
        const query = 'SELECT * FROM libraries WHERE id = ?';

        try {
            const results = await db.query(query, [id]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
    static async addLibrary(name, address, phone_number, email) {
        try {
            const query = 'INSERT INTO libraries(name, address, phone_number, email) VALUES(?, ?, ?,?)';
            const params = [name, address, phone_number, email];
            const result = await db.query(query, params);

            if (result && result.insertId) {
                return { libraryId: result.insertId, name, address, phone_number, email };
            }
            else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    static async updateLibraryDetails(libraryId, updatedDetails) {
        try {
            const query = 'UPDATE libraries SET name = ?, address = ?, phone_number = ? email = ? WHERE id = ?';
            const { name, address, phone_number, email } = updatedDetails;
            const params = [name, address, phone_number, email, libraryId];
            const result = await db.query(query, params);

            if (result.affectedRows > 0) {
                return { success: true, message: 'Library details updated succesfully' };
            }
            else {
                return { success: false, message: 'Library not found or no changes applied' };
            }
        } catch (error) {
            throw error;
        }
    }

    static async deleteLibrary(libraryId) {
        try {
            const query = ' DELETE FROM libraries WHERE id = ?';
            const params = [libraryId];
            const result = await db.query(query, params);

            if (result.affectedRows > 0) {
                return { succes: true, message: 'Library deleted successfully' };
            }
            else {
                return { succes: false, message: 'Library not found' };
            }
        } catch (error) {
            throw error;
        }
    }
}


module.exports = Libraries;

