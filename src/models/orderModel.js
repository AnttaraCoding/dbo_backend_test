class orderModel{

    static async getList(limit, offset, con){
        const [count, a] = await con.execute(`SELECT count(*) as total FROM orders`);
        const [list, b] = await con.execute(`SELECT *, price*qty as total FROM orders limit ${limit} OFFSET ${offset}`);

        let result = {
            total : count[0].total, 
            list : list
        }

        return result;        
    }

    static async createOrder(req){
        const { order_id, cust_id, item, price, qty } = req.body 
        const { username } = req.islogin
        const con = await req.con;
        await con.execute(`INSERT INTO orders 
            (order_id, cust_id, item, price, qty, user_id) 
            VALUES
            ('${order_id}', '${cust_id}', '${item}', '${price}', '${qty}', '${username}')`)
    }

    static async getDetail(order_id, con){
        const [list, b] = await con.execute(`SELECT * FROM orders WHERE order_id = ${order_id}`);
        return list;
    }

    static async update(req){        
        const { id } = req.params;
        const { item, price, qty } = req.body 
        const { username } = req.islogin
        const con = await req.con;
        await con.execute(`UPDATE orders 
            SET 
            item='${item}', 
            price='${price}', 
            qty='${qty}', 
            user_id='${username}'
            WHERE
            id = '${id}'`)
    }

    static async delete(req){
        const { custid } = req.params;
        const con = await req.con;
        await con.execute(`DELETE FROM orders WHERE cust_id = '${custid}'`)
    }
}

module.exports = orderModel;