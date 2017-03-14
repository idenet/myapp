export function getBuyUrl(str) {
  let arr = str.split(' ')
  let obj = {}
  arr.forEach((value, index) => {
    let result = value.split(':')
    let key = result[0]
    let val = result[1] + ':' + result[2]
    obj[key] = val
  })
  return obj
}
