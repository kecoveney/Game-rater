import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const NavbarView = ({ user }) => {
  return (
    <>
      <NavBar user={user} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default NavbarView;
