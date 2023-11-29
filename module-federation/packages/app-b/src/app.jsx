import React from 'react'
const Example1 = React.lazy(() => import('app_a/Example'))

const App = () => {
  return (
    <div>
      <p>hellp application B</p>
      <Example1 />
    </div>
  )
}

export default App