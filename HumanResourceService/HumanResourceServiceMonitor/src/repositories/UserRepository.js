// const query = require('../configs/DbConfig');
const db = require('../configs/DbConfig');
const dataUtil = require('../utils/DataUtil')

const { getCreateUserResponseDTO } = require('../models/UserModel');

const getUsers = (callback) => {
    query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            return callback(error);
        }
        return callback(null, results.rows);
    });
};

const getUserById = (id, callback) => {

    query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            return callback(error);
        }
        return callback(null, results.rows);
    })
};

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
      FROM programming_languages LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}


async function getUserByEmail(params, callback) {
    const { email } = params;
    try {
        const rows = await db.query(
            `SELECT * FROM users WHERE email = '${email}'`
        );
        const data = dataUtil.emptyOrRows(rows);
        return {
            data,
        }
    }
    catch (error) {
        throw error;
    }

}

const createUser = async (params, callback) => {
    const { name, email, password, role, gender, religion, security_number, age, birth_date } = params

    try {
        const rows = await db.query(
            'INSERT INTO employee_data (name, email, password,role,gender,religion,security_number,age,birth_date) VALUES (?, ?, ?,?,?,?,?,?,?)',
            [name, email, password, role, gender, religion, security_number, age, birth_date]
        );
        if (rows.affectedRows > 0) {
            const data = getCreateUserResponseDTO(params);
            return {
                data,
            }
        } else {
            throw new Error('Failed to inserted user');
        }
    }
    catch (error) {
        throw error;
    }
}

const updateUser = (id, userData, callback) => {
    const { name, email } = userData

    query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id,name,email',
        [name, email, id],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            if (results.rowCount === 1 && results.rows[0].id) {
                return callback(null, getCreateUserResponseDTO(results.rows[0]));
            } else {
                return callback(new Error('Failed to update user'));
            }
        }
    )
}

const deleteUser = (id, callback) => {
    query('DELETE FROM users WHERE id = $1 RETURNING id', [id], (error, results) => {
        if (error) {
            return callback(error);
        }
        if (results.rowCount === 1 && results.rows[0].id) {
            return callback(null, { id: results.rows[0].id });
        } else {
            return callback(new Error('Failed to delete user'));
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
}