import React, { useState } from 'react';
import Header from '../../components/header/Header';
import ExploreMenu from '../../components/exploremenu/ExploreMenu';
import FoodDisplay from '../../components/fooddisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState('All');
  return (
    <main className='container'>
        <Header />
        <ExploreMenu category = {category} setCategory = {setCategory}/>
        <FoodDisplay category = {category} searchText={''}/>
    </main>
  )
}

export default Home;