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
        <Route path='/item/:category' element={<CategoriesPage />} />
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

// import React from 'react';
// import {HashRouter, Route, Routes} from 'react-router-dom';
// import Header from './components/Header';
// import GenresPage from './pages/GenresPage';
// import HomePage from './pages/HomePage';
// import MovieDetailsPage from './pages/MovieDetailsPage';
// import PopularPage from './pages/PopularPage';
// import FavoritesPage from './pages/FavoritesPage';
// import UpcomingPage from './pages/UpcomingPage';
// import MovieMediaPage from './pages/MovieMediaPage';
// import NotFoundPage from './pages/NotFoundPage';
// import MovieCreditsPage from './pages/MovieCreditsPage';
// const App = () => {
//   return (
//     <HashRouter>
//       <Header />
//       <Routes>
//         <Route index path='/' element={<HomePage />} />
//         <Route path='/popular' element={<PopularPage />} />
//         <Route path='/upcoming' element={<UpcomingPage />} />
//         <Route path='/favorites' element={<FavoritesPage />} />
//         <Route path='/movie/:id' element={<MovieDetailsPage />} />
//         <Route path='/movie/:id/media' element={<MovieMediaPage />} />
//         <Route path='/movie/:id/cast' element={<MovieCreditsPage />} />
//         <Route path='/movies/:id' element={<GenresPage />} />
//         <Route path='*' element={<NotFoundPage />} />
//       </Routes>
//     </HashRouter>
//   );
// };

// export default App;
