export function insertItem(context: string, parent?: HTMLElement) {
  const spanRef = document.createElement('span')
  spanRef.innerText = context

  let contextBox = document.getElementById('root')
  if(parent) {
    contextBox = parent
  }
  doSomeWork(10000000)
  contextBox?.appendChild(spanRef)
}

export function createBtn(text: string) {
  const btnRef = document.createElement('button')
  btnRef.innerText = text

  return btnRef
}

export function doSomeWork(len: number) {
  let result = 0
  while(len --) {
    result = len * 2 / 10 - 0.5
  }
}