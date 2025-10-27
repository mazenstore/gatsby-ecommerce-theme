import React from "react";
import { Helmet } from "react-helmet";
import Container from "../../components/Container";
import Brand from "../../components/Brand";
import Footer from "../../components/Footer";
import OrderSummary from "../../components/OrderSummary";
import * as styles from "./sample.module.css";

const isBrowser = typeof window !== "undefined";

const SamplePage = () => {
  const sampleProduct = {
    image: "/products/pdp1.jpeg",
    name: "Lambswool Crew Neck Jumper",
    price: 220,
    color: "Anthracite Melange",
    size: "XS",
  };

  return (
    <Container>
      <Helmet>
        <title>{sampleProduct.name}</title>
        <meta name="description" content="Sample Product Page" />
      </Helmet>

      <Brand />

      <div className={styles.product}>
        <img
          src={sampleProduct.image}
          alt={sampleProduct.name}
          className={styles.image}
        />
        <div className={styles.details}>
          <h2>{sampleProduct.name}</h2>
          <p>Color: {sampleProduct.color}</p>
          <p>Size: {sampleProduct.size}</p>
          <p>Price: ${sampleProduct.price}</p>
        </div>
      </div>

      {isBrowser && <OrderSummary />}

      <Footer />
    </Container>
  );
};

export default SamplePage;
