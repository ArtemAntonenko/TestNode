import Vue from 'vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import store from '@/store'
// import router from '@/router'
import { api } from '@/modules/api'
// import { generateDeviceId } from '@/utils/deviceId'

const instance = Axios.create({
  baseURL: api.baseUrl,
  headers: {
    // DeviceId: generateDeviceId(),
    'Accept-Language': 'en-US',
    'Access-Control-Allow-Origin': '*'
  }
})

instance.interceptors.request.use(config => {
  /** Additional request settings (for example - add header AccessToken) **/
  return config
})

instance.interceptors.response.use((response) => {
  // console.log('Handling response: ', response)
  return response
}, (error) => {
  console.log('Error handled: ', error)
  const { response } = error
  console.log(response)
  // Handle access token refresh if status code is 401 (expired or invalid)
  // TODO
  // if (response && response.status === 401 && !response.config.__isRequestRetry) {
  //   return store.dispatch('refreshToken')
  //     .then(accessToken => {
  //       console.log(accessToken)
  //       response.config.headers['Authorization'] = accessToken
  //       response.config.__isRequestRetry = true
  //       return instance.request(response.config)
  //     })
  //     .catch(res => {
  //       store.dispatch('userDeauthenticate')
  //       router.replace({ name: 'login' })
  //       return res
  //     })
  // }
  return Promise.reject(error)
})

store.axios = store.$axios = instance
Vue.use(VueAxios, instance)

export default instance
