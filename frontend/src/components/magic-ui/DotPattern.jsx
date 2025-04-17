import React from "react";

const DotPattern = ({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
  className = "",
  dotColor = "#a2a2aa", // Default dot color
  ...props
}) => {
  return (
    <svg className={className} aria-hidden="true" {...props}>
      <defs>
        <pattern
          id="dot-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} fill={dotColor} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  );
};

export default DotPattern;
