class Api {
  static httpHeaders = () => ({
    'X-Requested-With': 'csrf', // csrf header
    'Content-Type': 'application/json',
  });

  static toJson = (response) => response.json();

  static fetchGet = async (url) => {
    try {
      return await window.fetch(url, {
        method: 'GET',
        headers: this.httpHeaders(),
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static fetchPost = async (url, data) => {
    try {
      return await window.fetch(url, {
        method: 'POST',
        headers: this.httpHeaders(),
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static fetchPut = async (url, data) => {
    try {
      return await window.fetch(url, {
        method: 'PUT',
        headers: this.httpHeaders(),
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static fetchDelete = async (url) => {
    try {
      return await window.fetch(url, {
        method: 'DELETE',
        headers: this.httpHeaders(),
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };
}

const API_CONFIG = {};
API_CONFIG.BASE_URL = process.env.VUE_APP_BASE_URL;

/** *******************
 * API Settings
 * ****************** */

export const chouseiApi = {
  getUser: () => Api.fetchGet(API_CONFIG.BASE_URL).then((d) => Api.toJson(d)),
};
