import { useState } from "react";
import { adsAnalytics, liveAdspost } from "../../../utils/dummyData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import LiveAds from "./LiveAds";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdsAnalytics = () => {
  const [slide, setSlide] = useState("analytics");
  const [timeframe, setTimeframe] = useState("monthly");

  // Sample data for the graph
  const graphData = {
    labels:
      timeframe === "daily"
        ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        : timeframe === "monthly"
        ? [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]
        : ["2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Impressions",
        data:
          timeframe === "daily"
            ? [1200, 1900, 1500, 2500, 2100, 1800, 2300]
            : timeframe === "monthly"
            ? [
                5000, 7000, 6500, 8000, 9500, 10000, 11000, 10500, 12000,
                11500, 13000, 14000,
              ]
            : [65000, 85000, 110000, 140000, 170000, 200000],
        borderColor: "#FF5C02",
        backgroundColor: "rgba(255, 92, 2, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Traffic",
        data:
          timeframe === "daily"
            ? [800, 1200, 950, 1700, 1400, 1100, 1600]
            : timeframe === "monthly"
            ? [
                3000, 4500, 4000, 5500, 6200, 7000, 7500, 7200, 8500, 8000,
                9000, 9500,
              ]
            : [40000, 55000, 75000, 95000, 120000, 150000],
        borderColor: "#FF9256",
        backgroundColor: "rgba(255, 146, 86, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: `${
          timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
        } Impression & Traffic Data`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (value) {
            return value >= 1000 ? value / 1000 + "k" : value;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-sm'>
      <div className='mt-4'>
        {/* Tab Navigation */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4'>
          <div className='flex flex-1 gap-4 sm:gap-8 overflow-x-auto pb-2 sm:pb-0'>
            <button
              className={`cursor-pointer text-base sm:text-lg whitespace-nowrap transition-colors ${
                slide === "analytics"
                  ? "font-bold text-primary-orange border-b-2 border-primary-orange pb-1"
                  : "text-gray-600 hover:text-primary-orange"
              }`}
              onClick={() => setSlide("analytics")}
            >
              Ads Analytics
            </button>
            <button
              className={`cursor-pointer text-base sm:text-lg whitespace-nowrap transition-colors ${
                slide === "all ads"
                  ? "font-bold text-primary-orange border-b-2 border-primary-orange pb-1"
                  : "text-gray-600 hover:text-primary-orange"
              }`}
              onClick={() => setSlide("all ads")}
            >
              All Ads
            </button>
          </div>
          <div>
            <button className='bg-orange-gradient text-white px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center text-sm sm:text-base'>
              <span className='mr-1 sm:mr-2'>+</span> Create Campaign
            </button>
          </div>
        </div>

        {/* Conditional content */}
        <div className='mt-6'>
          {slide === "analytics" && (
            <div className='mt-4'>
              {/* Analytics Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                {adsAnalytics.map((ads, index) => (
                  <div
                    className='border border-gray-200 flex flex-col gap-3 sm:gap-4 justify-center p-4 sm:p-6 rounded-lg hover:shadow-md transition-shadow'
                    key={index}
                  >
                    <span className='text-base sm:text-lg text-gray-600'>
                      {ads.title}
                    </span>
                    <p className='font-bold text-2xl sm:text-3xl'>
                      {ads.count}
                    </p>
                    <small
                      className={`font-medium ${
                        ads.change.includes("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {ads.change}
                    </small>
                  </div>
                ))}
              </div>

              {/* Chart Container */}
              <div className='mt-6 sm:mt-8 p-4 sm:p-6 border border-gray-200 rounded-lg'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6'>
                  <p className='font-semibold text-lg sm:text-xl text-gray-800'>
                    Impression & Data Traffic
                  </p>
                  <select
                    name='frequency'
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className='bg-white border border-gray-300 rounded-md px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent'
                  >
                    <option value='annual'>Annual</option>
                    <option value='monthly'>Month</option>
                    <option value='daily'>Day</option>
                  </select>
                </div>

                {/* Responsive Chart Container */}
                <div className='w-full h-[300px] sm:h-[400px] lg:h-[500px]'>
                  <Line options={options} data={graphData} />
                </div>
              </div>
              {/* Live Ads */}
              <LiveAds />
            </div>
          )}

          {slide === "all ads" && (
            <div className='p-4 sm:p-6 border border-gray-200 rounded-lg min-h-[300px] sm:min-h-[400px] flex items-center justify-center'>
              <p className='text-gray-500 text-base sm:text-lg text-center px-4'>
                No active ads campaigns. Create a new campaign to get
                started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsAnalytics;
