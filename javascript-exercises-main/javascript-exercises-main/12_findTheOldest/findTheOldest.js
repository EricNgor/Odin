const findTheOldest = function(people) {
  const findAge = person => {
    let age = -1;
    if (!person.yearOfDeath) {
      age = (new Date()).getFullYear() - person.yearOfBirth;
    } else {
      age = person.yearOfDeath - person.yearOfBirth;
    }
    return age;
  }
  let oldestPerson = people.reduce((oldest, person) => {
    const age = findAge(person);
    if (!oldest || age > findAge(oldest)) {
      return person;
    }
    return oldest;
  });
  return oldestPerson;
};

// Do not edit below this line
module.exports = findTheOldest;
