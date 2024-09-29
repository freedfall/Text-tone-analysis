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
  sadness: '😢',
  joy: '😊',
  fear: '😨',
  disgust: '🤢',
  anger: '😠',
};

// generate squares array for each emotion
const renderSquares = (percentage) => {
  const filledSquares = Math.round(percentage * 10); // convert percentage to number of squares
  const squares = [];

  // add filled squares
  for (let i = 0; i < filledSquares; i++) {
    squares.push(<div key={`filled-${i}`} className="square filled"></div>);
  }

  // add empty squares
  for (let i = filledSquares; i < 10; i++) {
    squares.push(<div key={`empty-${i}`} className="square empty"></div>);
  }

  return squares;
};

const MoodChart = ({ score, label, emotions }) => {
  const colorRed = 'rgba(255, 99, 132, 1)';
  const colorGreen = 'rgba(76, 245, 181, 1)';
  const colorYellow = 'rgba(255, 205, 86, 1)';
  let backgroundColor;

  if (label === 'positive') {
    backgroundColor = colorGreen;
  } else if (label === 'negative') {
    backgroundColor = colorRed; 
  } else {
    backgroundColor = colorYellow;
  }

  const data = {
    labels: ['Mood'],
    datasets: [
      {
        label: 'Overall emotional tone',
        data: [score * 100], // display as percentage
        backgroundColor: [backgroundColor],
        barThickness: 100,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        min: -100,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            if (value === 100) return 'Positive';
            if (value === -100) return 'Negative';
            if (value === 0) return 'Neutral';
            return `${value}%`;
          },
          font: {
            size: 35,
            weight: 500,
          },
          stepSize: 100,
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
        {/* <h3>Primary emotional tone: {label}</h3> */}
        <Bar data={data} options={options} />
      </div>

      <div className="emotions-visualization">
        {/* <h3>Emotions</h3> */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(emotions).map(([emotion, value]) => (
            <li key={emotion} className="emotion-row">
              <span className="emotion-icon">
                {emotionIcons[emotion]}
              </span>
              {/* <span className="emotion-label">
                {Math.round(value * 100)}%
              </span> */}
              <div className="squares-container" style={{ display: 'flex', marginLeft: '10px' }}>
                {renderSquares(value)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodChart;
