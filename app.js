'use strict'
const path = require('path')
const fs = require('fs')
const markets = require('./market.js')
const map = require('./marketMap.js')
const features = map.features
const findCityByName = name => {
  return features.filter(i => i.properties.name === name)
}
// 制作市场地图
function makeMarketMapData () {
  const list = Object.keys(markets).map(market => {
    const obj = {}
    markets[market].map((i, index) => {
      const data = findCityByName(i)[0]
      if(index === 0) {
        obj.id = data.id
        obj.properties = data.properties
        obj.geometry = {
          "type": data.geometry.type,
          "coordinates": [],
          "encodeOffsets": []
        }
      }
      obj.geometry.coordinates.push(Array.isArray(data.geometry.coordinates[0]) ? data.geometry.coordinates[0] : data.geometry.coordinates)
      obj.geometry.encodeOffsets.push(Array.isArray(data.geometry.encodeOffsets[0][0]) ? data.geometry.encodeOffsets[0] : data.geometry.encodeOffsets )
      console.log(JSON.stringify(obj))
    })
    return obj
  })
  fs.appendFile('map.js', JSON.stringify(list), (err) => {
    if (err) throw err;
    console.log('数据已被追加到文件');
  });
}


// format excel
const xlsx = require('node-xlsx').default;
// 写market map映射文件
function makeMarketMap (fileName, outputFile) {
  // Parse a buffer
  const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/${fileName}`));
  let marketMap = {}
  workSheetsFromBuffer[0].data.map((data, index) => {
    if (index > 0) {
      marketMap[data[1]] = marketMap[data[1]] || []
      marketMap[data[1]].push(data[3])
    }
  })
  fs.appendFile(outputFile, JSON.stringify(marketMap), (err) => {
    if (err) throw err;
    console.log('数据已被追加到文件');
  });
}
