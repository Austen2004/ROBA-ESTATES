import React from "react";
import { useAuth } from "../context/AuthContext";
import AgentLogin from "./AgentLogin";
import PropertyUploadForm from "./PropertyUploadForm";

export default function AgentDashboard({ onBack }) {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <button className="back-link" onClick={onBack}>
        &larr; Back to listings
      </button>

      {!user ? (
        <AgentLogin onLoggedIn={() => {}} />
      ) : (
        <>
          <div className="dashboard-header">
            <div>
              <h2>Welcome, {user.name}</h2>
              <p className="auth-subtitle">Signed in as {user.role}</p>
            </div>
            <button onClick={logout}>Log out</button>
          </div>
          <PropertyUploadForm />
        </>
      )}
    </div>
  );
}
