"use client";

import useStore from "@/store";

export const CompA = () => {
  console.log("CompA render...");
  const compA = useStore((state) => state.compA);
  const setCompA = useStore((state) => state.setCompA);
  return (
    <div>
      <h5>CompA</h5>
      <button
        type="button"
        onClick={() => {
          setCompA({
            d: Date.now(),
          });
        }}
      >
        setComp A
      </button>
      <b>CompA.d: {compA?.d}</b>
    </div>
  );
};
