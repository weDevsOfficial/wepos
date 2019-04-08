import lodash from 'lodash/core';
import findIndex from 'lodash/findindex';
import truncate from 'lodash/truncate';
import includes from 'lodash/fp/includes.js';

_ = lodash.noConflict();
_.findIndex = findIndex;
_.truncate = truncate;
_.includes = includes;

export default _;