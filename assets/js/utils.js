// Utility functions

/**
 * Maximum width (as % of certificate width) a centred text may use so it
 * never crosses the certificate edge. Text is centred on x, so the usable
 * width is twice the distance to the nearest edge, minus 5% margin per side.
 * @param {number} x - Horizontal centre of the text, in % (0-100)
 * @returns {number} Max width in % (never below 10)
 */
export function maxTextWidthPercent(x) {
    const pos = Number(x);
    const centre = Number.isFinite(pos) ? pos : 50;
    const nearestEdge = Math.min(centre, 100 - centre);
    return Math.max(2 * nearestEdge - 10, 10);
}

/**
 * Check if file is an image
 * @param {File} file - The file to check
 * @returns {boolean} True if file is an image
 */
export function isImageFile(file) {
    return file.type.match('image.*');
}

/**
 * Check if file is a CSV
 * @param {File} file - The file to check
 * @returns {boolean} True if file is a CSV
 */
export function isCSVFile(file) {
    return file.type === 'text/csv' || file.name.endsWith('.csv');
}

/**
 * Parse CSV content into entry objects.
 * Column order: name, ic, extra1, extra2, ...
 * Missing columns default to empty string. Backward-compatible with
 * 1-column (name only) and 2-column (name + IC) CSVs.
 *
 * @param {string} csvContent - The CSV file content
 * @param {number} extraCount - Number of extra fields currently defined
 * @returns {Array<{name: string, ic: string, extras: string[]}>} Array of entry objects
 */
export function parseCSVEntries(csvContent, extraCount = 0) {
    const lines = csvContent.split(/\r\n|\n/);
    const entries = [];

    for (let i = 0; i < lines.length && entries.length < 100; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const cells = line.split(',').map(cell => cell.trim());
        const name = cells[0];
        if (!name) continue;

        const ic = cells[1] || '';
        const extras = [];
        for (let j = 0; j < extraCount; j++) {
            extras.push(cells[2 + j] || '');
        }

        entries.push({ name, ic, extras });
    }

    return entries;
}
