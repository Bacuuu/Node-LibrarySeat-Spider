'use strict';

const Service = require('egg').Service;

class SpiderService extends Service {
  async infoProcess(str) {
    const reList = [];
    const info = {};
    let key = '';
    reList.push(str.match(/犀浦校区图书馆 - 2层 - \S*"UsableCount":\d*/g));
    reList.push(str.match(/犀浦校区图书馆 - 3层 - \S*"UsableCount":\d*/g));
    reList.push(str.match(/犀浦校区图书馆 - 4层 - \S*"UsableCount":\d*/g));
    reList.push(str.match(/犀浦校区图书馆 - 5层 - \S*"UsableCount":\d*/g));
    for (const item of reList) {
      for (const count of item) {
        key = count.match(/- .*",/g)[0].slice(7, -2);
        info[key] = {};
        for (const x in count.match(/\d+/g).slice(-2)) {
          if (x === '0') {
            info[key].Totalcount = parseInt(count.match(/\d+/g).slice(-2)[x]);
          } else if (x === '1') {
            info[key].UseableCount = parseInt(count.match(/\d+/g).slice(-2)[x]);
          }
        }
      }
    }
    return info;
  }
}

module.exports = SpiderService;
