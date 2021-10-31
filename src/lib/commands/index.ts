import { RxEvent } from "../event";
import { declareEvent } from "../event-creators";
import { onEvent } from "../event-filters";

export type RxCommand = RxEvent;
export const declareCommand = declareEvent;
export const reactTo = onEvent;
