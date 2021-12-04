import React from 'react'
import { Result, Button } from 'antd'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { HomePage, Ibridge } from './pages'
import { Header, Footer } from './components'
import { ProvideConnectContext } from './utils/authWallet/AuthWallet'
import { ProvideDepositDataContext } from './pages/iBridge/depositData'
function App() {
  return (
    <ProvideConnectContext>
      <ProvideDepositDataContext>
        <div className="App">
          <Header />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Ibridge} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/ibridge" component={Ibridge} />
              {/* 
              <Route
                render={() => {
                  return (
                    <Result
                      status="404"
                      title="404"
                      subTitle="Sorry, the page you visited does not exist."
                      extra={<Button type="primary">Back Home</Button>}
                    />
                  )
                }}
              />
			*/}
            </Switch>
          </BrowserRouter>
          <Footer />
        </div>
      </ProvideDepositDataContext>
    </ProvideConnectContext>
  )
}
export default App
