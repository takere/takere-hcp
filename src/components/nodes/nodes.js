import GenericNode from "./generic";
import ConditionalNode from "./conditional";
import BeginNode from "./begin";

export const nodeTypes = {
    BEGIN: BeginNode,
    CONDITIONAL: ConditionalNode,
    EXPLANATION: GenericNode,
    ORIENTATION: GenericNode,
    MEDICATION_CONTROL: GenericNode,
    QUIZ: GenericNode,
    REMINDER: GenericNode
}
