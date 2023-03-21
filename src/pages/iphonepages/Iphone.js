import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Iphone() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:2002/iphones")
      .then((res) => res.json())
      .then((products) => {
        setProducts(() => products.products);
      });
  }, []);
  console.log(products);
  let order = 1;
  return (
    <section className="internal-page-wrapper top-100">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <div className="title-wraper bold">Iphones</div>
            <div className="brief-description">The best for the brightest.</div>
          </div>
        </div>
        {products.map((product, i) => {
          let id = product.product_url;
          let productPage = "/iphone/" + id;

          let order1 = 1;
          let order2 = 2;
          if (order !== 1) {
            order1 = 2;
            order2 = 1;
            order--;
          } else {
            order++;
          }

          return (
            <div
              key={i}
              className="row justify-content-center text-center product-holder h-100 top-100 bottom-100"
            >
              <div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
                <div className="product-title">{product.product_name}</div>
                <div className="product-brief">
                  {product.product_breif_description}
                </div>
                <div className="starting-price">
                  {`Starting at ${product.starting_price}`}
                </div>
                <div className="monthly-price">{product.price_range}</div>
                <div className="links-wrapper">
                  <ul>
                    <li>
                      <Link to={productPage}>Learn more</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`col-sm-12 col-md-6 order-${order2}`}>
                <div className="product-image">
                  <img src={product.product_img} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default Iphone;
