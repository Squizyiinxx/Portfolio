import React, { memo } from "react";

const Heading = memo(function Heading() {
  return (
    <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight leading-tight text-primary-300 mb-4 lg:hidden heading-animate">
      FULLSTACK DEVELOPER
    </h1>
  );
});

Heading.displayName = "Heading";
export default Heading;
