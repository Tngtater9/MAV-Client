import config from '../config'
import TokenService from './TokenService'

const ApptApiService = {
    postAppt(appointment) {
        return fetch(`${config.API_ENDPOINT}/appointments`, {
            method: 'POST',
            headers: { 
                'content-type': 'application/json',
                Authorization : `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(appointment)
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(Promise.reject(TokenService.clearAuthToken()))
                .then(window.location.replace("https://mav-client.vercel.app/login"))
                : res.json()
            )
    },
    getAllAppt() {
        return fetch(`${config.API_ENDPOINT}/appointments`, {
            headers: { Authorization : `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(Promise.reject(TokenService.clearAuthToken()))
                .then(window.location.replace("https://mav-client.vercel.app/login"))
                : res.json()
            )
    },
    getApptByDate(date) {
        return fetch(`${config.API_ENDPOINT}/api/appointments/date/${date}`, {
            headers: { Authorization : `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res =>
        (!res.ok)
            ? res.json().then(Promise.reject(TokenService.clearAuthToken()))
            .then(window.location.replace("https://mav-client.vercel.app/login"))
            : res.json()
        )
    }
}

export default ApptApiService