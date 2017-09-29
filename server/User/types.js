const User = `
  type User {
    first_name: String!
    last_name: String!
  }
`
const UserInput = `
  input newUser {
    first_name: String!
    last_name: String!
  }
`
export {
  User,
  UserInput
}
