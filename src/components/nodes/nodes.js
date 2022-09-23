import GenericNode from "./generic";
import ConditionalNode from "./conditional";
import BeginNode from "./begin";

export const nodeTypes = {
    BEGIN: BeginNode,
    CONDITIONAL: ConditionalNode,
    NON_PERIODIC: GenericNode,
    PERIODIC: GenericNode,
}
