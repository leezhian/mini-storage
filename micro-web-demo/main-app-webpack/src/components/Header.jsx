import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return <div>
    <Link to='/'>Home</Link>
    <Link to='/app1'>app1-react</Link>
    <Link to='/app2'>app2-vue</Link>
  </div>
}

export default Header