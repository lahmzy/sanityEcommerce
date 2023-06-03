import React,{useState} from "react";
import {AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar} from "react-icons/ai"
import { client, urlFor } from "../../lib/client";
import { Product } from "@/components";


import {useStateContext} from "../../context/stateContext"

const ProductDetails = ({ products, queriedProducts }) => {

    
    const {image,name,details,price} = products
    const [imagePosition,setImagePosition] = useState(0)
    const {incQty,decQty,qty,onAdd,setShowCart} = useStateContext()

    const handleBuyNow = () => {
      onAdd(products,qty);

      setShowCart(true)
    }

    

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={urlFor(image && image[imagePosition])} alt="other-product-type"/>
          </div>
          <div className="small-images-container">
            {image?.map((item,index)=>(
              <img
                key={index}
                src={urlFor(item)}
                className={index===imagePosition? "small-image selected-image" : "small-image"}
                onMouseEnter={() => setImagePosition(index)}
               />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span> 
            </p>
          </div>
          <div className="buttons" type="button">
            <button className="add-to-cart" onClick={()=>onAdd(products,qty)}>Add to Cart</button>
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {queriedProducts.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => (
    {
        params:{
            slug:product.slug.current
        }
    }
  ))

  return {
    paths,fallback:"blocking"
  }
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type=="product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  console.log(query)

  const products = await client.fetch(query);
  const queriedProducts = await client.fetch(productsQuery);

  return {
    props: { products, queriedProducts },
  };
};
 