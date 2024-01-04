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
    static async getLibraryById(library_id) {
        const query = 'SELECT * FROM libraries WHERE library_id = ?';

        try {
            const results = await db.query(query, [library_id]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
    static async addLibrary(library_name,library_address,library_phone_number, library_email) {
        try {
            console.log("registering library")
            const query = 'INSERT INTO libraries(library_name,library_address,library_phone_number, library_email) VALUES(?, ?, ?, ?)';
            const params = [library_name,library_address,library_phone_number, library_email];
            console.log(params);
            const result = await db.query(query, params);
            console.log(result);
            if (result && result.insertId) {
                const library_id = result.insertId;
                console.log(library_id);
                return { library_id};
            }
            else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    static async updateLibraryDetails(library_id, updatedDetails) {
        try {
            const query = 'UPDATE libraries SET library_name = ?, library_address = ?, library_phone_number = ? library_email = ? WHERE library_id = ?';
            const { library_name, library_address, library_phone_number, library_email } = updatedDetails;
            const params = [library_name, library_address, library_phone_number, library_email, library_id];
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

