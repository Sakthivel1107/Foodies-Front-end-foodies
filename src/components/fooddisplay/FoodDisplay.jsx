import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../fooditem/FoodItem';

const FoodDisplay = ({category,searchText}) => {
  const {foodList} = useContext(StoreContext);
  const filteredFoods = foodList.filter(food => (
    (category === 'All' || food.category === category) && food.name.toLowerCase().includes(searchText.toLowerCase())
  ));
  return (
    <div className="container">
      <div className="row">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((item,index) => (
            <FoodItem key={index} id={item.id} name={item.name} description={item.description} category={item.category} price={item.price} imgUrl={item.imageUrl}/>
          ))
        ):(
          <div className="text-center mt-4">
            <h4>No food found.</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay;