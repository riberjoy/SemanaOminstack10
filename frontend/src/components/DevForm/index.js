import React, { useState, useEffect } from 'react';

import './styles.css'

function DevForm( { onSubmit }){

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [gitHubUserName, setGitHubUserName] = useState('');
    const [techs, setTechs] = useState('');

    
  
    useEffect( () => {
      navigator.geolocation.getCurrentPosition(
        (position) =>{
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        }, 
        (err) => {
          console.log(err);
        }, {
          timeout: 30000,
        }
      );
    }, []);

    async function handleSubmit(e){
        e.preventDefault();

        await onSubmit({
            latitude,
            longitude,
            gitHubUserName,
            techs,
        });
        
        setGitHubUserName('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="gitHub_userName">Usuario do Github</label>
            <input 
              name="gitHub_userName" 
              id="gitHub_userName" 
              value={gitHubUserName}
              onChange = { e=> setGitHubUserName(e.target.value)}
              required 
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              value={techs}
              onChange = { e=> setTechs(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                value={latitude}
                onChange = { e=> setLatitude(e.target.value)}
                required 
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number"
                name="longitude" 
                id="longitude" 
                value={longitude} 
                onChange = { e=> setLongitude(e.target.value)} 
                required />
            </div>
          </div> 
          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;