import axios from 'axios'
import router from '../../router'
import qs from 'qs'
// import store from '../../store/store'
import { Toast, MessageBox, Indicator } from 'mint-ui'
let needLoadingRequestCount = 0
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

function startLoading () {
  Indicator.open()
}
function endLoading () {
  Indicator.close()
}

axios.interceptors.request.use(function (config) {
  showFullScreenLoading()
  return config
}, error => {
  return Promise.resolve(error)
})

axios.interceptors.response.use((response) => {
  tryHideFullScreenLoading()
  return response
}, error => {
  return Promise.resolve(error)
})

function checkStatus (response) {
  if (response && ((response.status === 200 || response.status === 304 || response.status === 400))) {
    return response.data
  }
  return {
    code: '404',
    message: '网络异常'
  }
}
let api = '/api'

export default {
  api,
  router,
  Tip (title, message) {
    MessageBox(title, message)
  },
  confirm (message, func) {
    MessageBox.confirm(message).then(action => {
      func()
    })
  },
  requestget (url, data) {
    return axios.get( api + url, {
      params: data,
    }).then((res) => {
      if (res.data.code === -1) {
        MessageBox.alert(res.data.data, '提示信息', {
          confirmButtonText: '确定'
        })
        return false
      }
      if (res.data.code === 401) {
        MessageBox.alert(res.data.data, '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            // that.$router.push({ name: 'login' })
          }
        })
        return false
      }
      if (res.data.code === 0) {
        return checkStatus(res)
      }
    }).catch(function () {
      tryHideFullScreenLoading()
      MessageBox.alert('系统错误，联系管理员', '提示信息', {
        confirmButtonText: '确定',
        callback: action => {
        }
      })
    })
  },
  request (url, data) {
    return axios({
      method: 'post',
      baseURL: process.env.BASE_URL,
      url: api + url,
      data: qs.stringify(data),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      timeout: 10000
    }).then((res) => {
      if (res.data.code === -1) {
        MessageBox.alert(res.data.data, '提示信息', {
          confirmButtonText: '确定'
        })
        return false
      }
      if (res.data.code === 401) {
        MessageBox.alert(res.data.data, '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            router.push({ name: 'login' })
          }
        })
        return false
      }
      if (res.data.code === 0) {
        return checkStatus(res)
      }
    }).catch(function () {
      tryHideFullScreenLoading()
      MessageBox.alert('系统错误，联系管理员', '提示信息', {
        confirmButtonText: '确定',
        callback: action => {
        }
      })
    })
  }
}
