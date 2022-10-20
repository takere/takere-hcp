/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Service from "./service";


/**
 * Responsible for managing local storage. 
 */
class StorageService extends Service {
  
  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public getUserData(): any {
    const rawData = localStorage.getItem("user");
    
    return rawData ? JSON.parse(rawData) : null;
  }
}

export default StorageService;
