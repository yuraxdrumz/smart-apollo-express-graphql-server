import { buildSchema } from 'graphql';
import fs from 'fs'
let allTypes = ``
let allResolvers = {}
let rootQuery = `type Query{`
let mutationQuery = `type Mutation{`
fs
.readdirSync('./server')
.filter(item=>(fs.statSync(`./server/${item}`)).isDirectory())
.map(dir=>{
  try{
    const customQueryType = require(`./${dir}/customQueryType.js`)
    let customQueryTypes = Object.keys(customQueryType)
    customQueryTypes.forEach(customKey=>{
      rootQuery = rootQuery + customQueryType[customKey]
    })
  }catch(e){
    rootQuery = rootQuery + dir + `:${dir}\n`
  }

  try{
    const mutations = require(`./${dir}/mutations.js`)
    let mutationTypes = Object.keys(mutations)
    mutationTypes.forEach(mutKey=>{
      mutationQuery = mutationQuery + '\n' + mutations[mutKey]
    })
  }catch(e){}
  try{
    let types = require(`./${dir}/types.js`)
    let typesKeys = Object.keys(types)
    typesKeys.forEach(typeKey=>{
      allTypes = allTypes + '\n' + types[typeKey]
    })
  }catch(e){}
  try{
    let resolvers = require(`./${dir}/resolvers.js`)
    let resolverKeys = Object.keys(resolvers)
    resolverKeys.forEach(resolverKey=>{
      Object.assign(allResolvers, resolvers[resolverKey])
    })
  }catch(e){}
})
rootQuery = rootQuery + '}'
mutationQuery = mutationQuery + '}'

// Construct a schema, using GraphQL schema language
const schema = `
  ${rootQuery}
  ${allTypes}
  ${mutationQuery}
`;

export default [schema]
export { allResolvers }
