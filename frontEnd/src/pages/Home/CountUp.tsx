import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: string;
}

function CountUp({ value }: Props) {
  const match = value.match(/^(\d+)(.*)/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    const target = parseInt(match[1]);
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  if (!match) return <span>{value}</span>;
  return <span ref={ref}>{count}{match[2]}</span>;
}

export default CountUp;
