/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Styled from "./styled";
import LocaleService from "../../../services/locale.service";
import GenericNode from "../generic";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const ConditionalNode = ({ data, onRemove, id }: any) => {

  const localeService = new LocaleService();

  return (
    <GenericNode 
      data={data}
      onRemove={onRemove}
      id={id}
      specificNodeInformation={<ConditionalInformation localeService={localeService} />}
    />
  );
};

export default ConditionalNode;

const ConditionalInformation = ({ localeService }: any) => (
  <div>
    <Styled.FlowLabel className="false">
      { localeService.translate("FALSE") }
    </Styled.FlowLabel>
    <Styled.FlowLabel className="true">
      { localeService.translate("TRUE") }
    </Styled.FlowLabel>
  </div>
);
