import React from "react";

function Button({ className, itemName }) {
  return (
    <button type="submit" className={className}>
      {itemName}
    </button>
  );
}

export default Button;
