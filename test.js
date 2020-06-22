module.exports = {
  type: 'node',
  env: 'server',
  log: (str) => {
    console.log(str)
    return null
  }
}