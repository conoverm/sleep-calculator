import './App.css';
import React, { useEffect, useState } from 'react';
import SelectWithIncrements from './components/SelectWithIncrements';
import CalculateButton from './components/CalculateButton';
import TextOutput from './components/TextOutput';

function App() {
  const [inBed, setInBed] = useState(0);
  const [asleep, setAsleep] = useState(0);
  const [isCalculateDisabled, setIsCalculateDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState();

  useEffect(() => {
    if (inBed > 0) return setIsCalculateDisabled(false);

    return setIsCalculateDisabled(true);
  }, [inBed, asleep])
  
  useEffect(() => {
    if (isLoading === false) return setIsLoading(false);
    
    return setIsLoading(true)
  }, [isLoading])

  useEffect(() => {
    if (isLoading === false) return setIsLoading(false);
    
    return setIsLoading(true)
  }, [isLoading])

  return (
    <div className="App">
      <div className="row">
        <SelectWithIncrements
          label="Duration in Bed"
          onChange={(event) => setInBed(event.target.value)}
          val={inBed}
        />
        <SelectWithIncrements
          label="Duration Asleep"
          onChange={(event) => setAsleep(event.target.value)}
          val={asleep}
        />
      </div>
      <div className="row">
        <CalculateButton 
          scores={{ inBed, asleep }}
          loading={isLoading}
          disabled={isCalculateDisabled} 
          setLoading={(toLoading = false) => setIsLoading(toLoading)}
          setScore={(score) => setScore(score)}
        />
      </div>
      <div className="row">
        <TextOutput 
          isLoading={isLoading}
          output={score}
        />
      </div>
    </div>
  );
}

export default App;
