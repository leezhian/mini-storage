import React, { useState } from 'react'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { Link } from 'umi'
import routes from '../../config/routes'

interface Props {
  children?: React.ReactNode
}

const Layout = (props: Props) => {
  const { children } = props

  return <ProLayout
    style={{ height: '100vh' }}
    route={{
      routes: routes
    }}
    menuItemRender={(item) => {
      return <Link
        to={item.path}
      >
        {item.name}
      </Link>
    }}
  >
    <PageContainer>
      {children}
    </PageContainer>
  </ProLayout>
}

export default Layout