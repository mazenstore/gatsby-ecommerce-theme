import React, { useState, useEffect, createRef } from 'react';
import { Link, navigate } from 'gatsby';

import { isAuth } from '../../helpers/general';

import AddNotification from '../AddNotification';
import Brand from '../Brand';
import Container from '../Container';
import Config from '../../config.json';
import Drawer from '../Drawer';
import ExpandedMenu from '../ExpandedMenu';
import FormInputField from '../FormInputField/FormInputField';
import Icon from '../Icons/Icon';
import MiniCart from '../MiniCart';
import MobileNavigation from '../MobileNavigation';
import * as styles from './Header.module.css';

const Header = () => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const [menu, setMenu] = useState();
  const [activeMenu, setActiveMenu] = useState();

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const searchRef = createRef();
  const bannerMessage = 'Free shipping worldwide';
  const searchSuggestions = [
    'Oversize sweaters',
    'Lama Pajamas',
    'Candles Cinnamon',
  ];

  const handleHover = (navObject) => {
    if (navObject.category) {
      setShowMenu(true);
      setMenu(navObject.category);
      setShowSearch(false);
    } else {
      setMenu(undefined);
    }
    setActiveMenu(navObject.menuLabel);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    setShowSearch(false);
  };

  // disable active menu when show menu is hidden
  useEffect(() => {
    if (showMenu === false) setActiveMenu(false);
  }, [showMenu]);

  // ✅ fix SSR crash by checking window existence
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      setShowMenu(false);
      setShowSearch(false);
      setActiveMenu(undefined);
    };

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // listen for show search and delay trigger of focus
  useEffect(() => {
    if (showSearch === true && typeof window !== 'undefined') {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 250);
    }
  }, [showSearch]);

  return (
    <div className={styles.root}>
      <div className={styles.headerMessageContainer}>
        <span>{bannerMessage}</span>
      </div>
      <Container size="large" spacing="min">
        {/* header container */}
        <div className={styles.header}>
          <div className={styles.linkContainer}>
            <nav
              role="presentation"
              onMouseLeave={() => {
                setShowMenu(false);
              }}
            >
              {Config.headerLinks.map((navObject) => (
                <Link
                  key={navObject.menuLink}
                  onMouseEnter={() => handleHover(navObject)}
                  className={`${styles.navLink} ${
                    activeMenu === navObject.menuLabel ? styles.activeLink : ''
                  }`}
                  to={navObject.menuLink}
                >
                  {navObject.menuLabel}
                </Link>
              ))}
            </nav>
          </div>

          {/* mobile menu icon */}
          <div
            role="presentation"
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
            className={styles.burgerIcon}
          >
            <Icon symbol={mobileMenu ? 'cross' : 'burger'} />
          </div>

          <Brand />

          <div className={styles.actionContainers}>
            <button
              aria-label="Search"
              className={`${styles.iconButton} ${styles.iconContainer}`}
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <Icon symbol="search" />
            </button>

            <Link
              aria-label="Favorites"
              to="/account/favorites"
              className={`${styles.iconContainer} ${styles.hideOnMobile}`}
            >
              <Icon symbol="heart" />
            </Link>

            {/* ✅ wrapped in window check to prevent SSR error */}
            {typeof window !== 'undefined' && (
              <Link
                aria-label="Orders"
                to={isAuth() ? '/account/orders/' : '/login'}
                className={`${styles.iconContainer} ${styles.hideOnMobile}`}
              >
                <Icon symbol="user" />
              </Link>
            )}

            <button
              aria-label="Cart"
              className={`${styles.iconButton} ${styles.iconContainer} ${styles.bagIconContainer}`}
              onClick={() => {
                setShowMiniCart(true);
                setMobileMenu(false);
              }}
            >
              <Icon symbol="bag" />
              <div className={styles.bagNotification}>
                <span>1</span>
              </div>
            </button>

            <div className={styles.notificationContainer}>
              <AddNotification openCart={() => setShowMiniCart(true)} />
            </div>
          </div>
        </div>

        {/* search container */}
        <div
          className={`${styles.searchContainer} ${
            showSearch ? styles.show : styles.hide
          }`}
        >
          <h4>What are you looking for?</h4>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <FormInputField
              ref={searchRef}
              icon="arrow"
              id="searchInput"
              value={search}
              placeholder=""
              type="text"
              handleChange={(_, e) => setSearch(e)}
            />
          </form>
          <div className={styles.suggestionContianer}>
            {searchSuggestions.map((suggestion, index) => (
              <p
                role="presentation"
                onClick={() => {
                  setShowSearch(false);
                  navigate(`/search?q=${suggestion}`);
                }}
                key={index}
                className={styles.suggestion}
              >
                {suggestion}
              </p>
            ))}
          </div>
          <div
            role="presentation"
            onClick={(e) => {
              e.stopPropagation();
              setShowSearch(false);
            }}
            className={styles.backdrop}
          ></div>
        </div>
      </Container>

      {/* menu container */}
      <div
        role="presentation"
        onMouseLeave={() => setShowMenu(false)}
        onMouseEnter={() => setShowMenu(true)}
        className={`${styles.menuContainer} ${showMenu ? styles.show : ''}`}
      >
        <Container size="large" spacing="min">
          <ExpandedMenu menu={menu} />
        </Container>
      </div>

      {/* minicart container */}
      <Drawer visible={showMiniCart} close={() => setShowMiniCart(false)}>
        <MiniCart />
      </Drawer>

      {/* mobile menu */}
      <div className={styles.mobileMenuContainer}>
        <Drawer
          hideCross
          top="98px"
          isReverse
          visible={mobileMenu}
          close={() => setMobileMenu(false)}
        >
          <MobileNavigation close={() => setMobileMenu(false)} />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
