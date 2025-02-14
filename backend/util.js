const fs = require('fs');


function db_user(){

    return new Promise((resolve,reject)=>{

        fs.readFile('./connection.json', { encoding: 'utf8', flag: 'r' },(err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));        
          });
    });
} 

function db_connection(user){
    
    return  mysql.createConnection({
        host: 'localhost',
        user: user.user,
        password: user.password,
        database: 'chook_raffle'
    });
}     
    
function db_query(conn,qstr){
    
    return new Promise((resolve,reject)=>{
        conn.query( qstr, ( err, rows ) => {
            if (err) {
                reject(err);
            }          
            resolve(rows); 
        }); 
        conn.end();
    });
}


const mysql = require('mysql2');

async function bt_query(qstr){

    var dbu = await db_user();
    var dbc = await db_connection(dbu);
    var dbq = await db_query(dbc,qstr);

    return dbq;
}


module.exports = {
    bt_query: bt_query
  };
