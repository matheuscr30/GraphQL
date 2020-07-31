const { users, profiles } = require('../data/db');

module.exports = {
  hello() {
    return 'Returning a string';
  },
  actualHour() {
    let date = new Date();
    return date;
  },
  loggedUser() {
    return {
      id: 1,
      name: 'Matheus',
      email: 'matheus@gmail.com',
      age: 22,
      real_salary: 1920.50,
      vip: true
    }
  },
  featuredProduct() {
    return {
      name: 'Product 1',
      price: 35.45,
      discount: 0.5
    }
  },
  lotteryNumbers() {
    return Array(6)
      .fill(0)
      .map(() => parseInt(Math.random() * 60))
      .sort(((a, b) => a-b));
  },
  users() {
    return users
  },
  user(_, { id }) {
    const selected = users.filter(u => u.id === id);
    return selected ? selected[0] : null;
  },
  profiles() {
    return profiles;
  },
  profile(_, { id }) {
    const selected = profiles.filter(p => p.id === id);
    return selected ? selected[0] : null;
  }
};

