import React from 'react'

function PrimaryButton({ title, onClick, icon }) {
  return (
    <button className='primary-button'
      onClick={onClick}
    >
      {icon && icon}
      {title}
    </button>
  );
};

export default PrimaryButton;