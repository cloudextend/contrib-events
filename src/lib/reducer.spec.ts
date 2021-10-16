import { args, declareEvent } from "./event-creators";
import { createEventReducer, when } from "./reducer";

describe("Event Reducer", () => {
    const testSource = "Testing / Event Creator";
    const testVerb = "Execute Test";

    interface TestState {
        textState: string;
        numberState: number;
    }

    const initialState = { textState: "Initial", numberState: -1 } as TestState;
    const expectedEndState = { ...initialState, numberState: 111100 };

    afterEach(() => {
        // Ensure that the initial state remained unchanged
        if (
            initialState.numberState !== -1 ||
            initialState.textState !== "Initial" ||
            expectedEndState.numberState !== 111100 ||
            expectedEndState.textState !== initialState.textState
        ) {
            throw Error("States not treated as immutable");
        }
    });

    describe("When handling events without event args", () => {
        it("Can handle events by verb name", () => {
            const reducer = createEventReducer(
                initialState,
                when(testVerb, state => ({
                    ...state,
                    numberState: expectedEndState.numberState,
                })),
                when("Unexpected Event", state => ({
                    ...state,
                    numberState: 200111,
                    textState: "unexpected",
                }))
            );

            const reduced = reducer(
                undefined,
                declareEvent(testVerb)("UNIT TEST")
            );
            expect(reduced.numberState).toEqual(expectedEndState.numberState);
            expect(reduced.textState).toEqual(initialState.textState);
        });

        it("Can handle prepared events", () => {
            const expected = declareEvent("Expected Event");
            const unexpected = declareEvent("Unexpected Event");

            const reducer = createEventReducer(
                initialState,
                when(unexpected, state => ({ ...state, numberState: 20011 })),
                when(expected, state => ({
                    ...state,
                    numberState: expectedEndState.numberState,
                }))
            );

            const reduced = reducer(undefined, expected(testSource));
            expect(reduced.numberState).toEqual(expectedEndState.numberState);
            expect(reduced.textState).toEqual(initialState.textState);
        });
    });

    describe("When handling events with arguments", () => {
        it("Can handle arguments in events referred by verb name", () => {
            const reducer = createEventReducer(
                initialState,
                when(testVerb, (state, e) => ({
                    ...state,
                    numberState: e.numberArg,
                })),
                when("Unexpected event", state => ({
                    ...state,
                    textState: "Unexpceted",
                    numberState: 2342334,
                }))
            );

            const event = declareEvent(testVerb, args<{ numberArg: number }>());
            const reduced = reducer(
                undefined,
                event("UNIT TEST", { numberArg: expectedEndState.numberState })
            );

            expect(reduced.numberState).toEqual(expectedEndState.numberState);
            expect(reduced.textState).toEqual(initialState.textState);
        });

        it("Can handle parepared events", () => {
            const expected = declareEvent(
                testVerb,
                args<{ numberArgs: number }>()
            );
            const unexpected = declareEvent(
                "Unexpected event",
                args<{ numberArgs: number }>()
            );
            const reducer = createEventReducer(
                initialState,
                when(unexpected, (state, e) => ({
                    ...state,
                    textState: "Unexpceted",
                    numberState: e.numberArgs,
                })),
                when(expected, (state, e) => ({
                    ...state,
                    numberState: e.numberArgs,
                }))
            );

            const reduced = reducer(
                undefined,
                expected(testSource, {
                    numberArgs: expectedEndState.numberState,
                })
            );

            expect(reduced.numberState).toEqual(expectedEndState.numberState);
            expect(reduced.textState).toEqual(initialState.textState);
        });
    });
});
