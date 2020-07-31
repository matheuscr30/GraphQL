const db = require('../config/db')

const newUser = {
    name: 'Pedro',
    email: 'pedro@empresa.com.br',
    password: '12345678'
}

// update... db('...').where({...}).update({...})

async function exercise() {
    // count
    const { qtd } = await db('users')
        .count('* as qtd').first()

    // insert (if table is empty)
    if(qtd === 0) {
        await db('users').insert(newUser)
    }

    // consult
    let { id } = await db('users')
        .select('id').limit(1).first()

    // update
    await db('users').where({ id })
        .update({
            name: 'Pedro Garcia',
            email: 'pedro.garcia@empresa.com.br'
        })

    return db('users').where({ id })
}

exercise()
    .then(user => console.log(user))
    .finally(() => db.destroy())