//initializing server API
var OrientDB = require('orientjs');

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'jjanmo'
});

//initializing database API
var db = server.use('o2')
console.log('Using Database:' + db.name);

//getting record
// db.record.get('#30:0')
//     .then(
//         function (record) {
//             console.log('Loaded Record:', record);
//         }
//     );

//select
// const sql = 'select * from topic';
// db.query(sql).then(function (results) {
//     console.log(results);
// });

// const sql = 'select * from topic where @rid=:rid';
// const param = {
//     params: {
//         rid: '#33:0'
//     }
// }

// db.query(sql, param).then(function (results) {
//     console.log(results); //select한 record 출력 (아직 여러 개는 안되는듯...)
// });

//insert
// const sql = 'insert into topic (title, description) values(:title, :desc)';
// db.query(sql, {
//     params: {
//         title: 'Pug',
//         desc: 'Pug is template engine'
//     }
// }).then(function (results) {
//     console.log(results); //insert한 정보에 대해서 출력
// });

//update
// const sql = 'update topic set title=:title, description=:description where @rid=:rid';
// db.query(sql, {
//     params: {
//         title: 'orientDB',
//         description: 'orientDb is noSQL',
//         rid: '#35:0'
//     }
// }).then(function (results) {
//     console.log(results); //1 : update한 레코드의 수를 출력함
// });

//delete
const sql = 'delete vertex from topic where @rid=:rid';
const param = {
    params: {
        rid: '#35:0'
    }
}
db.query(sql, param).then(function (results) {
    console.log(results); //삭제한 레코드의 수를 출력함
})

