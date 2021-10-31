import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { BUSY_STATE_FEATURE, reducer } from "./busy-state.reducer";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(BUSY_STATE_FEATURE, reducer),
    ],
})
export class BusyStateModule {}
