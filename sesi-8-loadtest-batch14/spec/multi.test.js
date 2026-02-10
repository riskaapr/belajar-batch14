import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, ENDPOINT, PARAMS, PAYLOAD } from '../config/endpoint.js';

export let options = {
  stages: [
    { duration: '2s', target: 20 },
    { duration: '2s', target: 50 }, 
    { duration: '2s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(80)<1000']
  }
};

export default function () {
    // Post Login
    const postResponse = http.post(`${BASE_URL}${ENDPOINT.POST_LOGIN}`, PAYLOAD, PARAMS);
    const resBody = postResponse.json();
    const token = resBody.token;
    // console.log("Token " + token)
    check(postResponse, {
        'status code 200': (r) => r.status === 200,
        'response time < 1s': (r) => r.timings.duration < 1000,
    });

    const isIdExist = token !== undefined ? true : false;

    if (isIdExist) {
        const HEAD = {
        headers: {
            "Content-Type": "application/json",
            "Authorization":  `Bearer ${token}`
         }
        }

        const getResponseUser = http.get(`${BASE_URL}${ENDPOINT.GET_USER}`, HEAD);
        //console.log("Status " + getResponseUser.status)
        check(getResponseUser, {
            'status code 200': (r) => r.status === 200,
            'response time < 1s': (r) => r.timings.duration < 1000,
        });
    }

}
