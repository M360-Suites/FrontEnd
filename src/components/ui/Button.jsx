import React from "react";

const Button = ({ className, title, onClick }) => {
  return (
    <button
      className={`${className} px-5 py-2 rounded-xl text-white`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
