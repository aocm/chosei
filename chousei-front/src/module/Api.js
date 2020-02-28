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
      }).then((d) => {
        console.log('d1');
        console.log(d);
        return d;
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static fetchPost = async (url, data) => {
    await window.fetch(url, {
      method: 'POST',
      headers: this.httpHeaders(),
      body: JSON.stringify(data),
    });
  };

  static fetchPut = async (url, data) => {
    await window.fetch(url, {
      method: 'PUT',
      headers: this.httpHeaders(),
      body: JSON.stringify(data),
    });
  };

  static fetchDelete = async (url) => {
    await window.fetch(url, {
      method: 'DELETE',
      headers: this.httpHeaders(),
    });
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
