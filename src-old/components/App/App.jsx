import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import MyPetsPage from '../MyPets/MyPetsPage/MyPetsPage';
import PetDetailPage from '../MyPets/PetDetailPage/PetDetailPage';
import AddPet from '../MyPets/AddPet/AddPet';

import SearchPage from '../SearchPage/SearchPage';
import ComparisonTool from '../ComparisonTool/ComparisonTool';

import AdminPortal from '../Admin/AdminPortal/AdminPortal';
import AdminFoods from '../Admin/AdminFoods/AdminFoods';
import AdminAllergies from '../Admin/AdminAllergies/AdminAllergies';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userInfo);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#283e25',
      },
      secondary: {
        main: '#e6e6e6',
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            <Route exact path="/home">
              <LandingPage />
            </Route>

            <ProtectedRoute exact path="/login" authRedirect="/home">
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/registration" authRedirect="/home">
              <RegisterPage />
            </ProtectedRoute>

            {/*** PAGES ***/}
            <ProtectedRoute exact path="/pets">
              <MyPetsPage />
            </ProtectedRoute>

            <Route path="/pets/:id" exact>
              <PetDetailPage />
            </Route>

            <ProtectedRoute exact path="/addapet">
              <AddPet />
            </ProtectedRoute>

            <ProtectedRoute path="/search" exact>
              <SearchPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/compare">
              <ComparisonTool />
            </ProtectedRoute>

            {/*** ADMIN ONLY ***/}
            {user.authLevel === 'ADMIN' && (
              <>
                <ProtectedRoute exact path="/admin">
                  <AdminPortal />
                </ProtectedRoute>

                <ProtectedRoute exact path="/admin/food">
                  <AdminFoods />
                </ProtectedRoute>

                <ProtectedRoute exact path="/admin/allergy">
                  <AdminAllergies />
                </ProtectedRoute>
              </>
            )}

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
              <p>Page not found.</p>
            </Route>
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
