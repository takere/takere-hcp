import {GenericNode} from "./genericNode/genericNode";
import ConditionalNode from "./conditional";
import {TimerTickNode} from "./timerTickNode/timerTickNode";

export const nodeTypes = {
    TIME: TimerTickNode,
    BEGIN: TimerTickNode,
    CONDITIONAL: ConditionalNode,
    EXPLANATION: GenericNode,
    ORIENTATION: GenericNode,
    MEDICATION_CONTROL: GenericNode,
    QUIZ: GenericNode,
    REMINDER: GenericNode
}
