/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Node from "../domain/node.domain";
import NodeConnection from "../models/node-connection.model";
import Service from "./service";


/**
 * Responsible for managing node requests.
 */
class NodeService extends Service {
  
  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async getNodes(): Promise<Node> {
    const response = await this.remoteRequest.get('/nodes/me');

    return response.data;
  }

  public async getNodeConnections(): Promise<NodeConnection> {
      const response = await this.remoteRequest.get('/nodes/connections');

      return response.data;
  }
}

export default NodeService;
