/*
 * @Author: kim
 * @Date: 2022-05-31 23:45:56
 * @Description: 路由
 */
import React from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"

import Home from "../view/Home"

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
)

export default routes
