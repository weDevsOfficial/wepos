/**
 * Get date range picker supported date format.
 *
 * @since 1.2.2
 *
 * @param {string} dateFormat The date format to convert
 *
 * @return {string} Date range picker supported date format
 */
export function wepos_get_daterange_picker_format( dateFormat = wepos.wp_date_format ) {
    let formatMap = {
        // Day
        d: 'dd',
        D: 'ddd',
        j: 'd',
        // Month
        F: 'mmmm',
        m: 'mm',
        M: 'mmm',
        n: 'm',
        // Year
        Y: 'yyyy',
        y: 'yy'
    }

    let i = 0;
    let char = '';
    let dateRangePickerFormat = '';

    for ( i = 0; i < dateFormat.length; i++ ) {
        char = dateFormat[i];

        if ( char in formatMap ) {
            dateRangePickerFormat += formatMap[char];
        } else {
            dateRangePickerFormat += char;
        }
    }

    return dateRangePickerFormat;
}
