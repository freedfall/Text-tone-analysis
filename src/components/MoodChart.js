import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';


ChartJS.register(LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale);

const emotionIcons = {
  sadness: '😭',
  joy: '😊',
  fear: '😨',
  disgust: '🤢',
  anger: '😠',
};

/**
 * Custom plugin to draw background color on the canvas
 */
const backgroundPlugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    const backgroundColor = 'rgba(197, 190, 190, 1)';

    ctx.save();
    ctx.fillStyle = backgroundColor;
    const barWidth = chart.getDatasetMeta(0).data[0].width / 2; // get bar width from the first dataset

    ctx.fillRect(chartArea.left, chartArea.top, barWidth, chartArea.height);
    ctx.restore();
  },
};

/**
 * Render progress bars to visualize emotion intensity
 * @param {number} percentage - emotion intensity percentage
 */
const renderProgressBar = (percentage) => {
  const progressBarStyles = {
    width: `${percentage * 100}%`,
    height: '100%',
  };

  return (
    <div className='progressContainer'>
      <div className='progressBar' style={progressBarStyles}></div>
    </div>
  );
};

/**
 * MoodChart component
 * @param {Object} props - component props
 * @param {number} props.score - overall emotional tone score
 * @param {string} props.label - overall emotional tone label
 * @param {Object} props.emotions - emotions detected
 * @returns {JSX.Element} - MoodChart component
 * 
 */
const MoodChart = ({ score, label, emotions }) => {
  let barColor;
  if (label === 'positive') {
    barColor = 'rgba(157, 236, 129, 1)';
  } else if (label === 'negative') {
    barColor = 'rgba(243, 86, 86, 1)';
  } else {
    barColor = 'rgba(255, 205, 86, 1)';
  }

  // chart data
  const data = {
    labels: ['Mood'],
    datasets: [
      {
        label: 'Overall emotional tone',
        data: [score * 100],
        backgroundColor: [barColor],
        barThickness: 'flex', //adaptive bar width
      },
    ],
  };

  // chart options
  const options = { 
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        offset: false,
      },
      y: {
        min: -100,
        max: 100,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          padding: 20,
          color: 'black',
          font: {
            size: 40,
            weight: 550,
          },
          stepSize: 100, // display only labels at 0, 100, -100
          callback: (value) => {
            if (value === 100) return 'Positive';
            if (value === -100) return 'Negative';
            if (value === 0) return 'Neutral';
            return `${value}%`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 20,
          weight: 'bold',
        },
        bodyFont: {
          size: 18,
        },
        padding: 10,
        cornerRadius: 10,
        displayColors: false,
      },
    },
  };

  return (
    <div className="mood-chart-container">
      <div className="mood-chart">
        <Bar data={data} options={options} plugins={[backgroundPlugin]} />
      </div>

      <div className="emotions-visualization">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(emotions).map(([emotion, value]) => (
            <li key={emotion} className="emotion-row">
              <span className="emotion-icon">
                {emotionIcons[emotion]}
              </span>
              <div>
                {renderProgressBar(value)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodChart;
