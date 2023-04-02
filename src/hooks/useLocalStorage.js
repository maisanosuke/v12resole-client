import React from 'react';

function getInitialState(key, initialState){
    const savedValue = JSON.parse(localStorage.getItem(key));
    if(savedValue){
        return savedValue;
    }
    if(initialState instanceof Function){
        return initialState();
    }
    return initialState;
}

function useLocalStorage(key, initialState) {
    const [state, setState] = React.useState(()=>getInitialState(key, initialState)); //make sure it is call back if not, it will run everytime. localstorage is expensive

    React.useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(state));
    }, [state])

  return [state, setState];
}

export default useLocalStorage


