/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toast } from "react-toastify";
import Flow from "../domain/flow.domain";
import FlowDTO from "../dto/flow.dto";
import LocaleService from "./locale.service";
import Service from "./service";


/**
 * Responsible for managing flow requests.
 */
class FlowService extends Service {
  
  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly localeService: LocaleService;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.localeService = new LocaleService();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public async getMyFlows(): Promise<Flow> {
    const response = await this.remoteRequest.get('/flows/mines');
    
    return response.data;
  }

  public async getFlowById(id: string): Promise<Flow> {
    const toastId = toast.loading(this.localeService.translate("FETCHING_FLOW"));
    const response = await this.remoteRequest.get(`/flows/mines/${id}`);
    toast.dismiss(toastId);
    
    return response.data;
  }

  public async deleteFlowById(id: string): Promise<void> {
    const toastId = toast.loading(this.localeService.translate("REMOVING_FLOW"));
    
    await this.remoteRequest.delete(`/flows/mines/${id}`);
    
    toast.dismiss(toastId);
    toast.success(this.localeService.translate("FLOW_REMOVED_SUCCESS"));
  }

  public async create(flow: FlowDTO): Promise<void> {
    const toastId = toast.loading(this.localeService.translate("CREATING_FLOW"));
    
    await this.remoteRequest.post(`/flows/create`, flow);
    
    toast.dismiss(toastId);
    toast.success(this.localeService.translate("FLOW_CREATED_SUCCESS"))
  }
}

export default FlowService;
