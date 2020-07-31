const db = require('../config/db')

async function saveUser(name, email, password) {
    let user = await db('users')
        .where({ email }).first()

    if(!user) {
        let [ id ] = await db('users')
            .insert({ name, email, password })
        user = await db('users')
            .where({ id }).first()
    } else {
        await db('users')
            .where({ id: user.id })
            .update({ name, email, password })
        user = { ...user, name, email, password }
    }

    return user
}

async function saveProfile(name, tag) {
    let profile = await db('profiles')
        .where({ name }).first()

    if(!profile) {
        let [ id ] = await db('profiles')
            .insert({ name, tag })
        profile = await db('profiles')
            .where({ id }).first()
    } else {
        await db('profiles')
            .where({ id: profile.id })
            .update({ name, tag })
        profile = { ...profile, name, tag }
    }

    return profile
}

async function addProfiles(user, ...profiles) {
    const userId = user.id
    await db('users_profiles')
        .where({ userId })
        .delete()
    
	for(let profile of profiles) {
        const profileId = profile.id
        await db('users_profiles')
            .insert({ userId, profileId })
    }
}

async function execute() {
    const user = await saveUser('Ana Silva',
        'ana.silva@empresa.com.br', '123456')
    const profileA = await saveProfile('rh_1', 'Pessoal')
    const profileB = await saveProfile('fin_1', 'Financeiro')

    console.log(user)
    console.log(profileA)
    console.log(profileB)

    await addProfiles(user, profileA, profileB)
}

execute()
    .catch(err => console.log(err))
    .finally(() => db.destroy())