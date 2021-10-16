import { RxEvent } from "./event";
import { args, declareEvent, EventCreator } from "./event-creators";

function isValidEvent(
    event: RxEvent,
    expectedSource: string,
    expectedVerb: string
): boolean {
    return (
        event?.source === expectedSource &&
        event?.verb === expectedVerb &&
        event?.type === `[${expectedSource}] ${expectedVerb}`
    );
}

describe("Event Creation", () => {
    const testSource = "Testing / Event Creator";
    const testVerb = "Execute Test";
    const isExpectedEvent = (event: RxEvent) =>
        isValidEvent(event, testSource, testVerb);

    describe("When declaring events that take no arguments", () => {
        const event = declareEvent(testVerb);

        it("Sets the event properties as execpted.", () => {
            isExpectedEvent(event(testSource));
        });

        it("Tags the creator with the verb.", () => {
            expect((event as EventCreator).verb).toEqual(testVerb);
        });
    });

    describe("When declaring an event that takes arguments", () => {
        const eventArgs = { textProp: "Value for test prop", numberProp: 152 };
        const event = declareEvent(
            testVerb,
            args<{ textProp: string; numberProp: number }>()
        );

        it("Sets the event properties as execpted.", () => {
            isExpectedEvent(event(testSource, eventArgs));
        });

        it("Adds the event argument's properties to the generated event.", () => {
            const occurance = event(testSource, eventArgs);
            expect(occurance.numberProp).toEqual(eventArgs.numberProp);
            expect(occurance.textProp).toEqual(eventArgs.textProp);
        });

        it("Tags the creator with the verb (for internal use)", () => {
            expect((event as EventCreator).verb).toEqual(testVerb);
        });
    });
});
