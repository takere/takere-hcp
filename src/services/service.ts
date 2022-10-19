/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ApiConfig from '../config/api.config';
import axios, { AxiosInstance } from 'axios';


/**
 * Responsible for providing translations according to some language.
 */
abstract class Service {
  
  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  protected readonly remoteRequest: AxiosInstance;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  public constructor() {
    this.remoteRequest = axios.create({
      baseURL: ApiConfig.BASE_URL,
      timeout: ApiConfig.REQUEST_TIMEOUT,
      headers: { 'authorization': localStorage.getItem('x_auth_token') }
    });
  }
}

export default Service;
