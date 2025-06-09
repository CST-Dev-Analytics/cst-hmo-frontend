import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie, Radar, PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true },
  },
};

const chartData = {
  billing: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Billing ($)",
        data: [500, 700, 600, 800, 750],
        backgroundColor: "rgba(0, 128, 128, 0.6)",
      },
    ],
  },
  admissionsAndDischarges: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Admissions",
        data: [20, 30, 25, 40, 35],
        borderColor: "green",
        backgroundColor: "rgba(0,128,0,0.3)",
        tension: 0.3,
      },
      {
        label: "Discharges",
        data: [18, 25, 22, 30, 28],
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.3)",
        tension: 0.3,
      },
    ],
  },
  pharmacy: {
    labels: ["Painkillers", "Antibiotics", "Vitamins", "Cough Syrup"],
    datasets: [
      {
        label: "Pharmacy",
        data: [120, 90, 75, 60],
        backgroundColor: ["#008080", "#800080", "#ffa500", "#00bfff"],
      },
    ],
  },
  inventory: {
    labels: ["Syringes", "IV Bags", "Bandages", "Gloves"],
    datasets: [
      {
        label: "Inventory Levels",
        data: [800, 600, 950, 700],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  },
};

export default function MultiChartSwitcher() {
  const [selectedChart, setSelectedChart] = useState("billing");

  const renderChart = () => {
    switch (selectedChart) {
      case "billing":
        return (
          <Bar
            options={{
              ...chartOptions,
              plugins: { title: { display: true, text: "Billing Overview" } },
            }}
            data={chartData.billing}
          />
        );
      case "admissions":
        return (
          <Line
            options={{
              ...chartOptions,
              plugins: {
                title: { display: true, text: "Admissions and Discharges" },
              },
            }}
            data={chartData.admissionsAndDischarges}
          />
        );
      case "pharmacy":
        return (
          <div className="flex items-center gap-8">
            {/* Chart on the left */}
            <div style={{ width: "600px", height: "600px" }}>
              <Pie
                options={{
                  ...chartOptions,
                  plugins: {
                    legend: { display: false },
                    title: { display: true, text: "Pharmacy Distribution" },
                  },
                  maintainAspectRatio: false,
                }}
                data={chartData.pharmacy}
              />
            </div>

            {/* Display info on the right */}
            <div className="space-y-2">
              <h1>Quantity</h1>
              {chartData.pharmacy.labels.map((label, index) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        chartData.pharmacy.datasets[0].backgroundColor[index],
                    }}
                  ></div>
                  <span>
                    {label}: {chartData.pharmacy.datasets[0].data[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "inventory":
        return (
          <Bar
            options={{
              ...chartOptions,
              plugins: { title: { display: true, text: "Inventory Levels" } },
            }}
            data={chartData.inventory}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hospital Dashboard</h2>
      <select
        value={selectedChart}
        onChange={(e) => setSelectedChart(e.target.value)}
      
        className="border rounded-lg border-gray-300 text-[12px] px-4 py-2"
      >
        <option value="billing" className="text-[12px]">Billing (Bar Chart)</option>
        <option value="admissions" className="text-[12px]">Admissions & Discharges (Line Chart)</option>
        <option value="pharmacy" className="text-[12px]">Pharmacy (Pie Chart)</option>
        <option value="inventory" className="text-[12px]">Inventory (Bar Chart)</option>
      </select>

      {renderChart()}
    </div>
  );
}
