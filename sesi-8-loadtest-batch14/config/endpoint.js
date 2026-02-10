export const BASE_URL = 'https://belajar-bareng.onrender.com';

export const ENDPOINT = {
    POST_LOGIN: '/api/login',
    GET_USER: '/api/users'
}

export const PARAMS = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const PAYLOAD = JSON.stringify(
{
    "password": "admin",
    "username":"admin"
}
)