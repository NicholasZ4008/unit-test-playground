import React from "react";
import { useState } from "react";

/* A reusable custom hook that counts the number of seconds spent on a page/component
    Props: runType, onStart, onPause, onReset
    Features:  Start, Pause, and Reset counter
 */
export default function useInterval() {
  const [count, setCount] = useState(0);
  const SECOND = 1000;

  function increment() {
    setCount(count + 1);
  }
  setTimeout(increment, SECOND);

  return count;
}
