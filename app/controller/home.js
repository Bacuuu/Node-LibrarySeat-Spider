'use strict';

const Controller = require('egg').Controller;
const http = require('http');
const iconv = require('iconv-lite');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const url = 'http://bslc.lib.swjtu.edu.cn/uas/gethtml_zuowei.jsp';
    let seatInfo = '';

    const httpget = new Promise(function(resolve, reject) {
      http.get(url, function(res) {
        const arrBuf = [];
        let bufLength = 0;
        res.on('data', function(chunk) {
          arrBuf.push(chunk);
          bufLength += chunk.length;
        });
        res.on('end', function() {
          const chunkAll = Buffer.concat(arrBuf, bufLength);
          seatInfo = iconv.decode(chunkAll, 'gbk');
          resolve(seatInfo);
        });
      });
    });
    httpget.then(async function() {
      const res = await ctx.service.spider.infoProcess(seatInfo);
      console.log(res);
    });
  }
}

module.exports = HomeController;
