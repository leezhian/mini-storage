import React from 'react'

const Example1 = React.lazy(() => import('app_b/Example'))
const Example2 = React.lazy(() => import('app_b/Example2'))

const App = () => {
  return (
    <div>
      <p>this is application</p>
      <Example1 />
      <Example2 />
    </div>
  )
}

export default App