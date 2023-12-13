import { atom, selector, selectorFamily, waitForAll } from 'recoil'

function httpRequest() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        stat: 1,
        name: '至安'
      })
    }, 1000)
  })
}

const userIdState = atom({
  key: 'UserId',
  default: 1
})

// 异步 selector
// const userNameQuery = selector({
//   key: 'UserName',
//   get: async ({get}) => {
//     const res = await httpRequest({
//       uId: get(userIdState)
//     })

//     if(res.error) throw new Error(res.error)

//     return res.name
//   }
// })

// 带参 selector
const userNameQuery = selectorFamily({
  key: 'UserName',
  get: userId => async () => {
    const res = await httpRequest({
      uId: userId
    })

    if(res.error) throw new Error(res.error)

    return res.name
  }
})

// 并行查询
const multUserNameQuery = selectorFamily({
  key: 'multUserName',
  get: uIds => ({get}) => {
    return get(waitForAll(uIds.map(uid => userNameQuery(uid))))
  }
})

export {
  userIdState,
  userNameQuery,
  multUserNameQuery
}