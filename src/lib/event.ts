import { Action } from "@ngrx/store";

export interface RxEvent extends Action {
    readonly verb: string;
    readonly source: string;
    [other: string]: unknown;
}
