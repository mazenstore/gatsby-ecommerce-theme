import React from 'react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Brand from '../components/Brand';

const CartPage = () => {
  return (
    <Container>
      <Brand />
      <div style={{ padding: '50px 0', textAlign: 'center' }}>
        <h2>🛒 سلة المشتريات</h2>
        <p>لم يتم تفعيل صفحة السلة بعد.</p>
      </div>
      <Footer />
    </Container>
  );
};

export default CartPage;
