const db = require('../config/db')

/*
db('profiles')
    .map(p => p.name)
    .then(names => console.log(names))
    .finally(() => db.destroy())

db('profiles').select('name', 'id')
    .then(res => console.log(res))
    .finally(() => db.destroy())

db.select('name', 'id')
    .from('profiles')
    .limit(4).offset(2)
    .then(res => console.log(res))
    .finally(() => db.destroy())
*/

db('profiles')
    .select('id', 'name')
    // .where({ id: 2 })
    // .where('id', '=', 2)
    // .where('name', 'like', '%m%')
    // .whereNot({ id: 2 })
    .whereIn('id', [1, 2, 3])
    // .first()
    .then(res => console.log(res))
    .finally(() => db.destroy())