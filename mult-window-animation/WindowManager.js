/*
 * @Author: kim
 * @Date: 2023-11-27 17:49:12
 * @Description: 窗口管理
 */
const WINDOWS_KEY = 'windows'
const WINDOW_COUNT_KEY = 'count'

class WindowManager {
  _windows // 所有窗口数据
  _count
  _id
  _winData // 记录窗口数据（包含id，metaData，shape）
  _winShapeChangeCallback
  _winChangeCallback

  constructor() {
    this._bindListener()
  }

  /**
   * @description: 对比前后 windows 是否有修改，主要判断长度和id
   * @param {Array<winData>} oWindows
   * @param {Array<winData>} nWindows
   * @return {boolean}
   */
  _didWindowsChange(oWindows, nWindows) {
    if (oWindows.length != nWindows.length) return true

    let c = false
    oWindows.forEach((wd, index) => {
      if (wd.id != nWindows[index].id) {
        c = true
      }
    })

    return c
  }

  /**
   * @description: 监听 localstorage 修改
   * @param {*} event
   * @return {void}
   */
  _handleStorageChange(event) {
    if (event.key !== WINDOWS_KEY) return
    const newWindows = JSON.parse(event.newValue)
    const winChange = this._didWindowsChange(this._windows, newWindows)

    this._windows = newWindows

    if (winChange) {
      if (this._winChangeCallback) this._winChangeCallback()
    }
  }

  /**
   * @description: 监听浏览器关闭
   * @return {void}
   */
  _handleBeforeUnload() {
    window.removeEventListener('storage', this._handleStorageChange.bind(this))
    const index = this.getWindowIndexFromId(this._id)

    this._windows.splice(index, 1)
    this._updateWindowsLocalStorage()
  }

  _bindListener() {
    window.addEventListener('storage', this._handleStorageChange.bind(this))
    window.addEventListener('beforeunload', this._handleBeforeUnload.bind(this))
  }

  /**
   * @description: 更新localstorage windows 数据
   * @return {void}
   */
  _updateWindowsLocalStorage() {
    localStorage.setItem(WINDOWS_KEY, JSON.stringify(this._windows))
  }

  /**
   * @description: 设置 windows 变化时回调
   * @param {*} callback
   * @return {void}
   */
  setWinChangeCallback(callback) {
    this._winChangeCallback = callback
  }

  /**
   * @description: 设置 window 窗口位置、大小修改回调
   * @param {*} callback
   * @return {void}
   */
  setWinShapeChangeCallback(callback) {
    this._winShapeChangeCallback = callback
  }

  /**
   * @description: 返回所有窗口数据
   * @return {Array<winData>}
   */
  getWindows() {
    return this._windows
  }

  /**
   * @description: 返回当前窗口数据
   * @return {winData}
   */
  getWindowData() {
    return this._winData
  }

  /**
   * @description: 返回当前窗口id
   * @return {string}
   */
  getWindowId() {
    return this._id
  }

  /**
   * @description: 获取当前窗口最新数据
   * @return {winData}
   */
  getWindowShape() {
    return {
      x: window.screenLeft,
      y: window.screenTop,
      w: window.innerWidth,
      h: window.innerHeight,
    }
  }

  /**
   * @description: 根据id查找 window 的索引
   * @param {*} id
   * @return {number}
   */
  getWindowIndexFromId(id) {
    if (id === undefined || id === null) {
      console.error('id is required')
      return
    }

    return this._windows.findIndex((wd) => wd.id == id)
  }

  /**
   * @description: 初始化
   * @param {*} meta 元数据（任意）
   * @return {void}
   */
  init(meta) {
    this._windows = JSON.parse(localStorage.getItem(WINDOWS_KEY)) || []
    this._count = localStorage.getItem(WINDOW_COUNT_KEY) || 0
    this._count++

    this._id = this._count
    const shape = this.getWindowShape()
    this._winData = { id: this._id, shape: shape, metaData: meta }
    this._windows.push(this._winData)
    localStorage.setItem(WINDOW_COUNT_KEY, this._count)
    this._updateWindowsLocalStorage()
  }

  /**
   * @description: 更新 winData 数据（即获取最新的窗口数据）
   * @return {void}
   */
  update() {
    const winShape = this.getWindowShape()
    if (
      winShape.x != this._winData.shape.x ||
      winShape.y != this._winData.shape.y ||
      winShape.w != this._winData.shape.w ||
      winShape.h != this._winData.shape.h
    ) {
      this._winData.shape = winShape
      const targetIndex = this.getWindowIndexFromId(this._id)
      this._windows[targetIndex].shape = winShape

      if (this._winShapeChangeCallback) this._winShapeChangeCallback()

      this._updateWindowsLocalStorage()
    }
  }
}

export default WindowManager
