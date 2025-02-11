
const fs = require('fs');

var bt=bt||{};
bt.util=bt.util||{};

bt.util.db_user=function(){

    var obj;
    return fs.readFileSync('connection.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
    });
}

const mysql = require('mysql');

bt.util.db_pool = function(){
 
    const user=db_user();
    return mysql.createPool({
        connectionLimit : 10,
        host: 'localhost',
        user: user.user,
        password: user.pw,
        database: 'chook_raffle'
    });
}


bt.util.query = function(qstr){

  return new Promise((resolve, reject)=>{
      pool.query(qstr, (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
}




