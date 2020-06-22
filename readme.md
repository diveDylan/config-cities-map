### why
yumc has 18 markets, each markest map data are different from chinese province map. we write a node tool to format the xlsx file to a data map, than transform the chinese cites map data to market map data

### usage

```bash
  npm install
  ## or npm i 
  node app.js
  ## or npm run start 
```
two functions in `app.js`
```js
/**
 * @description 从xlxs文件中生成market的map类型数据
 * @param {string} fileName input filename xlsx
 * @param {string} outputFile output map data js file or other file you like
 */
function makeMarketMap(fileName, outputFile) {}

/**
 * @description 制作市场地图
 * @param {Object} marketsData 
 */
function makeMarketMapData (marketsData) {}

```
