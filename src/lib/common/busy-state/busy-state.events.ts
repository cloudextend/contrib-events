import { args, declareEvent } from "../../event-creators";

export const idle = declareEvent("#idle");
export const busy = declareEvent("#busy", args<{ message: string }>());
