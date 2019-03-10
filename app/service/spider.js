'use strict';

const Service = require('egg').Service;

class SpiderService extends Service {
  async infoProcess(str) {
    const reList = [];
    reList.push(str.match(/犀浦校区图书馆 - 2层 - \S*"TotalCount":\d*/g));
    return str.match(/犀浦校区图书馆 - 2层 - \S*"TotalCount":\d*/g);
  }
}

module.exports = SpiderService;
