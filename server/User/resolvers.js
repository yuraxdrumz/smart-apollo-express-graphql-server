
const UserResolver = {
  Query: {
    User(obj, args, context, info) {
     return {first_name:"lala"}
    },
  },
  User:{
    first_name(user){
      return user.first_name
    },
    last_name(user){
      return user.last_name
    },
    houses(obj, args){
      console.log(obj, args)
      return []
    },
    cats(obj, args){
      console.log(obj, args)
      return []
    }
  },
  Mutation:{
    createUser(root, {input}, context){
      return input
    }
  }
};
export { UserResolver }
