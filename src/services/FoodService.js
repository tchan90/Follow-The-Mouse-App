import Api from './Api'

export default{
    getAllRestaurants(){
        return Api().get('restaurants')
    },
    getSpecificRestaurant(id){
        return Api().get(`restaurant/${id}`)
    },
    postRestaurant(newFood){
        return Api().post('addRestaurant', newFood)
    },
    deleteRestaurant(id){
        return Api().delete(`deleteRestaurant/${id}`)
    },
    updateRestaurant(id,updRestaurant){
        return Api().put(`updateRestaurant/${id}`, updRestaurant)
    },
    getImageUrls(){
        return Api().get('getimageUrls-food')
    }
}