import React from 'react';

type logoTypes = {
  width?: string;
  height?: string;
};
const Logo = ({ width = '32', height = '32' }: logoTypes) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1251_1993)">
          <path
            d="M691.839 455.68C726.423 354.668 674.521 91.2152 627.71 73.103C580.899 54.9908 365.199 214.902 330.615 315.913C296.031 416.925 355.261 714.026 402.072 732.138C448.882 750.25 657.255 556.691 691.839 455.68Z"
            fill="#E6D2FF"
          />
          <path
            d="M597.774 395.447C597.774 504.086 454.476 735.215 401.017 735.215C347.559 735.215 185.254 504.086 185.254 395.447C185.254 286.808 347.559 26.4167 401.017 26.4167C454.476 26.4167 597.774 286.808 597.774 395.447Z"
            fill="#9F7BCF"
          />
          <path
            d="M108.162 456.879C73.578 355.867 125.48 92.4142 172.29 74.302C219.101 56.1898 434.801 216.101 469.385 317.112C503.969 418.124 444.739 715.225 397.929 733.337C351.118 751.449 142.746 557.89 108.162 456.879Z"
            fill="#8451C6"
          />
        </g>
        <defs>
          <clipPath id="clip0_1251_1993">
            <rect width="800" height="800" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
