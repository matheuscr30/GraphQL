const users = [
  {
    id: 1,
    name: 'Matheus',
    email: 'matheus@yopmail.com',
    age: 29,
    profileId: 1,
    status: 'ACTIVE'
  },
  {
    id: 2,
    name: 'Dani',
    email: 'dani@yopmail.com',
    age: 15,
    profileId: 2,
    status: 'INACTIVE'
  },
  {
    id: 3,
    name: 'Florian',
    email: 'florian@yopmail.com',
    age: 22,
    profileId: 1,
    status: 'BLOCKED'
  }
];

const profiles = [
  {
    id: 1,
    name: 'User'
  },
  {
    id: 2,
    name: 'Admin'
  }
];

module.exports = { users, profiles };