import { extractUrlSegments } from "./url-segments-extractor";

describe("routeCreator", () => {
    const inputAndExpectation = [
        ["santa", ["santa"]],
        ["santa/ho/ho/ho", ["santa/ho/ho/ho"]],
        ["santa/ho/:p1", ["santa/ho", "p1"]],
        ["santa/ho/:p1/:p2", ["santa/ho", "p1", "p2"]],
        ["santa/:p1", ["santa", "p1"]],
        ["santa/:p1/:p2", ["santa", "p1", "p2"]],
        ["santa/:p1/ho", ["santa", "p1", "ho"]],
        ["santa/:p1/ho/:p2", ["santa", "p1", "ho", "p2"]],
        ["santa/:p1/ho/ho/:p2", ["santa", "p1", "ho/ho", "p2"]],
        ["santa/:p1/ho/ho/:p2/ho", ["santa", "p1", "ho/ho", "p2", "ho"]],
    ];

    inputAndExpectation.forEach(data => {
        const [input, expectation] = data as ([string, string[]]);
        it("generates the exepeted set of URL Segments", () => {
            const extracted = extractUrlSegments(input);
            expect(extracted.length).toEqual(expectation.length);
            expect(extracted).toEqual(expectation);
        });
    });
});
