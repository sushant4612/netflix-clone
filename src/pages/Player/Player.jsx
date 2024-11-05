import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams } from 'react-router-dom';

function Player() {
  const {id} = useParams();
  const [apiData, setApiData] = useState({
    name : "",
    key : "",
    published_at : "",
    type : ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGU4MzlkOTM1MjM2MmJmZTM5YjM4OTg0OTQ5MWJkZCIsIm5iZiI6MTczMDgwNTY0Ny4zNjc4MzI0LCJzdWIiOiI2NzI5ZmU3ZTQzM2M4MmVhMjY3ZTYwYzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1dlV63aILk0G88S2_0OXM9KhKJ5Kzub4gYKYIv4TjUk'
    }
  };
  
  useEffect(() =>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player