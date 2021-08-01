import React from 'react';
import { HomePage, Ibridge } from "./pages";
import { Result, Button } from 'antd';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route path="/ibridge" component={Ibridge} />
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
	);
}
export default App;


