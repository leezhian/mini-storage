export function fetchInsert() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve({
          stat: 1,
          message: '成功'
        })
      }, 1000);
    } catch (error) {
      reject(error)
    }
  })
}