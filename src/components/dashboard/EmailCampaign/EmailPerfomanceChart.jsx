import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Icon } from "@iconify/react/dist/iconify.js";

// Register Chart.js 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmailPerfomanceChart = () => {
  const chartRef = useRef(null);
  const [timeRange, setTimeRange] = useState('month');
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data for different time ranges
  const performanceData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Open Rate',
          data: [42, 38, 45, 50, 55, 40, 48],
          backgroundColor: 'rgba(255, 159, 64, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'Click Rate',
          data: [25, 20, 30, 22, 35, 18, 28],
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'Conversion Rate',
          data: [10, 8, 12, 15, 18, 9, 14],
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderRadius: 4,
        }
      ]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Open Rate',
          data: [45, 48, 52, 49],
          backgroundColor: 'rgba(255, 159, 64, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'Click Rate',
          data: [28, 30, 32, 27],
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'Conversion Rate',
          data: [12, 14, 16, 13],
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderRadius: 4,
        }
      ]
    },
    quarter: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Open Rate',
          data: [47, 51, 54],
          backgroundColor: 'rgba(255, 159, 64, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'Click Rate',
          data: [29, 33, 35],
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'Conversion Rate',
          data: [13, 15, 17],
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderRadius: 4,
        }
      ]
    },
    year: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Open Rate',
          data: [50, 53, 48, 55],
          backgroundColor: 'rgba(255, 159, 64, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'Click Rate',
          data: [32, 35, 30, 37],
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'Conversion Rate',
          data: [15, 18, 14, 20],
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderRadius: 4,
        }
      ]
    }
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          stepSize: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    barPercentage: 0.7,
    categoryPercentage: 0.7,
  };

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setChartData(performanceData[timeRange]);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [timeRange]);

  // Metrics summary data
  const metricsSummary = [
    { 
      name: 'Open Rate', 
      value: '48%', 
      change: '+5%', 
      trend: 'up',
      color: 'rgba(255, 159, 64, 1)'
    },
    { 
      name: 'Click Rate', 
      value: '32%', 
      change: '+3%', 
      trend: 'up',
      color: 'rgba(54, 162, 235, 1)'
    },
    { 
      name: 'Conversion Rate', 
      value: '15%', 
      change: '-2%', 
      trend: 'down',
      color: 'rgba(75, 192, 192, 1)'
    },
    { 
      name: 'Bounce Rate', 
      value: '8%', 
      change: '-1%', 
      trend: 'down',
      color: 'rgba(153, 102, 255, 1)'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
            <Icon icon="mdi:email-check" className="mr-2 text-primary-orange text-xl md:text-2xl" />
            Email Performance Metrics
          </h2>
          <p className="text-sm text-gray-500 mt-1">Track your email campaign performance over time</p>
        </div>
        
        <div className="mt-3 sm:mt-0 flex items-center">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange"
            >
              <option value="week">Last 7 days</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>
      
      {/* Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {metricsSummary.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 md:p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">{metric.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center ${
                metric.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <Icon 
                  icon={metric.trend === 'up' ? 'mdi:arrow-up' : 'mdi:arrow-down'} 
                  className="mr-0.5 text-xs" 
                />
                {metric.change}
              </span>
            </div>
            <div className="text-xl md:text-2xl font-bold" style={{ color: metric.color }}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart */}
      <div className="relative h-[300px] md:h-[350px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-orange"></div>
              <span className="mt-2 text-sm text-gray-600">Loading data...</span>
            </div>
          </div>
        ) : chartData ? (
          <Bar ref={chartRef} data={chartData} options={options} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Icon icon="mdi:chart-off" className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500">No data available</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Legend explanation */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Understanding the metrics:</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li className="flex items-start">
            <span className="w-3 h-3 rounded-full bg-[rgba(255,159,64,0.8)] mt-1 mr-2"></span>
            <span><strong>Open Rate:</strong> Percentage of recipients who opened your email</span>
          </li>
          <li className="flex items-start">
            <span className="w-3 h-3 rounded-full bg-[rgba(54,162,235,0.8)] mt-1 mr-2"></span>
            <span><strong>Click Rate:</strong> Percentage of recipients who clicked on a link in your email</span>
          </li>
          <li className="flex items-start">
            <span className="w-3 h-3 rounded-full bg-[rgba(75,192,192,0.8)] mt-1 mr-2"></span>
            <span><strong>Conversion Rate:</strong> Percentage of recipients who completed a desired action</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmailPerfomanceChart;
