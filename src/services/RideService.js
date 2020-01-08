import Api from './Api'

export default{
    getallRides(){
        return Api().get('rides')
    },
    getSpecificRide(id){
        return Api().get(`rides/${id}`)
    },
    addRide(newRide){
        return Api().post('addRide', newRide)
    },
    deleteRide(id){
        return Api().delete(`deleteRide/${id}`)
    },
    updateRide(id,updRide){
        return Api().put(`updateRide/${id}`, updRide)
    },
    getImageUrls(){
        return Api().get('firebaseStorage_rides')
    }
}