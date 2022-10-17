/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toast } from "react-toastify";
import LocaleService from "./locale.service";
import Service from "./service";


/**
 * Responsible for managing user requests. 
 */
class UserService extends Service {
  
  // --------------------------------------------------------------------------
  //     Attributes
  // --------------------------------------------------------------------------
  private readonly localeService: LocaleService;


  // --------------------------------------------------------------------------
  //     Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.localeService = new LocaleService();
  }


  // --------------------------------------------------------------------------
  //     Methods
  // --------------------------------------------------------------------------
  public async makeLogin(email: string, password: string): Promise<boolean> {
    let success = false;
    const id = toast.loading(this.localeService.translate("LOGIN_PROGRESS"))
    
    try {
        const response = await this.remoteRequest.post('/users/login', {
            email,
            password
        });
        localStorage.setItem('user', JSON.stringify(response.data.userData))
        toast.dismiss(id);
        
        if (response.data.token) {
            toast.success(this.localeService.translate("LOGIN_SUCCESS"))
            localStorage.setItem('x_auth_token', response.data.token);
            success = true;
        }
    } 
    catch (e) {
        toast.dismiss(id);
        toast.error(this.localeService.translate("LOGIN_FAIL"))
    }

    return success;
  }

  public async makeLogout(): Promise<void> {
    localStorage.clear();
  }
}

export default UserService;
