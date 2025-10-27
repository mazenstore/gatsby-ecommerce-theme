import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import * as styles from './favorites.module.css';

import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import Layout from '../../components/Layout/Layout';
import Modal from '../../components/Modal';

import { isAuth } from '../../helpers/general';

const FavoritesPage = () => {
  const [showDelete, setShowDelete] = useState(false);

  // ✅ move this into useEffect to avoid SSR crash
  useEffect(() => {
    if (typeof window !== 'undefined' && !isAuth()) {
      navigate('/login');
    }
  }, []);

  const sampleFavorites = [
    { color: 'Anthracite Melange', size: 'XS', img: '/products/shirt1.jpg', alt: 'favorite 1' },
    { color: 'Purple Pale', size: 'XS', img: '/products/shirt2.jpg', alt: 'favorite 2' },
    { color: 'Moss Green', size: 'S', img: '/products/shirt3.jpg', alt: 'favorite 3' },
    { color: 'Purple Pale', size: 'XS', img: '/products/shirt2.jpg', alt: 'favorite 4' },
  ];

  return (
    <Layout>
      <div className={styles.root}>
        <Container size="large">
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { link: '/account/favorites', label: 'Favorites' },
            ]}
          />
          <h1>Favorites</h1>
          <div className={styles.favoriteListContainer}>
            {sampleFavorites.map((fav, i) => (
              <FavoriteCard
                key={i}
                showConfirmDialog={() => setShowDelete(true)}
                {...fav}
              />
            ))}
          </div>
        </Container>
      </div>

      <Modal visible={showDelete} close={() => setShowDelete(false)}>
        <div className={styles.confirmDeleteContainer}>
          <h4>Remove from Favorites?</h4>
          <p>
            Are you sure you want to remove this from your favorites? You cannot
            undo this action once you press <strong>'Delete'</strong>
          </p>
          <div className={styles.actionContainer}>
            <Button onClick={() => setShowDelete(false)} level="primary">
              Delete
            </Button>
            <Button onClick={() => setShowDelete(false)} level="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default FavoritesPage;
