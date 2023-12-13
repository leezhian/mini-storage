import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil'
import { userIdState, userNameQuery, multUserNameQuery } from '../../recoil/userInfo'

function UserInfo() {
  // 异步查询
  // const userName = useRecoilValue(userNameQuery)
  // 带参查询
  // const userName = useRecoilValue(userNameQuery(userIdState))
  // 手动确定渲染状态
  // const userNameLoadable = useRecoilValueLoadable(userNameQuery)
  // 并行查询
  const userNameArr = useRecoilValue(multUserNameQuery([1, 2, 3]))

  const [userId, setUserId] = useRecoilState(userIdState) 

  // switch (userNameLoadable.state) {
  //   case 'hasValue':
  //     return <div>{userNameLoadable.contents}</div>;
  //   case 'loading':
  //     return <div>加载中……</div>;
  //   case 'hasError':
  //     throw userNameLoadable.contents;
  // }
  return <>
    {/* <div>{userNameArr}</div> */}
    <div>{userId}</div>
  </>
}

export default UserInfo