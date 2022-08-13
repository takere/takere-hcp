import {GenericNode} from "./genericNode/genericNode";
import ConditionalNode from "./conditional";
import {TimerTickNode} from "./timerTickNode/timerTickNode";

export const nodeTypes = {
    TIME_TICKER: TimerTickNode,
    BEGIN_NODE: TimerTickNode,
    GENERIC_NODE: GenericNode,
    CONDITIONAL_NODE: ConditionalNode,
    EXPLANATION_NODE: GenericNode,
    INFORMATION_NODE: GenericNode,
    MEDICATION_CONTROL_NODE: GenericNode,
    QUIZ_NODE: GenericNode,
    REMINDER_NODE: GenericNode
}
