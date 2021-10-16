import { ActionReducer } from "@ngrx/store";

import { RxEvent } from "./event";
import {
    UnparameterizedEventCreator,
    ParameterizedEventCreator,
    EventCreator,
    ObjectLike,
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
    event: UnparameterizedEventCreator,
    reducer: ActionReducer<StateType, RxEvent>
): When<StateType>;
export function when<StateType, ArgsType extends ObjectLike>(
    event: ParameterizedEventCreator<ArgsType>,
    reducer: ActionReducer<StateType, RxEvent & ArgsType>
): When<StateType>;
export function when<StateType, ArgsType extends ObjectLike | void>(
    verbOrEventCreator: ArgsType extends ObjectLike
        ? ParameterizedEventCreator<ArgsType>
        : string | UnparameterizedEventCreator,
    reducer: ArgsType extends void
        ? ActionReducer<StateType, RxEvent>
        : ActionReducer<StateType, RxEvent & ArgsType>
) {
    if (typeof verbOrEventCreator === "string") {
        return {
            reducer: reducer as ActionReducer<StateType, RxEvent>,
            verb: verbOrEventCreator,
        };
    } else {
        return {
            reducer: reducer as ActionReducer<StateType, RxEvent & ArgsType>,
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
