import { useState, useEffect, useRef } from "react";

export default function AnimatedPrice({ currentPrice, unit = "Quintal" }) {
  const [animatedPrice, setAnimatedPrice] = useState(currentPrice);
  const [flashColor, setFlashColor] = useState(""); // "" | "green" | "red"
  const prevPriceRef = useRef(currentPrice);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;

    if (prevPrice === currentPrice) return; // no change

    // Determine flash color
    setFlashColor(currentPrice > prevPrice ? "green" : "red");

    const step = (currentPrice - prevPrice) / 10; // 10 animation steps
    let count = 0;

    const interval = setInterval(() => {
      count++;
      setAnimatedPrice(prev => {
        const next = prev + step;
        if ((step > 0 && next >= currentPrice) || (step < 0 && next <= currentPrice)) {
          clearInterval(interval);
          prevPriceRef.current = currentPrice;
          // Remove flash color after animation ends
          setTimeout(() => setFlashColor(""), 500);
          return currentPrice;
        }
        return next;
      });

      if (count >= 10) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const colorClass =
    flashColor === "green"
      ? "text-green-500"
      : flashColor === "red"
      ? "text-red-500"
      : "text-green-700";

  return (
    <span className={`${colorClass} font-semibold transition-colors duration-500`}>
      {animatedPrice.toFixed(0)} / {unit}
    </span>
  );
}
