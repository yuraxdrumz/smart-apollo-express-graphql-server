const UserResolver = {
  User:{
    first_name(){
      return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    last_name(){
      return 'Bla'
    }
  },
  createUser({input}){
    return input
  }
};
export { UserResolver }
