import { RxEvent } from "./event";

export function getEventActionType(source: string, verb: string): string {
    return `[${source}] ${verb}`;
}

export function createBasicEvent(source: string, verb: string): RxEvent {
    return {
        source,
        verb,
        type: getEventActionType(source, verb),
    };
}
