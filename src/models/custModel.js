class custModel{

    static async getList(limit, offset, con){
        const [count, a] = await con.execute(`SELECT count(*) as total FROM customers`);
        const [list, b] = await con.execute(`SELECT cust_id, first_name, last_name, type FROM customers limit ${limit} OFFSET ${offset}`);

        let result = {
            total : count[0].total, 
            list : list
        }

        return result;        
    }

    static async createCustomer(req){
        const { cust_id, first_name, last_name, address, type, status } = req.body 
        const con = await req.con;
        await con.execute(`INSERT INTO customers 
            (cust_id, first_name, last_name, address, type, status) 
            VALUES
            ('${cust_id}', '${first_name}', '${last_name}', '${address}', '${type}', '${status}')`)
    }

    static async getDetail(custid, con){
        const [list, b] = await con.execute(`SELECT * FROM customers WHERE cust_id = ${custid} limit 1`);
        return list;
    }

    static async update(req){        
        const { custid } = req.params;
        const { first_name, last_name, address, type, status } = req.body 
        const con = await req.con;
        await con.execute(`UPDATE customers 
            SET 
            first_name='${first_name}', 
            last_name='${last_name}', 
            address='${address}', 
            type='${type}', 
            status='${status}' 
            WHERE
            cust_id = '${custid}'`)
    }

    static async delete(req){
        const { custid } = req.params;
        const con = await req.con;
        await con.execute(`DELETE FROM customers WHERE cust_id = '${custid}'`)
    }
}

module.exports = custModel;