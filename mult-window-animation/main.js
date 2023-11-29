import * as THREE from './three.module.min.js'
import WindowManager from './WindowManager.js'

let initialized = false
const deviceInfo = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio ? window.devicePixelRatio : 1,
}
let camera, scene, world, renderer
let windowManager
let spheres = [] // 球体
let sceneOffsetTarget = { x: 0, y: 0 }
let sceneOffset = { x: 0, y: 0 }

/**
 * @description: 返回过去当天0点多少秒
 * @return {number}
 */
const getElapsedTime = (function () {
  const today = new Date().setHours(0, 0, 0, 0)

  return () => {
    return (new Date().getTime() - today) / 1000
  }
})()

/**
 * @description: 处理窗口大小修改
 * @return {void}
 */
function resizer() {
  deviceInfo.width = window.innerWidth
  deviceInfo.height = window.innerHeight
  deviceInfo.pixelRatio = window.devicePixelRatio
    ? window.devicePixelRatio
    : deviceInfo.pixelRatio

  camera = new THREE.OrthographicCamera(
    0,
    deviceInfo.width,
    0,
    deviceInfo.height,
    -10000,
    10000,
  )
  camera.updateProjectionMatrix()
  renderer.setSize(deviceInfo.width, deviceInfo.height)
}

/**
 * @description: 初始化场景
 * @return {void}
 */
function setupScene() {
  // 设置正交相机
  camera = new THREE.OrthographicCamera(
    0,
    deviceInfo.window,
    0,
    deviceInfo.height,
    -10000,
    10000,
  )

  camera.position.z = 2.5
  camera.updateProjectionMatrix()

  // 初始化场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0.0)
  scene.add(camera)

  // 初始化画布
  renderer = new THREE.WebGLRenderer({ antialias: true, depthBuffer: true })
  renderer.setSize(deviceInfo.width, deviceInfo.height)
  renderer.setPixelRatio(deviceInfo.pixelRatio)

  world = new THREE.Object3D()
  scene.add(world)

  renderer.domElement.setAttribute('id', 'scene')
  document.body.appendChild(renderer.domElement)
}

function setupWindowManager() {
  windowManager = new WindowManager()
  windowManager.setWinShapeChangeCallback(updateWindowShape)
  windowManager.setWinChangeCallback(windowsUpdated)
  windowManager.init()

  windowsUpdated()
}

/**
 * @description: 更新窗口数据
 * @return {void}
 */
function updateWindowShape(easing = true) {
  // 获取浏览器到桌面左边界和上边界距离
  sceneOffsetTarget = { x: -window.screenX, y: -window.screenY }
  if (!easing) sceneOffset = sceneOffsetTarget
}

function windowsUpdated() {
  updateNumberOfSpheres()
}

/**
 * @description: 更新球体
 * @return {void}
 */
function updateNumberOfSpheres() {
  const windows = windowManager.getWindows()

  spheres.forEach((s) => {
    world.remove(s)
  })
  spheres = [] // 重置

  windows.forEach((w, i) => {
    const c = new THREE.Color()
    c.setHSL(0.1 * i, 1.0, 0.5)

    const r = 100 + i * 20
    const geometry = new THREE.SphereGeometry(r, 16, 8)
    const material = new THREE.PointsMaterial({
      color: c,
    })
    const sphere = new THREE.Points(geometry, material)

    sphere.position.set(
      w.shape.x + w.shape.w * 0.5,
      w.shape.y + w.shape.h * 0.5,
      0,
    )
    world.add(sphere)
    spheres.push(sphere)
  })
}

function render() {
  const elapsedTime = getElapsedTime()
  windowManager.update()

  const falloff = 0.05
  sceneOffset.x =
    sceneOffset.x + (sceneOffsetTarget.x - sceneOffset.x) * falloff
  sceneOffset.y =
    sceneOffset.y + (sceneOffsetTarget.y - sceneOffset.y) * falloff

  world.position.x = sceneOffset.x
  world.position.y = sceneOffset.y

  const windows = windowManager.getWindows()
  spheres.forEach((sphere, index) => {
    const winData = windows[index]
    const posTarget = {
      x: winData.shape.x + winData.shape.w * 0.5,
      y: winData.shape.y + winData.shape.h * 0.5,
    }

    sphere.position.x =
      sphere.position.x + (posTarget.x - sphere.position.x) * falloff
    sphere.position.y =
      sphere.position.y + (posTarget.y - sphere.position.y) * falloff
    sphere.rotation.y = elapsedTime * 0.2
    sphere.rotation.x = elapsedTime * 0.1
  })

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

function init() {
  initialized = true
  window.addEventListener('resize', resizer)
  setupScene()
  setupWindowManager()
  updateWindowShape(false)
  render()
  resizer()
}

init()
