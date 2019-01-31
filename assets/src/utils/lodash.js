import lodash from 'lodash/core';
import findIndex from 'lodash/findindex';

_ = lodash.noConflict();
_.findIndex = findIndex;

export default _;