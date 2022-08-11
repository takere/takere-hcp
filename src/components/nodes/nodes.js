import {GenericNode} from "./genericNode/genericNode";
import { InNode } from "./in/InNode";
import { InoutNode } from "./inout/InoutNode";
import { OutNode } from "./out/OutNode";
import ConditionalNode from "./conditional";
import {TimerTickNode} from "./timerTickNode/timerTickNode";

export const NodeTypes = {
    TIME_TICKER: TimerTickNode,
    BEGIN_NODE: TimerTickNode,
    GENERIC_NODE: GenericNode,
    CONDITIONAL_NODE: ConditionalNode,
    EXPLANATION_NODE: GenericNode,
    INFORMATION_NODE: GenericNode,
    MEDICATION_CONTROL_NODE: GenericNode,
    QUIZ_NODE: GenericNode,
    REMINDER_NODE: GenericNode
    // INOUT_NODE: InoutNode,
    // IN_NODE: InNode,
    // OUT_NODE: OutNode
}
