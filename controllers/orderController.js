const db = require('../lib/db.js');
const jwt = require('jsonwebtoken');

module.exports = {
    createOrder: (req, res) =>
        {
            let idUser = "";
            const token = req.headers.authorization;
            if (!token)
            {
                return res.status(403).send('Token no proporcionado');
            }
            jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) =>
            {
                if (err)
                {
                    return res.status(401).send('Token inválido');
                }
                idUser = decoded.userId;
                //req.user = decoded;
            });
        
            db.query(
                "INSERT INTO orders (order_date, total_amount, customer_id) VALUES (NOW(), 0, ?);",
                [idUser],
                (err, results) =>
                {
                    if (!err)
                    {
                        for (let i = 0; i < req.body.products.length; i++)
                        {
                            console.log(req.body.products[i].name.replaceAll("-", " "));
                            db.query(
                                "SELECT * FROM products WHERE name = ?;",
                                [req.body.products[i].name.replaceAll("-", " ")],
                                (err0, rows0, fields) =>
                                {
                                    console.log(rows0);
                                    if (!err0)
                                    {
                                        db.query(
                                            "INSERT INTO order_items (product_id, order_id, quantity, sale_price) VALUES (?, ?, ?, ?);",
                                            [rows0[0].id, results.insertId, req.body.products[i].quantity, req.body.products[i].price * req.body.products[i].quantity],
                                            (err2, rows2, fields) =>
                                            {
                                                if (i == req.body.products.length - 1)
                                                {
                                                    res.json(rows2);
                                                }
                                                if (err2)
                                                {
                                                    res.json(err2);
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                    else
                    {
                        res.json(err)
                    }
                }
            );
        },
        listOrders: (req, res) =>
            {
                let idUser = "";
                const token = req.headers.authorization;
                if (!token)
                {
                    return res.status(403).send('Token no proporcionado');
                }
                jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) =>
                {
                    if (err)
                    {
                        return res.status(401).send('Token inválido');
                    }
                    idUser = decoded.userId;
                    //req.user = decoded;
                });
            
                db.query(
                    'SELECT * FROM orders WHERE customer_id = ?;',
                    [idUser],
                    (err, rows, fields) =>
                    {
                        if (err)
                        {
                            res.json(err)
                        }
                        else if (rows.length > 0)
                        {
                            
                            res.json(rows);
                        }
                    }
                );
            },
            listItems: (req, res) =>
            {
                db.query(
                    'SELECT * FROM view_orders_items WHERE id = ?;',
                    [req.params.id],
                    (err, rows2, fields) =>
                    {
                        if (err)
                        {
                            res.json(err);
                        }
                        else
                        {
                            res.json(rows2);
                        }
                    }
                );
            }
};