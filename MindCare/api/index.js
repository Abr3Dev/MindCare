import axios from 'axios'


const api =  axios.create({
    baseURL : 'http://10.0.2.2:3001',
    headers : {
        'Content-Type':'application/json; charset=UTF-8',
    }
});

export default api