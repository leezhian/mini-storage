import React, { Component } from "react"

function disson(obj, prop) {
  let result = {}

  for (const p in obj) {
    if (p !== prop) {
      result[p] = obj[p]
    }
  }

  return result
}

const Promised = (promiseProp, Wrapped) =>
  class extends Component {
    constructor(props) {
      super(props)

      this.state = {
        loading: true,
        error: null,
        value: null,
      }
    }

    componentDidMount() {
      this.props.promise
        .then((response) => response.json())
        .then((value) => this.setState({ loading: false, value }))
        .catch((error) => this.setState({ loading: false, error }))
    }

    render() {
      if (this.state.loading) {
        return <span>Loading...</span>
      } else if (this.state.error !== null) {
        return <span>Error: {this.state.error.message}</span>
      } else {
        const propsWithoutThePromise = disson(this.props, promiseProp)
        return <Wrapped {...propsWithoutThePromise} {...this.state.value} />
      }
    }
  }

  export default Promised