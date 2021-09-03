const mysql = require('mysql')
const connect = mysql.createPool({
    connectionLimit:100,
    host:'localhost',
    user:'dbuser',
    password:'qweqweasd',
    database:'messenger'
})

module.exports = {
    connect
}