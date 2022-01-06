class authModel{

    static async getList(limit, offset, con){
        const [count, a] = await con.execute(`SELECT count(*) as total FROM users`);
        const [list, b] = await con.execute(`SELECT username, first_name, last_name, type, status FROM users limit ${limit} OFFSET ${offset}`);

        let result = {
            total : count[0].total, 
            list : list
        }

        return result;        
    }

    static async register(username, password, first_name, last_name, type, status, con){
        await con.execute(`INSERT INTO users 
            (username, password, first_name, last_name, type, status) 
            VALUES
            ('${username}', '${password}', '${first_name}', '${last_name}', '${type}', '${status}')`)
    }

    static async findByCredentials(username, password, con){
        // Search for a user by email and password.
        const [user, b] = await con.execute(`SELECT * FROM users WHERE username = '${username}' limit 1`);
        if(!user[0]){
            return { err : true, msg : "Invalid login credentials" }
        }

        return { err : false, msg : "Login success", user : user[0] }
    }
}

module.exports = authModel;