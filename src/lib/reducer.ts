import { ActionReducer } from "@ngrx/store";

import { RxEvent } from "./event";
import {
    BasicEventCreator,
    ComplexEventCreator,
    EventCreator,
    ObjectLike,
    Primitive,
    ScalarEventCreator,
} from "./event-creators";

export type EventReducer<StateType> = (
    state: StateType,
    event: RxEvent
) => StateType;

export interface When<StateType> {
    reducer: ActionReducer<StateType, RxEvent>;
    verb: string;
}

export function when<StateType>(
    verb: string,
    reducer: ActionReducer<StateType, RxEvent>
): When<StateType>;
export function when<StateType>(
    event: BasicEventCreator,
    reducer: ActionReducer<StateType, RxEvent>
): When<StateType>;
export function when<StateType, ArgsType extends Primitive>(
    event: ScalarEventCreator<ArgsType>,
    reducer: ActionReducer<StateType, RxEvent & { value: ArgsType }>
): When<StateType>;
export function when<StateType, ArgsType extends ObjectLike>(
    event: ComplexEventCreator<ArgsType>,
    reducer: ActionReducer<StateType, RxEvent & ArgsType>
): When<StateType>;
export function when<StateType, ArgsType extends ObjectLike | Primitive | void>(
    verbOrEventCreator: ArgsType extends ObjectLike
        ? ComplexEventCreator<ArgsType>
        : ArgsType extends Primitive
        ? ScalarEventCreator<ArgsType>
        : string | BasicEventCreator,
    reducer: ArgsType extends void
        ? ActionReducer<StateType, RxEvent>
        : ArgsType extends Primitive
        ? ActionReducer<StateType, RxEvent & { value: ArgsType }>
        : ActionReducer<StateType, RxEvent & ArgsType>
) {
    if (typeof verbOrEventCreator === "string") {
        return {
            reducer: reducer as ActionReducer<StateType, RxEvent>,
            verb: verbOrEventCreator,
        };
    } else {
        return {
            reducer, //: reducer as ActionReducer<StateType, RxEvent & ArgsType>,
            verb: (verbOrEventCreator as EventCreator).verb,
        };
    }
}

export function createEventReducer<StateType>(
    initialState: StateType,
    ...whens: When<StateType>[]
): ActionReducer<StateType, RxEvent> {
    const map = new Map<string, ActionReducer<StateType, RxEvent>>(
        whens.map(w => [w.verb, w.reducer])
    );

    return function (
        state: StateType = initialState,
        action: RxEvent
    ): StateType {
        const reducer = map.get(action.verb);
        return reducer ? reducer(state, action) : state;
    };
}
