import store  from '../store/index'

export default async   (to, from, next) =>{

  if (store.getters.loggedIn){
// if (true){
    next()
  }
  else{
    next('/login/')
  }
}

