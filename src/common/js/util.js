export function getAmazonUrl(bookList) {
  // let amazomUrl = []
  bookList.forEach((value, index) => {
    let arrUrl = value
      .online
      .split(' ')
    let judg = judgment(arrUrl)
    console.log(judg)
    if (judg) {}
  })
}

function judgment(arrUrl) {
  arrUrl.forEach((value, index) => {
    let arr = value.split(':')
    console.log(arr)
    if (arr[0] === '亚马逊') {
      console.log(1)
      return arr[2]
    }
  })
}