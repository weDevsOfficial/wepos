/**
 * Get DayJS supported date format.
 *
 * @since WEPOS_LITE_SINCE
 *
 * @param {string} dateFormat The date format to convert
 *
 * @return {string} DayJS supported date format
 */
export function wepos_get_dayjs_date_format( dateFormat = wepos.wp_date_format ) {
    let formatMap = {
        // Day
        d: 'DD',
        D: 'ddd',
        j: 'D',
        // Month
        F: 'MMM',
        m: 'MM',
        M: 'MMM',
        n: 'M',
        // Year
        Y: 'YYYY',
        y: 'YY'
    }

    let dayJsDateFormat = '';

    for ( let i = 0; i < dateFormat.length; i++ ) {
        const char = dateFormat[i];

        dayJsDateFormat += formatMap[char] ? formatMap[char] : char;
    }

    return dayJsDateFormat;
}

/**
 * Get date range picker supported date format.
 *
 * @since WEPOS_LITE_SINCE
 *
 * @param {string} dateFormat The date format to convert
 *
 * @return {string} Date range picker supported date format
 */
export function wepos_get_daterange_picker_date_format( dateFormat = wepos.wp_date_format ) {
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

    let dateRangePickerFormat = '';

    for ( let i = 0; i < dateFormat.length; i++ ) {
        const char = dateFormat[i];

        dateRangePickerFormat += formatMap[char] ? formatMap[char] : char;
    }

    return dateRangePickerFormat;
}

/**
 * Get custom date ranges.
 *
 * @since WEPOS_LITE_SINCE
 *
 * @param {string} dateContext The date context
 *
 * @return {array} Date range
 */
export function wepos_get_custom_date_ranges( dateContext = "this year" ) {
    let dateRange = [];

    switch ( dateContext ) {
        case "today":
            dateRange["start"] = dayjs().startOf('day').toDate();
            dateRange["end"]   = dayjs().endOf('day').toDate();
            break;

        case "yesterday":
            dateRange["start"] = dayjs().subtract( 1, 'days' ).startOf( 'day' ).toDate();
            dateRange["end"]   = dayjs().subtract( 1, 'days' ).endOf( 'day' ).toDate();
            break;

        case "this week":
            dateRange["start"] = dayjs().startOf( 'week' ).toDate();
            dateRange["end"]   = dayjs().endOf( 'week' ).toDate();
            break;

        case "this month":
            dateRange["start"] = dayjs().startOf( 'month' ).toDate();
            dateRange["end"]   = dayjs().endOf( 'month' ).toDate();
            break;

        case "this quarter":
            dateRange["start"] = dayjs().startOf( 'quarter' ).toDate();
            dateRange["end"]   = dayjs().endOf( 'quarter' ).toDate();
            break;

        case "last month":
            dateRange["start"] = dayjs().subtract( 1, 'months' ).startOf( 'month' ).toDate();
            dateRange["end"]   = dayjs().subtract( 1, 'months' ).endOf( 'month' ).toDate();
            break;

        case "this year":
        default:
            dateRange["start"] = dayjs().startOf( 'year' ).toDate();
            dateRange["end"]   = dayjs().endOf( 'year' ).toDate();
    }

    return dateRange;
}
