import React, { Component } from "react"
import Promised from "./Promised"
import CommentList from "./CommentList"

class CommentListContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <CommentList comments={this.props.commentList}></CommentList>
  }
}

export default Promised("comments", CommentListContainer)
