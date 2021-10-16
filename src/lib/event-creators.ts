import { Creator } from "@ngrx/store";

import { RxEvent } from "./event";
import { getEventActionType } from "./event-action-type";

export type ObjectLike = Record<string, unknown>;
export type Primitive = string | number | boolean;

export interface Args<T> {
    _p: T;
    _as: "obj" | "primitive";
}

export function args<T extends Primitive>(name: string): Args<T>;
export function args<T extends ObjectLike>(): Args<T>;
export function args<T>(name?: string): Args<T> {
    return name
        ? { _p: (undefined as unknown) as T, _as: "primitive" }
        : { _p: (undefined as unknown) as T, _as: "obj" };
}

export type EventCreator<C extends Creator = Creator> = C & {
    readonly verb: string;
};

export type UnparameterizedEventCreator = EventCreator<
    (source: string) => RxEvent
>;
export type ParameterizedEventCreator<
    T extends ObjectLike | Primitive
> = EventCreator<
    (
        source: string,
        args: T
    ) => T extends Primitive ? RxEvent & { value: T } : RxEvent & T
>;

export function declareEvent(verb: string): UnparameterizedEventCreator;
export function declareEvent<P extends ObjectLike | Primitive>(
    verb: string,
    params: Args<P>
): ParameterizedEventCreator<P>;
export function declareEvent<P extends ObjectLike | undefined = undefined>(
    verb: string,
    params?: Args<P>
) {
    if (!params) {
        const creator = (source: string) =>
            ({
                source,
                verb,
                type: getEventActionType(source, verb),
            } as RxEvent);
        verbify(creator, verb);
        return creator;
    } else if (params._as === "primitive") {
        const creator = (source: string, args: P) =>
            ({
                source,
                verb,
                type: getEventActionType(source, verb),
                value: args,
            } as RxEvent & { value: P });
        verbify(creator, verb);
        return creator;
    } else {
        const creator = (source: string, args: P) =>
            ({
                ...args,
                source,
                verb,
                type: getEventActionType(source, verb),
            } as RxEvent & P);
        verbify(creator, verb);
        return creator;
    }
}

function verbify(creator: Creator, verb: string): void {
    Object.defineProperty(creator, "verb", {
        value: verb,
        writable: false,
    });
}
