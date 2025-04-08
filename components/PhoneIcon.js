import React from "react";

const PhoneIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 99"
    className={props.className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M16,22c-.9,0-1.8.2-2.6.6l33.8,34.2c1.6,1.6,4,1.6,5.6,0l33.8-34.2c-.8-.4-1.7-.6-2.6-.6H16ZM89.4,25.4l-25.4,25.7 25.4,23.6c.4-.8.6-1.7.6-2.6V28c0-.9-.2-1.8-.6-2.6ZM10.6,25.4c-.4.8-.6,1.6-.6,2.6v44c0,.9.2,1.8.6,2.6l25.3-23.5L10.6,25.4h0ZM61.2,53.9l-5.6,5.7c-3.1,3.1-8.2,3.1-11.2,0l-5.6-5.6-25.3,23.5c.8.4,1.6.6,2.5.6h68c.9,0,1.8-.2,2.5-.6l-25.3-23.5h0Z"
    />
  </svg>
);

export default PhoneIcon;