import { Injectable } from "@angular/core";
import { NavigationExtras, Route, Router } from "@angular/router";
import { Actions, createEffect } from "@ngrx/effects";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { reactTo } from "../../commands";
import { onEvent } from "../../event-filters";
import { navigate } from "./navigate.command";

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

    // private readonly routesMap = new Map<string, typeof navigate>();

    navigateOnEvent$ = createEffect(
        () =>
            this.actions$.pipe(
                onEvent(navigate),
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

    // private createView(route: UiRoute) {
    //     if (!route.path) {
    //         throw new Error(
    //             "Propety 'path' must be set on a route marked as a View State"
    //         );
    //     }

    //     const pathSegments = extractUrlSegments(route.path);

    //     const action = (
    //         source: string,
    //         params: Record<string, unknown>,
    //         queryParams?: Record<string, unknown>
    //     ) => navigate(source, { pathSegments, params, queryParams });
    //     this.viewify(action, route.viewState);

    //     return action;
    // }

    // private viewify(creator: unknown, stateName: string): void {
    //     Object.defineProperty(creator, "viewState", {
    //         value: stateName,
    //         writable: false,
    //     });
    // }
}
