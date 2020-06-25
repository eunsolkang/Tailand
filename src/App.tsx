import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserPage from './pages/UserPage';
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import SubCategoryPage from './pages/SubCategoryPage';
import AdvertPage from './pages/AdvertPage';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact component={UserPage} path='/'></Route>
        <Route exact component={UserPage} path='/user'></Route>
        <Route exact component={PostListPage} path='/post'></Route>
        <Route exact component={PostPage} path='/post/view/'></Route>
        <Route exact component={PostPage} path='/post/view/:id'></Route>
        <Route exact component={CategoryPage} path='/category'></Route>
        <Route exact component={SubCategoryPage} path='/category/:id'></Route>
        <Route exact component={AdvertPage} path='/advert'></Route>
      </Switch>
    </div>
  );
}

export default App;
