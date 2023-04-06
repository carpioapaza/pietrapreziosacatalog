import React, {useState, useEffect} from 'react';

const Alert = ({message, type}) => {
  const [title, setTitle] = useState('Alert');

  const titleMap = {
    s: 'Success',
    w: 'Warning!',
    d: 'Danger!',
    default: 'Alert',
  };

  useEffect(() => {
    setTitle(titleMap[type] || 'Alert');
  }, [type]);

  return (
    <div className={`alert ${type ? `alert--${type}` : ''}`}>
      <div className={`alert__header ${type ? `alert__header--${type}` : ''}`}>
        {title}
      </div>
      <div className={`alert__body ${type ? `alert__body--${type}` : ''}`}>
        {message}
      </div>
    </div>
  );
};

export default Alert;

// import React, {useState, useEffect} from 'react';

// const Alert = ({message, type, timeout}) => {
//   const [title, setTitle] = useState('Alert');
//   const [isShown, setIsShown] = useState(true);

//   const titleMap = {
//     s: 'Success',
//     w: 'Warning!',
//     d: 'Danger!',
//     default: 'Alert',
//   };

//   useEffect(() => {
//     setTitle(titleMap[type] || 'Alert');
//     const timer = setTimeout(() => {
//       setIsShown(false);
//     }, timeout * 1000);
//     return () => clearTimeout(timer);
//   }, [type, timeout]);

//   return (
//     isShown && (
//       <div
//         className={`alert ${type ? `alert--${type}` : ''}`}
//         onAnimationEnd={() => {
//           if (!isShown) {
//             // perform any cleanup or callback when the alert is fully hidden
//           }
//         }}
//       >
//         <div
//           className={`alert__header ${type ? `alert__header--${type}` : ''}`}
//         >
//           {title}
//         </div>
//         <div className={`alert__body ${type ? `alert__body--${type}` : ''}`}>
//           {message}
//         </div>
//       </div>
//     )
//   );
// };

// export default Alert;
