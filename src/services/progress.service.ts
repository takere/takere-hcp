/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Progress from "../domain/progress.domain";
import Service from "./service";


/**
 * Responsible for managing progress requests.
 */
class ProgressService extends Service {
  
  // --------------------------------------------------------------------------
  //     Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }


  // --------------------------------------------------------------------------
  //     Methods
  // --------------------------------------------------------------------------
  public async getPatients(): Promise<Progress[]> {
    const response = await this.remoteRequest.get('/progress/patients');
    
    return response.data;
  }

  public async getPatient(idPatient: string, idFlow: string): Promise<Progress> {
    const response = await this.remoteRequest.get(
      `/progress/patients/${idPatient}/${idFlow}`
    );
    
    return response.data;
  }
}

export default ProgressService;
