// Utility to run a callback every second and return a cleanup function
export function runEverySecond(callback: () => void) {
  const intervalId = setInterval(callback, 1000);
  return () => {
    clearInterval(intervalId);
  };
}
