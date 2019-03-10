'use strict';

const Controller = require('egg').Controller;
const http = require('http');
const iconv = require('iconv-lite');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const url = 'http://bslc.lib.swjtu.edu.cn/uas/gethtml_zuowei.jsp';
    http.get(url, function(res) {
      const arrBuf = [];
      let bufLength = 0;
      res.on('data', function(chunk) {
        arrBuf.push(chunk);
        bufLength += chunk.length;
      });
      res.on('end', function() {
        const chunkAll = Buffer.concat(arrBuf, bufLength);
        var seatInfo = iconv.decode(chunkAll, 'gbk');
      });
    });
    const data = await ctx.service.spider.infoProcess(seatInfo);
    console.log(seatInfo)
  }
}

module.exports = HomeController;
