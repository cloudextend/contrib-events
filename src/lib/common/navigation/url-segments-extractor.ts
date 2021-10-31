export function extractUrlSegments(url: string) {
    const segments = [] as string[];
    let buffer = new Array<string>(url.length);
    let bufferIndex = 0;
    let isParam = false;

    for (let i = 0; i < url.length; i++) {
        // copy until ':'
        const char = url.charAt(i);

        const isStartingParam = char === ":";
        const isEndingParam = !isStartingParam && isParam && char === "/";

        if (isStartingParam || isEndingParam) {
            // Found a parameter
            isParam = isStartingParam;
            if (bufferIndex > 0) segments.push(buffer.join(""));
            bufferIndex = 0;
            buffer = new Array<string>(url.length - i);
            continue;
        } else if (!isParam && char === "/" && url.charAt(i + 1) === ":") {
            continue;
        } else {
            buffer[bufferIndex++] = char;
        }
    }
    if (bufferIndex > 0) segments.push(buffer.join(""));

    return segments;
}
