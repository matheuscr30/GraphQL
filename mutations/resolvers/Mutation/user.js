const { users, nextId } = require('../../data/db');

function indexUser(filter) {
  if (!filter) return -1;
  const { id, email } = filter;
  if (id) {
    return users.findIndex(u => u.id === id);
  } else if (email) {
    return users.findIndex(u => u.email === email);
  } else {
    return -1;
  }
}

module.exports = {
  newUser(_, { data }) {
    const existentEmail = users.some(u => u.email === data.email);

    if (existentEmail) {
      throw new Error('Email already registered');
    }

    const user = {
      id: nextId(),
      ...data,
      profileId: 1,
      status: 'ACTIVE'
    };

    users.push(user);
    return user;
  },
  deleteUser(_, { filter }) {
    const i = indexUser(filter);
    if (i < 0) return null;

    let excluded = users.splice(i, 1);
    return excluded ? excluded[0] : null;
  },
  updateUser(_, { filter, data }) {
    const i = indexUser(filter);
    if (i < 0) return null;

    const user = {
      ...users[i],
      ...data
    };

    users.splice(i, 1, user);
    return user;
  }
}