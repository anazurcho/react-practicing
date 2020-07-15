import axios from "axios";
import settings from "../settings"

class Service {
    async registerUser(firstName, lastName, gender, email, status) {
        return await axios.post(`${settings.API_BASE}users`, {
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            email: email,
            status: status
        },
            {
                headers: {
                    'Authorization': `Bearer ${settings.token}`
                }
            }
        )
    } 

    async getPosts() {
        return await axios.get(`${settings.API_BASE}posts?_format=json&access-token=${settings.token}`)
    }
    async getUsers() {
        return await axios.get(`${settings.API_BASE}users?_format=json&access-token=${settings.token}`)
    } 
    async getUserInfo(user_id) {
        return await axios.get(`${settings.API_BASE}users/${user_id}?_format=json&access-token=${settings.token}`)
    } 
    async getPhotos() {
        return await axios.get(`${settings.API_BASE}photos?_format=json&access-token=${settings.token}`)
    } 
    async getSearchedInfo(user_name) {
        return await axios.get( `${settings.API_BASE}users?first_name=${user_name}&_format=json&access-token=${settings.token}`        
        )
    } 
    // async loginUser(email, password) {
    //     return await axios.post(`${settings.API_BASE}`, {
    //         email: email,
    //         password: password,
    //     },
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${settings.token}`
    //             }
    //         }
    //     )
    // }
}

export default Service;

