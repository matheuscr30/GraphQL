const bcryt = require('bcrypt-nodejs');
const db = require('../../config/db');
const { profile: getProfile } = require('../Query/profile');
const { user: getUser } = require('../Query/user');

const mutations = {
    registerUser(_, { data }) {
      return mutations.newUser(_, {
          data: {
              name: data.name,
              email: data.email,
              password: data.password,
              profiles: null
          }
      });
    },
    async newUser(_, { data }, ctx) {
        ctx && ctx.validateAdmin();
        try {
            const profileIds = []

            if(!data.profiles || !data.profiles.length) {
                data.profiles = [{
                    name: 'user'
                }];
            }

            for(let filter of data.profiles) {
                const profile = await getProfile(_, {
                    filter
                });
                if(profile) profileIds.push(profile.id);
            }

            const salt = bcryt.genSaltSync();
            data.password = bcryt.hashSync(data.password, salt);

            delete data.profiles;
            const [ id ] = await db('users').insert(data);

            for(let profile_id of profileIds) {
                await db('users_profiles')
                    .insert({ profile_id, user_id: id })
            }

            return db('users')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async deleteUser(_, args, ctx) {
        ctx && ctx.validateAdmin();
        try {
            const user = await getUser(_, args)
            if(user) {
                const { id } = user
                await db('users_profiles')
                    .where({ user_id: id }).delete()
                await db('users')
                    .where({ id }).delete()
            }
            return user
        } catch(e) {
            throw new Error(e.sqlMessage)
        }

    },
    async updateUser(_, { filter, data }, ctx) {
        ctx && ctx.validateFilterUser(filter);
        try {
            const user = await getUser(_, { filter })
            if(user) {
                const { id } = user
                if(ctx.admin && data.profiles) {
                    await db('users_profiles')
                        .where({ user_id: id }).delete()

                    for(let filter of data.profiles) {
                        const profile = await getProfile(_, {
                            filter
                        })
                        
                        if(profile) {
                            await db('users_profiles')
                                .insert({
                                    profile_id: profile.id,
                                    user_id: id
                                })
                        }
                    }
                }

                if (data.password) {
                    const salt = bcryt.genSaltSync();
                    data.password = bcryt.hashSync(data.password, salt);
                }

                delete data.profiles
                await db('users')
                    .where({ id })
                    .update(data)
            }
            return !user ? null : { ...user, ...data }
        } catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = mutations;