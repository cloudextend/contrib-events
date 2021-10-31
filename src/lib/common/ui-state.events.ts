import { declareEvent, args } from "..";

export const idle = declareEvent("#idle");
export const busy = declareEvent("#busy", args<{ message: string }>());
