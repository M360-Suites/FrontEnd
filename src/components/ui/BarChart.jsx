import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Brand colors from tailwind config
    const primaryOrange = "#FF5C02";
    const lightOrange = "#FF9256";
    
    // Dummy data for the chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const emailCampaignData = [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90];
    const adsCreationData = [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56];
    
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Email Campaigns',
            data: emailCampaignData,
            backgroundColor: `${primaryOrange}CC`, // CC for 80% opacity
            borderColor: primaryOrange,
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          },
          {
            label: 'Ads Creation',
            data: adsCreationData,
            backgroundColor: `${lightOrange}CC`, // CC for 80% opacity
            borderColor: lightOrange,
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              boxWidth: 6,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            boxPadding: 3,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              font: {
                size: 11
              },
              color: '#666'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            },
            ticks: {
              font: {
                size: 11
              },
              color: '#666'
            }
          }
        }
      }
    });
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
