import React from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { name } = useParams();

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      <p className="text-lg">
        Detailed information about {name} will be displayed here.
      </p>
    </div>
  );
}
