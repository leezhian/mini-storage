/*
 * @Author: kim
 * @Date: 2022-11-23 22:43:53
 * @Description: react riber 调度
 */
import {
  unstable_IdlePriority as IdlePriority,
  unstable_ImmediatePriority as ImmediatePriority,
  unstable_LowPriority as LowPriority,
  unstable_NormalPriority as NormalPriority,
  unstable_UserBlockingPriority as UserBlockingPriority,
  unstable_getFirstCallbackNode as getFirstCallbackNode,
  unstable_scheduleCallback as scheduleCallback,
  unstable_shouldYield as shouldYield,
  unstable_cancelCallback as cancelCallback,
  CallbackNode
} from "scheduler"
import { insertItem, createBtn } from './utils'
import './index.css'

// ------------------------------类型
// 优先级
type Priority = typeof ImmediatePriority | typeof UserBlockingPriority | typeof NormalPriority | typeof LowPriority | typeof IdlePriority

interface Work {
  count: number
  priority: Priority
}

// ------------------------------逻辑处理
const works: Work[] = []
let prevPriority = IdlePriority // 上一个任务的优先级
let curCallback: CallbackNode | null

const priorityMap: { [key: string]: Priority } = {
  ImmediatePriority,
  UserBlockingPriority,
  NormalPriority,
  LowPriority,
  IdlePriority
}

// 调度中心
function schedule() {
  // 获取队列第一个任务
  const cbNode = getFirstCallbackNode()
   
  // 获取优先级最高的任务
  const curWork = works.sort((w1, w2) => (w1.priority - w2.priority))[0]
  if(!curWork) {
    // 退出调度
    curCallback = null
    // 销毁任务
    cbNode && cancelCallback(cbNode)
    return
  }

  const { priority } = curWork
  // 优先级一样退出调度
  if(prevPriority === priority) return

  cbNode && cancelCallback(cbNode)
  
  // 创建任务 { callback, expirationTime: 过期时间, id, priorityLevel: 优先级, sortIndex, startTime: 开始时间 }
  curCallback = scheduleCallback(priority, perform.bind(null, curWork))
}

// 任务执行(时间分片为5ms)
function perform(work: Work, didTimeout?: boolean): any {  
  // 是否需要同步执行（条件：优先级是否为最高优先级 或 任务过期了）
  const needSync = work.priority === ImmediatePriority || didTimeout
  const contentBoxRef = document.getElementById('content')

  // shouldYield 判断是否用暂停当前任务的执行
  while ((needSync || !shouldYield()) && work.count > 0) {
    work.count--
    insertItem(`${work.priority}`, contentBoxRef as HTMLElement)
  }
  prevPriority = work.priority // 记录上一次的优先级（因为有可能是被中断的）

  if(!work.count || work.count <= 0) {
    // 表示完成任务，从任务列表中删除
    const curIndex = works.indexOf(work)
    works.splice(curIndex, 1)
    // 重置优先级
    prevPriority = IdlePriority
  }

  // 这一块的意思：可能发生中断，curCallback、cbNode可以理解为同一个东西（任务的标识），在 schedule 中会首先会判断有没有下一个任务，没有则 if 肯定是不会执行的；接着判断是否是同一个优先级，是执行if，否则不执行if（即优先级比原来高，会中断 cancelCallback 当前任务，执行优先级高的任务，后面 再重新创建该任务 scheduleCallback，因此中断的任务前后两次 id 不一样）。if的内容就是继续当前任务。
  // 为什么 schedule 没有任务时需要销毁任务（node）？因为那个任务（work）百分百执行完了，因此执行完才会出现没有任务（work），并且销毁的任务（node）指向的是刚才完成的 work；只有有多余一个任务（work），要么优先级一样，要么比它高，不会出现比它低，也是因为任务执行完才从 works中移除。

  const prevCallback = curCallback
  // 调度完后，如果callback变化，代表这是新的work
  schedule();
  const newCallback = curCallback;
  
  if(newCallback && prevCallback === newCallback) {
    return perform.bind(null, work)
  }
}

function init() {
  const rootRef = document.getElementById('root')
  Object.keys(priorityMap).forEach(priorityName => {
    const btnRef = createBtn(priorityName)

    btnRef.onclick = () => {
      works.push({
        priority: priorityMap[priorityName],
        count: 100
      })

      schedule()
    }
    rootRef?.appendChild(btnRef)
  })

  const conentBox = document.createElement('div')
  conentBox.setAttribute('id', 'content')
  document.body.appendChild(conentBox)
}

init()