const { profiles } = require('../data/db')

module.exports = {
    profile(user) {
        const selected = profiles.filter(p => p.id === user.profileId)
        return selected ? selected[0] : null
    }
}