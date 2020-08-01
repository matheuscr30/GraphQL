const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs');
const { getLoggedUser } = require('../Util/token');

module.exports = {
    async login(_, { data }) {
        const user = await db('users')
          .where({ email: data.email })
          .first();

        if (!user) {
            throw new Error('User/Password invalid');
        }

        if (bcrypt.compareSync(data.password, user.password)) {
            return getLoggedUser(user);
        } else {
            throw new Error('User/Password invalid');
        }
    },
    users(_, args, ctx) {
        ctx && ctx.validateAdmin();
        return db('users')
    },
    user(_, { filter }, ctx) {
        ctx && ctx.validateFilterUser(filter);
        if(!filter) return null
        const { id, email } = filter
        if(id) {
            return db('users')
                .where({ id })
                .first()
        } else if(email) {
            return db('users')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}