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
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        })
            .then(this._onResponse)
    }

    editProfile(data) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._onResponse)
    }

    getInitialCards() {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._url}/cards/`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        })

            .then(this._onResponse)
    }

    removeCard(id) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
            }
        })
            .then(this._onResponse)
    }

    addCard({ name, link }) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, link })
        })
            .then(this._onResponse)
    }

    handleLike(id, isLiked) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._url}/cards/${id}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(this._onResponse)
    }

    updateAvatar(data) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._onResponse)
    }
}

const api = new Api(apiConfig);

export default api