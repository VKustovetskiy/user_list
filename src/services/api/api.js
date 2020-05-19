import axios from 'axios'

const isSecure = process.env.VUE_APP_SECURE === 'true'
const domain = process.env.VUE_APP_DOMAIN

const service = axios.create({
  baseURL: `http${isSecure ? 's' : ''}://${domain}/`,
  timeout: 50 * 1000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  },
  validateStatus: status => status <= 503
})

service.interceptors.response.use(
  response => {
    const { data, status } = response
    
    if (status !== 200 && status !== 201 && status !== 404) {
      alert(data)
    }

    return data
  }
)

export default service
