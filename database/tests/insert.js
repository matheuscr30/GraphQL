const db = require('../config/db');

/*const newProfile = {
  name: 'recruiter',
  tag: 'Recruiter'
};

db('profiles').insert(newProfile)
  .then(res => console.log(res))
  .catch(err => console.log(err.sqlMessage))
  .finally(() => db.destroy());*/

const superUserProfile = {
  name: 'root' + Math.random(),
  tag: 'Super User'
}

db.insert(superUserProfile).into('profiles');