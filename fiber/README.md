# react-Fiber 调度原理

1. 工作区发生变化时，会执行 schedule，筛选出最高优先度的 work。
2. 如果没有 work 或者 筛选出的最高优先度 work 与上一次执行 perform 的 work 优先级相同，则返回。
3. 在开始调度前，如果有正在进行中的 perform，则中断它。优先调度更高优先级的 work。
4. 调度 perform。
5. 执行 perform。
6. 如果 work 执行完则 从 工作区删除该work。
7. 如果 work 发生中断，则判断前后 perform 是否有变化，有则调度新的 perform，否则继续执行之前 work 对应的 perform。

**图解**：
![](./public/demo.png)
