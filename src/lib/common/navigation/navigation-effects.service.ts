import { Injectable } from "@angular/core";
import { NavigationExtras, Route, Router } from "@angular/router";
import { Actions, createEffect } from "@ngrx/effects";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { onEvent } from "../../event-filters";
import { navigation } from "./navigation-event";

type UiRoute = Route & { viewState: string };

@Injectable({ providedIn: "root" })
export class NavigationEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router
    ) {
        // router.events.pipe(
        //     filter(
        //         event =>
        //             event instanceof RouteConfigLoadEnd &&
        //             Object.prototype.hasOwnProperty.call(
        //                 event.route,
        //                 "viewState"
        //             )
        //     ),
        //     switchMap((event: RouteConfigLoadEnd) => {
        //         const route = event.route as unknown as UiRoute;
        //         this.routesMap.set(route.viewState, this.createView(route));
        //     })
        // );
    }

    navigateOnEvent$ = createEffect(
        () =>
            this.actions$.pipe(
                onEvent(navigation),
                switchMap(event => {
                    const { params, queryParams } = event;
                    const pathParams = event.pathSegments;
                    const navExtras = queryParams
                        ? ({ queryParams } as NavigationExtras)
                        : undefined;

                    let result: Promise<boolean>;
                    if (params && pathParams) {
                        const urlSegments = pathParams.map(seg =>
                            params[seg] ? params[seg] : seg
                        );
                        result = this.router.navigate(urlSegments, navExtras);
                    } else {
                        result = this.router.navigate(pathParams, navExtras);
                    }
                    return from(result);
                })
            ),
        { dispatch: false }
    );
}
