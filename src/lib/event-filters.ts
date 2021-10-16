import { Action } from "@ngrx/store";
import { of, EMPTY, OperatorFunction } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { RxEvent } from "./event";
import {
    EventCreator,
    BasicEventCreator,
    ComplexEventCreator,
    ObjectLike,
    Primitive,
    ScalarEventCreator,
} from "./event-creators";

/**
 * Pipable operator for filtering occurences of a specific event type. Useful for
 * writing Effects that apply to all occurences of an event.
 * @param eventOrVerb The event or the verb of the event.
 */
export function onEvent(
    eventOrVerb: string | BasicEventCreator
): OperatorFunction<Action, RxEvent>;
export function onEvent<ArgsType extends ObjectLike>(
    event: ComplexEventCreator<ArgsType>
): OperatorFunction<Action, RxEvent & ArgsType>;
export function onEvent<ArgsType extends Primitive>(
    event: ScalarEventCreator<ArgsType>
): OperatorFunction<Action, RxEvent & { value: ArgsType }>;
export function onEvent<ArgsType extends ObjectLike | Primitive>(
    eventOrVerb: ArgsType extends ObjectLike
        ? ComplexEventCreator<ArgsType>
        : ArgsType extends Primitive
        ? ScalarEventCreator<ArgsType>
        : string | BasicEventCreator
) {
    const expectedVerb =
        typeof eventOrVerb === "string"
            ? eventOrVerb
            : (eventOrVerb as unknown as EventCreator).verb;

    return mergeMap((action: Action) =>
        (action as RxEvent).verb === expectedVerb
            ? of(action as RxEvent & ArgsType)
            : EMPTY
    );
}

// export function onEvents(
//     events: EventCreator[]
// ): OperatorFunction<Action, RxEvent> {
//     const expectedVerbs = new Set<string>(events.map(e => e.verb));
//     return flatMap((action: Action) =>
//         expectedVerbs.has((action as RxEvent).verb)
//             ? of(action as RxEvent)
//             : EMPTY
//     );
// }

/**
 * Logical operator for checking whether a specific event is the
 * occurence of a given type of event.
 * @param event The occurence of the event.
 * @param eventOrVerb The event or verb of the event that was raised.
 */
export function occurenceOf(
    event: EventCreator,
    eventOrVerb: string | RxEvent
): boolean {
    // prettier-ignore
    const verb = typeof eventOrVerb === "string" 
        ? eventOrVerb 
        : eventOrVerb.verb;
    return (event as unknown as EventCreator).verb === verb;
}
