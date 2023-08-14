const axios = require('axios').default;
const Helper = require('@codeceptjs/helper');
const beautify = require("xml-beautifier");

/**
 * ## Configuration
 *
 * @typedef SOAPConfig
 * @type {object}
 * @prop {string} [endpoint] - API base URL
 * @prop {boolean} [prettyPrintXml=false] - pretty print xml for response/request on console logs
 * @prop {number} [timeout=1000] - timeout for requests in milliseconds. 10000ms by default
 * @prop {object} [defaultHeaders] - a list of default headers
 * @prop {function} [onRequest] - a async function which can update request object.
 * @prop {function} [onResponse] - a async function which can update response object.
 */
const config: any = {};

/**
 * SOAP helper allows to send additional requests to the SOAP API during acceptance tests.
 * [Axios](https://github.com/axios/axios) library is used to perform requests.
 *
 * <!-- configuration -->
 *
 * ## Example
 *
 * ```js
 *{
 *   helpers: {
 *     SOAP: {
 *       endpoint: 'http://site.com/api',
 *       prettyPrintXml: true,
 *       onRequest: (request) => {
 *         request.headers.auth = '123';
 *       }
 *     }
 *   }
 *}
 * ```
 *
 * ## Access From Helpers
 *
 * Send SOAP requests by accessing `_executeRequest` method:
 *
 * ```js
 * this.helpers['SOAP']._executeRequest({
 *    url,
 *    data,
 * });
 * ```
 *
 * ## Methods
 */
class SOAP extends Helper {
  constructor(config: any) {
    super(config);
    this.options = {
      timeout: 10000,
      defaultHeaders: {},
      endpoint: '',
      onRequest: null,
      onResponse: null,
    };

    if (this.options.maxContentLength) {
      const maxContentLength = this.options.maxUploadFileSize * 1024 * 1024;
      this.options.maxContentLength = maxContentLength;
      this.options.maxBodyLength = maxContentLength;
    }

    this.options = { ...this.options, ...config };
    this.headers = { ...this.options.defaultHeaders };
    this.axios = axios.create();
    this.axios.defaults.headers = this.options.defaultHeaders;
  }

  static _config() {
    return [
      { name: 'endpoint', message: 'Endpoint of SOAP API you are going to test', default: 'http://localhost:3000/api' },
    ];
  }

  static _checkRequirements() {
    try {
      require('axios');
    } catch (e) {
      return ['axios'];
    }
  }

  _before() {
    this.headers = { ...this.options.defaultHeaders };
  }

  /**
   * Sets request headers for all requests of this test
   *
   * @param {object} headers headers list
   */
  haveRequestHeaders(headers: any) {
    this.headers = { ...this.headers, ...headers };
  }

  /**
   * Executes axios request
   *
   * @param {*} request
   *
   * @returns {Promise<*>} response
   */
  async _executeRequest(request: any) {
    // Add custom headers. They can be set by amBearerAuthenticated() or haveRequestHeaders()
    request.headers = { ...this.headers, ...request.headers, ...{ 'Content-Type': 'text/xml;charset=UTF-8' } };

    const _debugRequest = { ...request };
    this.axios.defaults.timeout = request.timeout || this.options.timeout;

    if (this.headers && this.headers.auth) {
      request.auth = this.headers.auth;
    }

    if (this.config.onRequest) {
      await this.config.onRequest(request);
    }

    this.options.prettyPrintXml ? this.debugSection('Request', beautify(JSON.stringify(_debugRequest))) : this.debugSection('Request', JSON.stringify(_debugRequest));

    let response;
    try {
      response = await this.axios(request);
    } catch (err: any) {
      if (!err.response) throw err;
      this.debugSection('Response', `Response error. Status code: ${err.response.status}`);
      response = err.response;
    }
    if (this.config.onResponse) {
      await this.config.onResponse(response);
    }
    this.options.prettyPrintXml ? this.debugSection('Response', beautify(JSON.stringify(response.data))) : this.debugSection('Response', JSON.stringify(response.data));
    return response;
  }

  /**
   * Generates url based on format sent (takes endpoint + url if latter lacks 'http')
   *
   * @param {*} url
   */
  _url(url: string) {
    return /^\w+\:\/\//.test(url) ? url : this.options.endpoint + url;
  }

  /**
   * Set timeout for the request
   *
   * ```js
   * I.setRequestTimeout(10000); // In milliseconds
   * ```
   *
   * @param {number} newTimeout - timeout in milliseconds
   */
  setRequestTimeout(newTimeout: number) {
    this.options.timeout = newTimeout;
  }

  /**
   * Sends SOAP request to API.
   *
   * ```js
   * I.sendSoapRequest('/api/users.json', { "email": "user@user.com" });
   *
   * ```
   *
   * @param {*} url
   * @param {*} [payload=''] - the payload to be sent. By default, it is sent as an empty string
   * @param {object} [headers={}] - the headers object to be sent. By default, it is sent as an empty object
   *
   * @returns {Promise<*>} response
   */
  async sendSoapRequest(url: string, payload = '', headers = {}) {
    const request = {
      baseURL: this._url(url),
      method: 'POST',
      data: payload,
      headers,
    };

    return this._executeRequest(request);
  }
}
export = SOAP;
