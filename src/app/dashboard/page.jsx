"use client";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`ID ${count.toString()}:`).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center bg-gray-200">
      <div className="text-center w-full max-w-2xl p-8 bg-gray-800 rounded-md shadow-lg relative">
        <h2 className="text-white text-3xl mb-6">{`ID-${count}`}</h2>
        <div className="flex justify-center items-center mb-6 space-x-4">
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-full text-xl hover:bg-red-600"
            onClick={() => updateCounter(false)}
          >
            -
          </button>
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-full text-xl hover:bg-green-600"
            onClick={() => updateCounter(true)}
          >
            +
          </button>
        </div>
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-3 inline-flex items-center justify-center bg-gray-100 dark:bg-gray-700 transition-colors"
          onClick={copyToClipboard}
        >
          {copied ? (
            <span className="text-blue-700 dark:text-blue-500">Copied!</span>
          ) : (
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}

export default DashboardPage;
