import {HashRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import UpdateJewelry from './pages/UpdateJewelry';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import ItemsPage from './pages/ItemsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateJewelry from './pages/CreateJewelry';
import CategoriesPage from './pages/CategoriesPage.';
const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='*' element={<h1>Not avaiable page</h1>} />
        <Route index path='/' element={<HomePage />} />
        <Route path='/item/:id' element={<ItemPage />} />
        <Route path='/categories/:category' element={<CategoriesPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/items' element={<ItemsPage />} />
        <Route path='/items/new' element={<CreateJewelry />} />
        <Route path='/items/update/:id' element={<UpdateJewelry />} />
      </Routes>
    </HashRouter>
  );
};
export default App;
