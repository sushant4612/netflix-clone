import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

function TitleCard({title, category}) {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGU4MzlkOTM1MjM2MmJmZTM5YjM4OTg0OTQ5MWJkZCIsIm5iZiI6MTczMDgwNTY0Ny4zNjc4MzI0LCJzdWIiOiI2NzI5ZmU3ZTQzM2M4MmVhMjY3ZTYwYzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1dlV63aILk0G88S2_0OXM9KhKJ5Kzub4gYKYIv4TjUk'
    }
  };
  
  

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:now_playing}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel);
  },[]) 

  return (
    <div className='title-cards'>
      <h2>{ title? title : "Popular on Netflix" }</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map( (card, index) => {
          return <Link to={`/player/${card.id}`} className='card' key = {index}>
            <img src={"https://image.tmdb.org/t/p/w500" + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard