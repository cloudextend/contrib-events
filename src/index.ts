import { args, declareEvent } from "./lib";

export * from "./lib";

export const ignorableEvent = declareEvent(
    "NoOp",
    args<{ narration: string }>()
);
