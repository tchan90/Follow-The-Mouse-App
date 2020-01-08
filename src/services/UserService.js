import Api from './Api'

export default{
    loginUser(user){
        return Api().post('signIn', user)
    }
}