/*
 * @Author: kim
 * @Date: 2022-05-31 23:45:56
 * @Description: 路由
 */
import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"

import Header from '../components/Header'
import Home from "../view/Home"
import ChildApp from "../view/ChildApp"

const routes = (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app1" element={<ChildApp />} />
      <Route path="/app2" element={<ChildApp />} />
    </Routes>
  </BrowserRouter>
)

export default routes
