import React from 'react';

const RotatingContainer = ({ rotate, children }) => {
  return (
    <div
      className={`bg-cover bg-center h-screen relative transition-transform transform ${
        rotate ? 'rotateY-180 transition-transform duration-500' : ''
      }`}
      style={{
        backgroundImage:
          'url(http://www.centreequestre-lugere.fr/lugere/fille/jordan-spizike-femme-pas-cher---1.jpg)',
      }}
    >
      {children}
    </div>
  );
};

export default RotatingContainer;
