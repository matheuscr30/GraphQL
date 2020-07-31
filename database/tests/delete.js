const db = require('../config/db')

// Delete by Id
db('users').where({ id: 1 })
    .delete()
    .then(res => console.log(res))
    .finally(() => db.destroy())


// Delete All
db('profiles')
    .delete()
    .then(res => console.log(res))
    .finally(() => db.destroy())