import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import "./index.css";
import { store } from './pages/store/index';
import PageRoutes from './routes/Routes';
import Header from './Layout/Header';

function App() {
  return (
    <div >
    <Provider store={store}>
      <Router>  
      <Header />  
        <PageRoutes />      
      </Router>   
    </Provider>
    </div>
  );
}

export default App;
