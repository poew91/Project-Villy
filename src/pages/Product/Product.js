import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ProductCard from './ProductCard/ProductCard';
import ProductModal from './ProductModal/ProductModal';
import './Product.scss';

export class Product extends Component {
  constructor() {
    super();
    this.state = {
      productCard: [],
      addCart: false,
      isModalOn: false,
    };
  }

  componentDidMount() {
    fetch('/data/ProductData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          productCard: data,
        });
      });
  }

  handleCartButton = event => {
    event.preventDefault();

    this.setState({
      addCart: !this.state.addCart,
    });
  };

  // isModalOn: !this.state.isModalOn,

  render() {
    return (
      <div className="Product">
        <header className="productHeader">
          <h1>
            건강한 삶을 위한
            <br />
            빌리의 연구와 도전은 계속됩니다.
          </h1>
        </header>
        <section className="productBody">
          <h2 className="sr-only">Product Body</h2>

          <ul className="productCategory">
            <li className="categoryList">
              <Link className="goCategories">
                <img src="images/hairstyle.svg" alt="모발" />
                <span className="categoryText">모발</span>
              </Link>
            </li>
            <li className="categoryList">
              <Link className="goCategories">
                <img src="images/bone.svg" alt="뼈" />
                <span className="categoryText">뼈</span>
              </Link>
            </li>
            <li className="categoryList">
              <Link className="goCategories">
                <img src="images/therapy.svg" alt="피부" />
                <span className="categoryText">피부</span>
              </Link>
            </li>
            <li className="categoryList">
              <Link className="goCategories">
                <img src="images/height.svg" alt="성장" />
                <span className="categoryText">성장</span>
              </Link>
            </li>
          </ul>

          <ul className="productList">
            {this.state.productCard.map((product, idx) => (
              <ProductCard
                key={product.id}
                productCard={product}
                backgruonColor={
                  BACKGROUNDCOLOR_LIST[idx % BACKGROUNDCOLOR_LIST.length]
                }
                handleCartButton={this.handleCartButton}
                addCart={this.state.addCart}
              />
            ))}
          </ul>
          <ul className="ProductModal">
            {this.state.isModalOn &&
              this.state.productCard.map(modal => (
                <ProductModal key={modal.id} name={modal.name} />
              ))}
          </ul>
        </section>
      </div>
    );
  }
}

const BACKGROUNDCOLOR_LIST = [
  '#E9F9FE',
  '#E0B5BA',
  '#EFE9D9',
  '#B1D9F1',
  '#EAE9E9',
  '#AEE19E',
  '#FFF0A6',
  '#CBC5E8',
  '#FAD4BF',
];

export default Product;
