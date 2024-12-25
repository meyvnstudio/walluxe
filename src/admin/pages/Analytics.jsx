import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

function AdminAnalytics() {
  const [accountStats, setAccountStats] = useState(null);
  const [uploads, setUploads] = useState(null);
  const [deletedFiles, setDeletedFiles] = useState(null);
  const [error, setError] = useState(null);
  const [statsLast, setStatsLast] = useState('alltime');  // Default is all-time stats
  const [statsInput, setStatsInput] = useState(7);  // User input for days

  const apiKey = '22704a4xzy4jmeqowy65u';

  // Fetch Account Stats
  const fetchAccountStats = async (days) => {
    const url = days === 'alltime'
      ? `https://streamhgapi.com/api/account/stats?key=${apiKey}`
      : `https://streamhgapi.com/api/account/stats?key=${apiKey}&last=${days}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch account stats');
      const data = await response.json();
      if (data.status === 200) {
        setAccountStats(data.result); // Set the result object
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch File Uploads
  const fetchUploads = async () => {
    try {
      const response = await fetch(`https://streamhgapi.com/api/file/url_uploads?key=${apiKey}`);
      if (!response.ok) throw new Error('Failed to fetch uploads');
      const data = await response.json();
      if (data.status === 200) {
        setUploads(data.result); // Set the result object
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Deleted Files
  const fetchDeletedFiles = async () => {
    try {
      const response = await fetch(`https://streamhgapi.com/api/file/deleted?key=${apiKey}&last=${statsInput}`);
      if (!response.ok) throw new Error('Failed to fetch deleted files');
      const data = await response.json();
      if (data.status === 200) {
        setDeletedFiles(data.result); // Set the result object
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle statsLast input change
  const handleStatsInputChange = (e) => {
    setStatsInput(e.target.value);
  };

  // Handle form submission to fetch stats for the entered days
  const handleFetchStats = (e) => {
    e.preventDefault();
    setStatsLast(statsInput);
    fetchAccountStats(statsInput);
    fetchDeletedFiles();
  };

  useEffect(() => {
    fetchUploads();
    fetchAccountStats('alltime'); // Default to all-time stats
  }, []);

  // Prepare data for the chart
  const prepareChartData = () => {
    if (!accountStats) return {};

    const days = accountStats.map(stat => stat.day);
    const views = accountStats.map(stat => stat.views);
    const profitViews = accountStats.map(stat => stat.profit_views);
    const sales = accountStats.map(stat => stat.sales);

    return {
      labels: days,
      datasets: [
        {
          label: 'Views',
          data: views,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Profit Views',
          data: profitViews,
          borderColor: 'rgba(153, 102, 255, 1)',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Sales',
          data: sales,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          fill: true,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="analytics">
      <div className="repo">
        <div className="content">
          <h1>Admin Analytics</h1>

          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {/* Input for statsLast */}
          <div className="stats-input">
            <form onSubmit={handleFetchStats}>
              <label htmlFor="statsInput">Enter number of days for stats (or 'alltime'):</label>
              <input
                type="number"
                id="statsInput"
                value={statsInput}
                onChange={handleStatsInputChange}
                min="1"
                max="365"
                required
              />
              <button type="submit">Fetch Stats</button>
            </form>
          </div>

          {/* Account Stats Chart Section */}
          {accountStats ? (
            <div className="account-stats">
              <h2>Account Stats (Last {statsLast} Days)</h2>
              <Line data={chartData} options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: `Account Stats for Last ${statsLast} Days`,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Value',
                    },
                    beginAtZero: true,
                  },
                },
              }} />
            </div>
          ) : (
            <p>Loading account stats...</p>
          )}

          {/* File Uploads Section */}
          {uploads ? (
            <div className="uploads">
              <h2>File Uploads</h2>
              {uploads.map((upload, index) => (
                <div key={index} className="upload-item">
                  <p><strong>Remote URL:</strong> <a href={upload.remote_url} target="_blank" rel="noopener noreferrer">{upload.remote_url}</a></p>
                  <p><strong>Status:</strong> {upload.status}</p>
                  <p><strong>Progress:</strong> {upload.progress}%</p>
                  <p><strong>File Code:</strong> {upload.file_code || 'N/A'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading file uploads...</p>
          )}

          {/* Deleted Files Section */}
          {deletedFiles ? (
            <div className="deleted-files">
              <h2>Deleted Files (Last {statsLast} Days)</h2>
              {deletedFiles.map((file, index) => (
                <div key={index} className="deleted-file-item">
                  <p><strong>File Code:</strong> {file.file_code}</p>
                  <p><strong>Deleted By:</strong> {file.deleted_by}</p>
                  <p><strong>Deleted Ago (Seconds):</strong> {file.deleted_ago_sec}</p>
                  <p><strong>Deleted At:</strong> {file.deleted}</p>
                  <p><strong>Title:</strong> {file.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading deleted files...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
