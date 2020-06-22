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
/**
 * 
 * @param {Object} marketsData 
 */
function makeMarketMapData (marketsData) {
  const list = Object.keys(marketsData).map(market => {
    const obj = {}
    marketsData[market].map((i, index) => {
      console.log(i)
      const data = findCityByName(i)[0]
      if(index === 0) {
        obj.id = data.id
        obj.properties = {
          ...data.properties,
          name: market
        }
        obj.geometry = {
          "type": 'MultiPolygon',
          "coordinates": [],
          "encodeOffsets": []
        }
      }
      obj.geometry.coordinates.push(Array.isArray(data.geometry.coordinates[0]) ? data.geometry.coordinates[0] : data.geometry.coordinates)
      obj.geometry.encodeOffsets.push(Array.isArray(data.geometry.encodeOffsets[0][0]) ? data.geometry.encodeOffsets[0] : data.geometry.encodeOffsets )
    })
    return obj
  })
  // fs.appendFile('map.js', JSON.stringify(list), (err) => {
  //   if (err) throw err;
  //   console.log('数据已被追加到文件');
  // });
  return list
}

// format excel
const xlsx = require('node-xlsx').default;
// 写market map映射文件
/**
 * 
 * @param {*} fileName input filename xlsx
 * @param {*} outputFile output map data js file or other file you like
 */
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

/**
 * 
 * @param {Array} citiesData cities map data
 * @return {File} map js file
 */
function combineMap(citiesData) {
  let list = []
  const marketMap = makeMarketMapData(citiesData)
  Object.keys(citiesData).forEach(city => {
     list.push(...citiesData[city])
  })
  features.forEach((feature, index) => {
    if(list.includes(feature.properties.name)) {
      features[index] = null
    }
  })
  const featrues = features.filter(i => i)
  
  fs.appendFile(`${__dirname}/js/china.js`, JSON.stringify(featrues.concat(marketMap)), (err) => {
    if(err) {
      console.log('write map error')
    }
    else {
      console.log('write map file success')
    }
  })
}

// combineMap(markets)

function getCitiesMarket(citiesData) {
  Object.keys(citiesData).forEach(city => {
    const json =  {
      "type": "FeatureCollection",
      "UTF8Encoding": true,
      "features": []
    }
    citiesData[city].forEach(i => {
      const data = findCityByName(i)[0]
      json.features.push(data)
    })
    fs.appendFile(`${__dirname}/map/${city}.json`, JSON.stringify(json), (err) => {
      if (err) {
        console.log(`write  ${city}.json error`, err)
      } else {
        console.log(`write  ${city}.json success`)
      }
    })
  })
}
getCitiesMarket(markets)