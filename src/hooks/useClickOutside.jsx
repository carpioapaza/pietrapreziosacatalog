import {useRef, useEffect} from 'react';

// Custom hook que permite cerrar un elemento haciendo click fuera de él
const useClickOutside = (callback) => {
  const elementRef = useRef(null);

  useEffect(() => {
    // Agrega el controlador del evento al elemento padre del modal
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remueve el controlador del evento al elemento padre del modal
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Controlador del evento que se ejecuta cuando se hace click fuera del elemento
  const handleClickOutside = (event) => {
    if (
      event.target === elementRef.current ||
      elementRef.current.contains(event.target)
    ) {
      return;
    }
    // Ejecuta la función de callback
    callback();
  };

  return elementRef;
};

export default useClickOutside;
