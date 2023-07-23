import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async()=>{
    let response = await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    // what we are recieving in response is an array whose first item is global.food_items and 2nd item is global.foot_categories
    setFoodItem(response[0]);
    setFoodCat(response[1]);
   
  }

  // []: This is the dependency array. It determines when the useEffect function is executed. If the dependency array is empty ([]), the useEffect function will only be executed once when the component is mounted, and it won't be executed again for any subsequent updates. This is because there are no dependencies, so there's nothing in the component that, when changed, would require the useEffect function to be re-executed.

  // To summarize, the useEffect hook in this code is used to call the loadData function once when the component is mounted. The empty dependency array ensures that the effect is not re-run for any updates
  useEffect(()=>{
    loadData()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value = {search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-success my-2 my-sm-0 text-white bg-teal-darken-4"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?ice-cream"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden"></span>
          </button>
        </div>
      </div>
      <div className="container">
        {
          // if foodCat has already fetched the data, then
          foodCat !==[] 
          ?
          foodCat.map((data)=>{
            return (
              <div className="row mb-3">

                <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
                </div>
                <hr/>
                {/* display all the data that belongs to that food item */}

                {
                  // if foodItem array is not empty, then
                  foodItem !== []
                  ?
                  // foodItem.filter returns an array with the elements which match the condition item.CategoryName === data.CategoryName
                  // using .map on this to render a card for every element in this array

                  foodItem.filter((item)=> (item.CategoryName === data.CategoryName) && 
                  (item.name.toLowerCase().includes(search.toLowerCase()))
                  ).map((filteredItem)=>{
                    return (
                      <div className='col-12 col-md-6 col-lg-3' key={filteredItem._id}>
                        <Card foodItem={filteredItem}
                        options={filteredItem.options[0]}
                        
                        />  
                      </div>
                    )
                  })
                  : <div> No such data found </div>
                }
              </div>
            )
          })
          : ""
        }
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
