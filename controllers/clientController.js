const db = require('../lib/db.js')

module.exports = {
    listar: (req, res) => {
        db.query(
            'SELECT * FROM customer_details;',
            (err, rows, fields) => {
                if (err)
                    res.json(err)
                else
                    res.json(rows)
            }
        ) 
    }
}