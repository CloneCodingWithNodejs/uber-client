/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/button-has-type */
import React from 'react';
import Helmet from 'react-helmet';
import Sidebar from 'react-sidebar';
import styled from '../../typed-components';
import Menu from '../../Route/Menu/index';

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isLoading: boolean;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  isLoading
}) => (
  <Container>
    <Helmet>
      <title>Home | uber</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          width: '40%',
          zIndex: 10,
          backgroundColor: 'white'
        }
      }}
    >
      {!isLoading && <button onClick={toggleMenu}>Open sidebar</button>}
    </Sidebar>
  </Container>
);

export default HomePresenter;
