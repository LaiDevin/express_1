var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'node'
});

connection.connect(err => {
    if (err) {
        throw err;
    }
});

function connectsql(db, sql) {
    const promise = new Promise((resolve, reject) => {
        db.connect( err => {
            if (err) {
                console.log('connect threadid: ', db.threadId);
                reject(err);
            }  else {
                resolve({'db': db, 'sql': sql});
            }
            
        })
    });
    return promise;
}

function queryDb(db, sql) {
    const promise = new Promise((resolve, reject) => {
        db.query(sql, (err, results, fields) => {
            if (err) {
                reject(err);
            } 
                resolve({'result': results, 'field': fields});
        })
    });
    return promise;
}

function handleResults(res) {
    const promise = new Promise((resolve, reject) => {
        resolve(res);
    });
    return promise;
};

module.exports = {
    sqlquery: (sql, callback) => {
        queryDb(connection, sql)
        .then(results => {
            console.log('res: ', results.result[0]);
            callback(results.result);
        })
        .catch(err => {
            console.log("err: ",err);
        })
    }
    
}