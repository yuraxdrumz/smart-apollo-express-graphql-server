const CatResolver = {
  Cat:{
    color(){
      console.log(arguments)
      return `Black`
    },
    name(){
      return 'Mitzie'
    }
  },
};
export { CatResolver }
