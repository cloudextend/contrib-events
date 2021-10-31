import { TestBed } from "@angular/core/testing";

import { NavigationEffects } from "./navigation-effects.service";

describe("NavigationEffectsService", () => {
    let service: NavigationEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NavigationEffects);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
