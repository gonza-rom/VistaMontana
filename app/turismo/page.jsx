"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Turismo() {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    fetch("/api/turismo")
      .then((res) => res.json())
      .then((data) => setLugares(data));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Lugares turísticos</h2>
      <Map lugares={lugares} />
    </div>
  );
}
