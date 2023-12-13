import { useRecoilState } from "recoil"
import { userIdState } from '../recoil/userInfo'

function Demo() {
  const [userId, setUserId] = useRecoilState(userIdState)

  return (<div>
    <button onClick={() => setUserId(id => id + 1)}>+1</button>
    {userId}
  </div>)
}

export default Demo