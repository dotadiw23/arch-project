const mysqlPool = require('../database');
const bcrypt = require('bcrypt');

const userController = {

    getUsers: (req, res) => {

        mysqlPool.query('SELECT * FROM users', (err, results, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(results);
            }
        });
    },

    getUser: (req, res) => {

        let {id} = req.params; 

        if (id) {
            mysqlPool.query('SELECT * FROM users WHERE user_id = ?', id, (err, results, fields) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    if (results.length == 0) {
                        res.status(404).json('User not found');
                    }else {
                        res.status(200).json(results);
                    }
                }
            });
        }else {
            res.status(404).json(results);
        }
    },

    postUser: async (req, res) => {
        let {name, email, password} = req.body;
   
        if (name && email && password) {
            
            let hashPassword = await bcrypt.hash(password, 10);
            let newUser = [name, email, hashPassword];
            let sql = 'INSERT INTO users (name, email, password) VALUES (?)'

            if (hashPassword){ 

                mysqlPool.query(sql, [newUser], (err, results) =>{
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(201).json({
                            createdUser: true, values: newUser
                        });
                    }
                });
            }
            
        } else{
            res.status(400).json({error: 'Invalid request'});
        }
    },

    putUser: async (req, res) => {
    
        let {id} = req.params;
        console.log(id);
        let {name, email, password} = req.body;
        let sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?';

        if (name && email && password) {

            let hashPassword = await bcrypt.hash(password, 10);
            let values = [name, email, hashPassword, id];

            mysqlPool.query(sql, values, (err, results, fields) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    console.log(results);
                    if (results.changedRows == 0){
                        res.status(404).json({updatedUser: false, modifiedValues: 'The user does not exists'});  
                    } else {
                        res.status(201).json({updatedUser: true, modifiedValues: values});
                    }
                    
                }
            });
        } else {
            res.status(400).json({updatedUser: false, error: 'Invalid request'});
        }
    },

    deleteuser: (req, res) => {

        let {id} = req.params;

        let sql = 'DELETE FROM users WHERE user_id = ?';

        mysqlPool.query(sql, [id], (err, results, fields) => {
            if (err) {
                res.status(500).json({deteledUser: false, error: err});
            } else {
                console.log(results);
                if (results.affectedRows == 0) {
                    res.status(404).json({deteledUser: false, user: 'The user does not exists'});
                }else{
                    res.status(200).json({deteledUser: true, user: id});
                }
            }
        });
    }
}

module.exports = userController;