const { profiles, nextId } = require('../../data/db');

function indexProfile(filter) {
  if (!filter) return -1;
  const { id, name } = filter;
  if (id) {
    return profiles.findIndex(p => p.id === id);
  } else if (name) {
    return profiles.findIndex(p => p.name === name);
  } else {
    return -1;
  }
}

module.exports = {
  newProfile(_, { data }) {
    const existentName = profiles.some(p => p.name === data.name);

    if (existentName) {
      throw new Error('Profile already registered');
    }

    const profile = {
      id: nextId(),
      ...data
    };

    profiles.push(profile);
    return profile;
  },
  deleteProfile(_, { filter }) {
    const i = indexProfile(filter);
    if (i < 0) return null;

    let excluded = profiles.splice(i, 1);
    return excluded ? excluded[0] : null;
  },
  updateProfile(_, { filter, data }) {
    const i = indexProfile(filter);
    if (i < 0) return null;

    const profile = {
      ...profiles[i],
      ...data
    };

    profiles.splice(i, 1, profile);
    return profile;
  }
}