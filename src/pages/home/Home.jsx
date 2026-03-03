import React, { useState } from 'react';
import Header from '../../components/header/Header';
import ExploreMenu from '../../components/exploremenu/ExploreMenu';
import FoodDisplay from '../../components/fooddisplay/FoodDisplay';
import { StoreContext } from '../../context/StoreContext';
import Loader from '../../Loader/Loader';
import { useContext } from 'react';

const Home = () => {
  const [category, setCategory] = useState('All');
  const { foodList } = useContext(StoreContext);
  return (
    foodList.Length === 0 ?
    <Loader /> :
    <main className='container'>
        <Header />
        <ExploreMenu category = {category} setCategory = {setCategory}/>
        <FoodDisplay category = {category} searchText={''}/>
    </main>
  )
}

export default Home;