const db = require('../lib/db.js');

module.exports = {
    listProducts: (req, res) => {
        db.query(
            'SELECT * FROM products',
            (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            }
        );
    },
    searchProducts: (req, res) => {
        db.query(
            "SELECT * FROM products WHERE name LIKE '%"+ req.params.name +"%'",
            //`%${req.params.name}%`,
            (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            }
        );
    },
    addProduct: (req, res) => {
        console.log("aqui si llega");
        db.query(
            'INSERT INTO products (name, stock, price) VALUES (?, ?, ?)',
            [req.body.name, req.body.stock, req.body.price],
            (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json({ id: result.insertId });
                }
            }
        );
    },
    updateProduct: (req, res) => {
        const { column, newValue, name } = req.body;
        const query = `UPDATE products SET ${column} = ? WHERE name = ?`;
        db.query(
            query,
            [newValue, name],
            (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json({ affectedRows: result.affectedRows });
                }
            }
        );
    }
};