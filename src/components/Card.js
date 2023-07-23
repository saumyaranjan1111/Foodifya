import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {

  let data = useCart();
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);


  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const handleAddToCart = async()=>{
    let food = [];
    for (const item of data) {
      if(item.id === props.foodItem.__id) {
        food = item;

        break;
      }
    }

    if (food.length) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem.__id, price: finalPrice, qty: qty });
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
      }
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    }
  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxWidth: "360px" }}>
        <img
          className="card-img-top"
          src={props.foodItem.img}
          alt="Card image cap"
          style={{height:'200px', objectFit:"fill"}}
        />

        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodItem.description}</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-teal-darken-4 rounded" onChange={(e)=> setQty(e.target.value)}>
              {/* the below code returns 6 option html(jsx) elements */}
              {Array.from(Array(6), (element, index) => {
                return (
                  <option key={index + 1} value={index + 1}>
                    {" "}
                    {index + 1}{" "}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100 bg-teal-darken-4 rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option key={data} value={data}>{data}</option>
              })}
            </select>

            <div className="d-inline h-100 fs-5">Rs. {finalPrice}/-</div>
          </div>
          <hr/>
          <button className={"btn bg-teal-darken-4 justify-center ms-2"} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
