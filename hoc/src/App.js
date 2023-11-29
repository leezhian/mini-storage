import CommentListContainer from "./CommentListContainer"
import "./App.css"

function App() {
  return (
    <div className="App">
      <CommentListContainer promise={fetch(`${process.env.PUBLIC_URL}response.json`)} />
    </div>
  )
}

export default App
