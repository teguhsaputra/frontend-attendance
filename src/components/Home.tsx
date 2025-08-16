"use client";
import { useState } from "react";
import {
  ClockIcon,
  CheckIcon,
  DoorClosedIcon,
  CalendarIcon,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"absensi" | "data">("absensi");
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
    setDate(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, 1000);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance System
          </h1>
          <div className="text-right">
            <p className="text-gray-600">{date}</p>
            <p className="text-2xl font-semibold text-gray-800">{time}</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Attendance
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("absensi")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "absensi"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Absensi
                </button>
                <button
                  onClick={() => setActiveTab("data")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "data"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Data
                </button>
              </div>
            </div>

            {activeTab === "absensi" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Working Hours</p>
                    <p className="text-2xl font-bold text-gray-800">
                      08:00 - 17:00
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Current Time</p>
                    <p className="text-2xl font-bold text-gray-800">{time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Punch in</p>
                    <p className="text-xl font-bold text-gray-800">10:05</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Punch out</p>
                    <p className="text-xl font-bold text-gray-800">00:00</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors">
                    <CheckIcon className="h-5 w-5" />
                    <span>Punch In</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors">
                    <DoorClosedIcon className="h-5 w-5" />
                    <span>Punch Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Employees
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">42</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Departments
                    </h3>
                    <p className="text-3xl font-bold text-green-600">5</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Present Today</span>
                      <span className="font-medium">38</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">On Leave</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Late Arrivals</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Calendar
            </h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`p-2 rounded-full ${
                    day === new Date().getDate()
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">Hi, Lokesh</h2>
            <p className="text-gray-500">Good Morning</p>
            <p className="text-gray-500 mb-4">Have a good day</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              View Profile
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Status
            </h2>
            <div className="space-y-4">
              {["Project", "Holiday", "Leave", "Meeting"].map((item) => (
                <div key={item} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{item}</h3>
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Leave Stats
            </h2>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">16 Days</p>
                <p className="text-gray-500">16/20</p>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                Apply for Leave
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
