import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { NavigationEffects } from "./navigation-effects.service";

@NgModule({
    declarations: [],
    imports: [CommonModule, EffectsModule.forFeature([NavigationEffects])],
})
export class NavigationEventsModule {}
