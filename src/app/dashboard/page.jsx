"use client";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCounter() {
      const res = await fetch(`/api/counter`);
      const data = await res.json();
      setCount(data.counter);
    }
    fetchCounter();
  }, []);

  const updateCounter = async (increment) => {
    const res = await fetch(`/api/counter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ increment }),
    });
    const data = await res.json();
    setCount(data.counter);
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div className="text-center">
        <div className="bg-gray-800 p-8 rounded-md">
          <h2 className="text-white text-2xl mb-4">ID:</h2>
          <div className="flex justify-center items-center mb-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-l-md"
              onClick={() => updateCounter(false)}
            >
              -
            </button>
            <input
              type="text"
              value={count}
              readOnly
              className="w-12 text-center text-black"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-r-md"
              onClick={() => updateCounter(true)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
