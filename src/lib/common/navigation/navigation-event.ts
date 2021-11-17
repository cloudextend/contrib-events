import { RxEvent } from "../../event";
import { args, declareEvent } from "../../event-creators";

const NAVIGATION_VERB = "#navigate";

export interface NavigationEvent extends RxEvent {
    verb: "#navigate";
    pathSegments: unknown[];
    params?: Record<string, unknown>;
}

export const navigation = declareEvent(
    NAVIGATION_VERB,
    args<{
        pathSegments: string[];
        params?: Record<string, unknown>;
        queryParams?: Record<string, unknown>;
    }>()
);
