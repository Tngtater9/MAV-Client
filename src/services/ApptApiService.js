import config from '../config'
import TokenService from './TokenService'

const ApptApiService = {
  postAppt (appointment) {
    return fetch(`${config.API_ENDPOINT}/api/appointments/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(appointment)
    })
  },
  updateAppt (id, appointment) {
    return fetch(`${config.API_ENDPOINT}/api/appointments/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(appointment)
    })
  },
  deleteAppt (id) {
    return fetch(`${config.API_ENDPOINT}/api/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`
      },
    })
  },
  getAllAppt () {
    return fetch(`${config.API_ENDPOINT}/api/appointments/`, {
      headers: { Authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res =>
      !res.ok
        ? res.json().then(Promise.reject(TokenService.clearAuthToken()))
        : res.json()
    )
  },
  getApptByDate (date) {
    return fetch(`${config.API_ENDPOINT}/api/appointments/date/${date}/`, {
      headers: { Authorization: `bearer ${TokenService.getAuthToken()}` }
    }).then(res =>
      !res.ok
        ? res.json().then(Promise.reject(TokenService.clearAuthToken()))
        : res.json()
    )
  }
}

export default ApptApiService
