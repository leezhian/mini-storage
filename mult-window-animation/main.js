import { init } from './src/core'

let initialized = false

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState != 'hidden' && !initialized) {
    initialized = true
    init()
  }
})

window.onload = () => {
  if (document.visibilityState != 'hidden') {
    initialized = true
    init()
  }
}
