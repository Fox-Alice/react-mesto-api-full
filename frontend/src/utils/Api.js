import { apiConfig } from "./constants";
class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers
    }

    _onResponse = (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject('Oшибка на стороне сервера')
    }

    getAllInfo() {
        return Promise.all([this.getUser(), this.getInitialCards()])
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this._onResponse)
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._onResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards/`, {
            headers: this._headers
        })

            .then(this._onResponse)
    }

    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._onResponse)
    }

    addCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        })
            .then(this._onResponse)
    }

    handleLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then(this._onResponse)
    }

    updateAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._onResponse)
    }
}

const api = new Api(apiConfig);

export default api