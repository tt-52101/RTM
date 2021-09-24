import Axios from 'axios'
const { CancelToken } = Axios

const messageErrorService = 'Error interno.'

let cancel

class API {
  static cancel () {
    cancel('Request canceled.')
  }
  static request (url, method, body) {
    const data = {
      method,
      headers: {
        'Accept': 'application/json',
        'company_id': localStorage.getItem('rtmCompany')
      }
    }
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      if (body !== undefined) {
        data.body = JSON.stringify(body)
      }
    }
    url = (url.indexOf('http') !== -1) ? url : `/api/${  url}`
    return fetch(url, data).then((response) => {
      if (response.status === 500) {
        console.error(messageErrorService)
      }
      const newAuthToken = response.headers.get('authorization')
      if (newAuthToken !== '' && newAuthToken !== undefined && newAuthToken !== null) {
        //Auth.authenticateUser(newAuthToken) colocar aqui refresh token
      }
      return response.json()
    }).then(function (responseJson) {
      if (responseJson.hasOwnProperty('error') && (responseJson.error === 'token_expired' || responseJson.error === 'token_invalid' || responseJson.error === 'token_not_provided')) {
        // Auth.deauthenticateUser()
      //  browserHistory.push('/login')
        console.error(`error request:> ${ url}`)
      } else {
        return responseJson
      }
    }).catch(() => {
      console.error(messageErrorService)
    })
  }

  /*
  static uploadFile (url, file, data = [], catchError = null) {
    return Observable.create((observer) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `/api/${  url}`, true)
      xhr.setRequestHeader('Authorization', Auth.getToken())
      xhr.onload = () => {
        if (xhr.status === 500) {
          const data = {
            message: messageErrorService,
            success: false,
            statusCode: 500
          }
          console.error(messageErrorService)
          observer.onError(data)
        }
        if (xhr.status !== 200) {
          observer.onError(xhr.statusText)
        }
      }
      xhr.onerror = () => {
        if (catchError) {
          catchError()
        }
      }
      xhr.onreadystatechange = () => {
        observer.next(xhr.response)
        if (xhr.readyState === 4 && xhr.status === 200) {
          observer.complete()
        }
      }
      const fd = new FormData()
      fd.append('upload_file', file)
      data.map((d) => {
        fd.append(d.key, d.value)
      })
      xhr.send(fd)
    })
  }
*/
  static requestAxios (url, method, body, files = []) {
    const data = {
      method,
      headers: {
        'Accept': files.length > 0 ? 'multipart/form-data' : 'application/json',
        'company_id': localStorage.getItem('rtmCompany')

      },
      cancelToken: new CancelToken((c) => {
        cancel = c
      })
    }
    if (method === 'POST' || method === 'PUT') {
      data.data = body
    }

    // For upload files
    if (files.length > 0) {
      const formData = new FormData()
      files.forEach(file => (
        formData.append(file, body[file])
      ))

      for (const key in body) {
        if (!formData.has(key)) formData.append(key, body[key])
      }
      data.data = formData
      data.method = 'POST'
    }
    return Axios(`/api/${url}`, data)
      .then((response) => {
        if (response.status === 500) {
          console.log(messageErrorService)
          return {
            success: false,
            message: 'Error interno.'
          }
        }
        return response
      })
      .catch((error) => {
        console.error(messageErrorService)
        if (Axios.isCancel(error)) {
          return Promise.reject(error)
        } else {
          return Promise.reject(error)
        }
      })
  }


}

export default API
