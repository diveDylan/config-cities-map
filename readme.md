### why
根据城市组合配置组合多个城市成一个地图
when your cities map data are different from chinese province map. we write a node tool to format the xlsx file to a data map, than transform the chinese cites map data to custom map data

### usage

```bash
  npm install
  ## or npm i 
  node app.js
  ## or npm run start 
```
### methods
```js
/**
 * @description 从xlxs文件中生成market的map类型数据
 * @param {string} fileName input filename xlsx
 * @param {string} outputFile output map data js file or other file you like
 */
function makeConfig(fileName, outputFile) {}
/**
 * make city feature list from configs
 * @param {Object} marketsData 
 */
function makeConfigMapData(configs) {

}
/**
 * @description 完整的中国自定义区块地图
 * @param {Object} configs 配置
 */
function combineConfigsMapJSON (configs) {}
/**
 * 单个地图整合块制作
 * make cities map geoJson from cities config
 * @param {Array} citiesData cities config
 */
function getConfigCitesJSON(citiesData) {
}
```

### examples
```js
 const configs = {
  // no need format
  "深圳": [ "深圳", "珠海","香港", "澳门", "广州" ],
};

getConfigCitesJSON(configs)

```
the map data looks like this in echarts

<img src="./example.png">

