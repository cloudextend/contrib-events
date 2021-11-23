import { Creator } from "@ngrx/store";

import { RxEvent } from "./event";

export type ObjectLike = Record<string, unknown>;
export type Primitive = string | number | boolean;

export interface Args<T> {
    _p: T;
    _as: "obj" | "primitive";
}

function getEventActionType(source: string, verb: string): string {
    return `[${source}] ${verb}`;
}

export function args<T extends Primitive>(name: string): Args<T>;
export function args<T extends ObjectLike>(): Args<T>;
export function args<T>(name?: string): Args<T> {
    return name
        ? { _p: undefined as unknown as T, _as: "primitive" }
        : { _p: undefined as unknown as T, _as: "obj" };
}

export type EventCreator<C extends Creator = Creator> = C & {
    readonly verb: string;
};

export type BasicEventCreator = EventCreator<(source: string) => RxEvent>;
export type ComplexEventCreator<T extends ObjectLike> = EventCreator<
    (source: string, args: T) => RxEvent & T
>;
export type ScalarEventCreator<T extends Primitive> = EventCreator<
    (source: string, args: T) => RxEvent & { value: T }
>;

export function declareEvent(verb: string): BasicEventCreator;
export function declareEvent<P extends Primitive>(
    verb: string,
    params: Args<P>
): ScalarEventCreator<P>;
export function declareEvent<P extends ObjectLike>(
    verb: string,
    params: Args<P>
): ComplexEventCreator<P>;
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
