export class Api {
    constructor(options) {
      this._address = options.baseUrl;
      this._token = options.headers.authorization;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _createRequest(endpoint, method, body) {
        const fetchInit = {
            method: method,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }

        return fetch(
            `${this._address}/${endpoint}`,
            body ? { ...fetchInit, body: JSON.stringify(body) } : fetchInit
            )
        .then(this._handleResponse)
    }

    getUserInfo() {
        return this._createRequest('users/me', 'GET')
    }

    getInitialCards() {
        return this._createRequest('cards', 'GET')
    }
    
    updateUserInfo(userInfo) {
        return this._createRequest('users/me', 'PATCH', userInfo)
    }
    
    postCard(data) {
        return this._createRequest('cards', 'POST', data)
    }


    deleteCard(id) {
        return this._createRequest(`cards/${id}`, 'DELETE')
    }

    like(id, isLiked) {
        return this._createRequest(`cards/likes/${id}`, isLiked ? 'PUT' : 'DELETE')
    }

    editAvatar(avatar) {
        return this._createRequest('users/me/avatar', 'PATCH', avatar)
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
      authorization: '197e4656-d963-4ef2-94ca-2fcf60ccdd88',
      'Content-Type': 'application/json'
    }
  });

export default api