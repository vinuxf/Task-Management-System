import mysql from 'mysql'

export const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "taskms",
    port: 3307 
})

con.connect(function(err){
    if(err){
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

