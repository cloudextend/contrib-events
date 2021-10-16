import { Creator } from "@ngrx/store";

import { RxEvent } from "./event";
import { EventCreator } from "./event-creators";

export type Unsourced<T extends Creator> = T extends (source: string) => RxEvent
    ? () => RxEvent
    : (args: Parameters<T>[1]) => RxEvent & Parameters<T>[1];
    
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>
): [Unsourced<T1>, Unsourced<T2>];
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator,
    T3 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>,
    c3: EventCreator<T3>
): [Unsourced<T1>, Unsourced<T2>, Unsourced<T3>];
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator,
    T3 extends Creator = Creator,
    T4 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>,
    c3: EventCreator<T3>,
    c4: EventCreator<T4>
): [Unsourced<T1>, Unsourced<T2>, Unsourced<T3>, Unsourced<T4>];
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator,
    T3 extends Creator = Creator,
    T4 extends Creator = Creator,
    T5 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>,
    c3: EventCreator<T3>,
    c4: EventCreator<T4>,
    c5: EventCreator<T5>
): [Unsourced<T1>, Unsourced<T2>, Unsourced<T3>, Unsourced<T4>, Unsourced<T5>];
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator,
    T3 extends Creator = Creator,
    T4 extends Creator = Creator,
    T5 extends Creator = Creator,
    T6 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>,
    c3: EventCreator<T3>,
    c4: EventCreator<T4>,
    c5: EventCreator<T5>,
    c6: EventCreator<T6>
): [
    Unsourced<T1>,
    Unsourced<T2>,
    Unsourced<T3>,
    Unsourced<T4>,
    Unsourced<T5>,
    Unsourced<T6>
];
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator,
    T3 extends Creator = Creator,
    T4 extends Creator = Creator,
    T5 extends Creator = Creator,
    T6 extends Creator = Creator,
    T7 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>,
    c3: EventCreator<T3>,
    c4: EventCreator<T4>,
    c5: EventCreator<T5>,
    c6: EventCreator<T6>,
    c7: EventCreator<T7>
): [
    Unsourced<T1>,
    Unsourced<T2>,
    Unsourced<T3>,
    Unsourced<T4>,
    Unsourced<T5>,
    Unsourced<T6>,
    Unsourced<T7>
];
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator,
    T3 extends Creator = Creator,
    T4 extends Creator = Creator,
    T5 extends Creator = Creator,
    T6 extends Creator = Creator,
    T7 extends Creator = Creator,
    T8 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>,
    c3: EventCreator<T3>,
    c4: EventCreator<T4>,
    c5: EventCreator<T5>,
    c6: EventCreator<T6>,
    c7: EventCreator<T7>,
    c8: EventCreator<T8>
): [
    Unsourced<T1>,
    Unsourced<T2>,
    Unsourced<T3>,
    Unsourced<T4>,
    Unsourced<T5>,
    Unsourced<T6>,
    Unsourced<T7>,
    Unsourced<T8>
];
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator,
    T3 extends Creator = Creator,
    T4 extends Creator = Creator,
    T5 extends Creator = Creator,
    T6 extends Creator = Creator,
    T7 extends Creator = Creator,
    T8 extends Creator = Creator,
    T9 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>,
    c3: EventCreator<T3>,
    c4: EventCreator<T4>,
    c5: EventCreator<T5>,
    c6: EventCreator<T6>,
    c7: EventCreator<T7>,
    c8: EventCreator<T8>,
    c9: EventCreator<T9>
): [
    Unsourced<T1>,
    Unsourced<T2>,
    Unsourced<T3>,
    Unsourced<T4>,
    Unsourced<T5>,
    Unsourced<T6>,
    Unsourced<T7>,
    Unsourced<T8>,
    Unsourced<T9>
];
export function bindSource<
    T1 extends Creator = Creator,
    T2 extends Creator = Creator,
    T3 extends Creator = Creator,
    T4 extends Creator = Creator,
    T5 extends Creator = Creator,
    T6 extends Creator = Creator,
    T7 extends Creator = Creator,
    T8 extends Creator = Creator,
    T9 extends Creator = Creator,
    T10 extends Creator = Creator
>(
    source: string,
    c1: EventCreator<T1>,
    c2: EventCreator<T2>,
    c3: EventCreator<T3>,
    c4: EventCreator<T4>,
    c5: EventCreator<T5>,
    c6: EventCreator<T6>,
    c7: EventCreator<T7>,
    c8: EventCreator<T8>,
    c9: EventCreator<T9>,
    c10: EventCreator<T10>
): [
    Unsourced<T1>,
    Unsourced<T2>,
    Unsourced<T3>,
    Unsourced<T4>,
    Unsourced<T5>,
    Unsourced<T6>,
    Unsourced<T7>,
    Unsourced<T8>,
    Unsourced<T9>,
    Unsourced<T10>
];


export function bindSource(source: string, ...creators: Creator[]) {
    return creators.map(c => (...params: unknown[]) => c(source, ...params));
}
