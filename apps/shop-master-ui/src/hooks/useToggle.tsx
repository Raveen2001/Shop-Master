import { useMemo, useState } from "react";

const useToggle = (initialValue = false) => {
  const [bool, setBool] = useState(initialValue);

  const isOn = useMemo(() => bool === true, [bool]);
  const isOff = useMemo(() => bool === false, [bool]);

  const on = () => setBool(true);
  const off = () => setBool(false);

  const toggle = () => setBool((prev) => !prev);
  return {
    isOn,
    isOff,
    on,
    off,
    bool,
    toggle,
    setBool,
  };
};

export default useToggle;
