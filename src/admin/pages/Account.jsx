import React, { useEffect, useState } from "react";
import './../../style/admin.scss'

function AdminAccount() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [accountStats, setAccountStats] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "22704a4xzy4jmeqowy65u";
  const statsLast = 7; // Replace with the number of days for stats

  useEffect(() => {
    // Fetch Account Info
    const fetchAccountInfo = async () => {
      try {
        const response = await fetch(
          `https://streamhgapi.com/api/account/info?key=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch account info");
        const data = await response.json();
        if (data.status === 200) {
          setAccountInfo(data.result);  // Set the result object
        } else {
          throw new Error(data.msg);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    // Fetch Account Stats
    const fetchAccountStats = async () => {
      try {
        const response = await fetch(
          `https://streamhgapi.com/api/account/stats?key=${apiKey}&last=${statsLast}`
        );
        if (!response.ok) throw new Error("Failed to fetch account stats");
        const data = await response.json();
        if (data.status === 200) {
          setAccountStats(data.result);  // Set the result object
        } else {
          throw new Error(data.msg);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAccountInfo();
    fetchAccountStats();
  }, []);

  return (
    <div className="account">
      <div className="repo">
        <div className="content">
          <h1>Admin Account</h1>

          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          {/* Account Info Section */}
          {accountInfo ? (
            <div className="account-info">
              <h2>Account Info</h2>
              <p>
                <strong>Email:</strong> {accountInfo.email}
              </p>
              <p>
                <strong>Login:</strong> {accountInfo.login}
              </p>
              <p>
                <strong>Balance:</strong> ${accountInfo.balance}
              </p>
              <p>
                <strong>Plan:</strong> {accountInfo.premium === 1 ? 'Premium' : 'Free'}
              </p>
              <p>
                <strong>Expiration:</strong> {accountInfo.premium_expire}
              </p>
              <p>
                <strong>Storage Used:</strong> {(accountInfo.storage_used / 1024 / 1024).toFixed(2)} MB
              </p>
              <p>
                <strong>Storage Left:</strong> {(accountInfo.storage_left / 1024 / 1024).toFixed(2)} MB
              </p>
              <p>
                <strong>Total Files:</strong> {accountInfo.files_total}
              </p>
            </div>
          ) : (
            <p>Loading account info...</p>
          )}

          {/* Account Stats Section */}
          {accountStats ? (
            <div className="account-stats">
              <h2>Account Stats (Last {statsLast} Days)</h2>
              <p>
                <strong>Files Uploaded:</strong> {accountStats.uploaded}
              </p>
              <p>
                <strong>Views:</strong> {accountStats.views}
              </p>
              <p>
                <strong>Bandwidth Used:</strong> {accountStats.bandwidth_used} GB
              </p>
            </div>
          ) : (
            <p>Loading account stats...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;
