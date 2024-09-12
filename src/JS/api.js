export default class Api {
    constructor(config){
      this.baseUrl = config.baseUrl;
      this.headers = config.headers;
    }
    getResponseJSON(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status); 
    }
  
    getUserData() {
      return fetch(`${this.baseUrl}/users/me`, {headers: this.headers}) 
      .then((res) => this.getResponseJSON(res))
    }
  
    getInitialCards(){
      return fetch(`${this.baseUrl}/cards`, {headers: this.headers}) 
      .then((res) => this.getResponseJSON(res));
    }
  
    postUserInfo(name, about) {
      fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name,
          about
        })
      })
    .catch ((err) => alert(`Ошибка отправки карточки на сервер: ${err}`));
    }
  }
  