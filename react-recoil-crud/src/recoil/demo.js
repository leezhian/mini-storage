import { atom } from "recoil";

const userIdState = atom({
  key: 'UserId',
  default: 2
})

export { userIdState }