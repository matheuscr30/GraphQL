let id = 1;
function nextId() {
    return id++;
}

const profiles = [
    { id: 1, name: 'User' },
    { id: 2, name: 'Admin' }
];

const users = [{
    id: nextId(),
    name: 'Kat Silva',
    email: 'jsilva@zemail.com',
    age: 29,
    profileId: 1,
    status: 'ACTIVE'
}, {
    id: nextId(),
    name: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    age: 31,
    profileId: 2,
    status: 'INACTIVE'
}, {
    id: nextId(),
    name: 'Daniela Smith',
    email: 'danismi@umail.com',
    age: 24,
    profileId: 1,
    status: 'BLOCKED'
}];

module.exports = { users, profiles, nextId };