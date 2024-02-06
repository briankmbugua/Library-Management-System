const bcrypt = require('bcrypt');
const db = require('../services/db.js');
const libraries = require('./librariesModel.js')

class UsersModel {
    static async registerLibrarianAndLibrary(username, password,  email, role ,  library_name, library_address, library_phone_number, library_email) {
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
                const query = 'INSERT INTO librarians (username, password, email, role, library_id) VALUES (?, ?, ?, ?, ?)';
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

    static async getLibrarianByUsername(username) {
        try {
            const query = 'SELECT * FROM librarians WHERE username = ?';
            const params = [username];
            const results = await db.query(query, params);
    
            if (results.length > 0) {
                return results[0];
            } else {
                return null; 
            }
        } catch (error) {
            console.error('Error in getLibrarianByUsernameAndLibrary:', error.message);
            return null; 
        }
    }


    //Members
    //Registration
    static async registerLibraryMember(username, email, library_id) {
        try {
            const query = 'INSERT INTO members(username, email,  library_id) VALUES (?, ?, ?)';
            const params = [username,  email, library_id];
            const result = await db.query(query, params);
            if (result) {
                return {userId: result.insertId, username, email};
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    //get
    static async getAllMembersForLoggedInLibrarian(library_id) {
        try {
            console.log(`fromAllMembersFprLoggedInLibrarian the library_id from user ${library_id}`);
            const query = 'SELECT * FROM members WHERE library_id = ?';
            const params = [library_id];
            const results = await db.query(query, params);
            return results.length > 0 ? results : null;
        } catch (error) {
            throw error;
        }
    }
    //delete a libraryMember
    static async deleteMember(memberID, libraryId) {
        try {
            const query = 'DELETE FROM members WHERE id = ? AND library_id = ?';
            const params = [memberID, libraryId];
    
            const result = await db.query(query, params);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Member deleted successfully' };
            } else {
                return { success: false, message: 'Member not found in the specified library or deletion unsuccessful' };
            }
        } catch (error) {
            throw error;
        }
    }
    //update a libraryMember
    static async updateMemberDetails(memberID, libraryId, updateDetails) {
        try {
            const { username,  name, email } = updateDetails;
    
            const query = 'UPDATE members SET username = ?, name = ?, email = ? WHERE id = ? AND library_id = ?';
            const params = [username, name, email, memberID, libraryId];
    
            const result = await db.query(query, params);
    
            // Check if the update was successful
            if (result.affectedRows > 0) {
                return { success: true, message: 'Member details updated successfully' };
            } else {
                return { success: false, message: 'Memeber not found in the specified library or no changes applied' };
            }
        } catch (error) {
            throw error;
        }
    }
    //check whether a member has a currently issued book.



    static async getMemberByMemberIdAndLibraryId(userId, libraryId) {
        try {
            const query = 'SELECT * FROM members WHERE id = ? AND library_id = ?';
            const params = [userId, libraryId];
            const results = await db.query(query, params);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw error;
        }
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}



module.exports = UsersModel;