//connect with server
import axios from 'axios'
//server URL
export default() => {
    return axios.create({
        baseURL: 'http://localhost:5000'
    })
}