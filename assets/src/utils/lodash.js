import lodash from 'lodash/core';
import findIndex from 'lodash/findindex';
import truncate from 'lodash/truncate';

_ = lodash.noConflict();
_.findIndex = findIndex;
_.truncate = truncate;

export default _;