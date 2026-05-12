"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={ref} className="relative bg-[#141210] overflow-hidden">

      {/* dot-grid texture */}
    
      {/* Only keyframes here — no JS injection */}
      <style>{`
        @keyframes footerShimmer {
          0%, 100% { opacity: 0.5; transform: scaleX(0.8); }
          50%       { opacity: 1;   transform: scaleX(1);   }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.35; transform: scale(1);    }
          50%       { opacity: 1;   transform: scale(1.75); }
        }
      `}</style>

    </footer>
  );
}