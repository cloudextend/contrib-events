import { createFeatureSelector, createSelector } from "@ngrx/store";
import { createEventReducer, when } from "../../reducer";

import { BusyState } from "./busy-state";
import { idle, busy } from "./busy-state.events";

export const BUSY_STATE_FEATURE = "ui.busy";

const initialState: BusyState = { isBusy: false };

export const reducer = createEventReducer(
    initialState,
    when(idle, () => ({ isBusy: false })),
    when(busy, (_, event) => ({ ...event, isBusy: true }))
);

const selectBusyState = createFeatureSelector<BusyState>(BUSY_STATE_FEATURE);

export const getIsBusy = createSelector(selectBusyState, state => state.isBusy);
export const getBusyMessaging = createSelector(
    selectBusyState,
    state => state.message
);
export const getBusyMessageSubText = createSelector(
    selectBusyState,
    state => state.subText
);
