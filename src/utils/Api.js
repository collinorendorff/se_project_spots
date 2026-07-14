export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Helper functions to avoid repetitive response checking and fetching in class functions
  /* ---------------------- */
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  /* ---------------------- */

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  editUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  editAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeStatus(id, isLiked) {
    const request = isLiked ? "DELETE" : "PUT";

    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: request,
      headers: this._headers,
    });
  }
}
