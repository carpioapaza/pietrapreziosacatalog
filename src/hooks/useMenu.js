import {useState} from 'react';

export const useMenu = () => {
  const [menuStatus, setMenuStatus] = useState(true);
  const handleMenu = () => {
    if (menuStatus) {
      setMenuStatus(false);
    } else {
      setMenuStatus(true);
    }
  };
  return {
    handleMenu,
    menuStatus,
  };
};
