import { Provider } from 'react-redux';
import './App.css';
import Add from './view/employe/add';
import Edit from './view/employe/edit';
import List from './view/employe/list';
import { BrowserRouter ,Routes, Route, Link } from "react-router-dom";
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import View from './view/employe/view';
function App() {
  return (
    <>
    <Provider store={store}>
       <BrowserRouter>
    

      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/employe/create" element={<Add />} />
        <Route path="/employe/edit/:id" element={<Edit />} />
        <Route path="/employe/view/:id" element={<View />} />


      </Routes>
      <ToastContainer />

    </BrowserRouter>
    </Provider>
     
     </>
  );
}

export default App;
