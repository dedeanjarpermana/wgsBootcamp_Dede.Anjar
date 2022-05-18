import axios from 'axios'
axios.defaults.withCredentials = true


export async function onLogin (loginData) {
    return await axios.post('http://localhost:3000/login', loginData)
}