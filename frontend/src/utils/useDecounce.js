import React, { useEffect, useState } from "react";

const useDecounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const hendler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(hendler);
    };
  }, [delay, value]);

  return debouncedValue;
};

export default useDecounce;
