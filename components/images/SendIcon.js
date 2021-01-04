import React from "react";

//Importamos los componentes del package
import Svg, { G, Path } from "react-native-svg";

function SendIcon({ color, size, ...props }) {
  return (
    <Svg
      fill={color}
      width={size}
      height={size}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <Path d="M25,2C12.317,2,2,12.318,2,25s10.317,23,23,23s23-10.318,23-23S37.683,2,25,2z M35.707,22.707 C35.512,22.902,35.256,23,35,23s-0.512-0.098-0.707-0.293L26,14.414V38c0,0.552-0.447,1-1,1s-1-0.448-1-1V14.414l-8.293,8.293 c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414l9.999-9.999c0.092-0.093,0.203-0.166,0.326-0.217 c0.244-0.101,0.52-0.101,0.764,0c0.123,0.051,0.233,0.124,0.326,0.217l9.999,9.999C36.098,21.684,36.098,22.316,35.707,22.707z" />
    </Svg>
  );
}

export default SendIcon;
