
import './App.css';
import Form from './FormComponent/Form';
import { Provider } from 'react-redux';
import store from './redux/formStore';

function App() {
  return (
    <div className="App">
     { <Provider store = {store}>
        
        <Form />
  
        </Provider> 
        }
    </div>
  );
}

export default App;
