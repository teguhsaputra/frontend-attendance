"use client";

import { useState, useEffect } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
      setDate(
        new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Loading date...</p>
        <p className="text-2xl font-semibold text-gray-800">--:--:--</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-2xl font-semibold text-gray-800">{time}</p>
      <p className="text-gray-600 text-sm">{date}</p>
    </div>
  );
}
