import './style/index.scss'
const person = {
  name: 'basit',
  class: 'computer science',
  age: 29,
}

const person2 = {
  ...person,
  profession: 'Web developer'
}
console.log(person);
console.log(person2);