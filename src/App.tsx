import React,{useState,useEffect} from 'react';
import { HomePage, Ibridge } from "./pages";
import { Result, Button } from 'antd';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import { AuthClient } from "@dfinity/auth-client";
export const LoginContext = React.createContext<any>(null);
function App() {
	const [isLogin, setIsLogin] = useState(false)
	const [icpBalance, setIcpBalance] = useState('');
	useEffect(() => {
		const initLoginState = async ()=>{
			const authClient = await AuthClient.create();
			if (await authClient.isAuthenticated()) {
				let icpBalance:string = String(localStorage.getItem('icpBalance')) || '';
				setIcpBalance(icpBalance)
				setIsLogin(true)
			}
		}
		initLoginState()
	}, [isLogin])
	return (
		<LoginContext.Provider value={{isLogin, setIsLogin ,icpBalance,setIcpBalance}}>
		<div className="App">
			<BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/ibridge" component={Ibridge} />
          <Route render={() => 
						<Result
							status="404"
							title="404"
							subTitle="Sorry, the page you visited does not exist."
							extra={<Button type="primary">Back Home</Button>}
						/>
					} />
        </Switch>
      </BrowserRouter>			
		</div>
		</LoginContext.Provider>
	);
}
export default App;