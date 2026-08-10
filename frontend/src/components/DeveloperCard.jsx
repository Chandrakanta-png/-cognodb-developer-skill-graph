import { Link } from "react-router-dom";
import React from "react";

function DeveloperCard({ developer }) {
  return (
    <div className="developer-card">

      <div className="developer-avatar">
        {developer.name?.charAt(0)?.toUpperCase() || "D"}
      </div>

      <div className="developer-info">

        <h3>
          {developer.name}
        </h3>

        <p>
          {developer.email || "No email"}
        </p>

        {developer.role && (
          <span className="developer-role">
            {developer.role}
          </span>
        )}

      </div>

      {developer.id && (
        <Link
          to={`/developers/${developer.id}`}
          className="view-button"
        >
          View
        </Link>
      )}

    </div>
  );
}

export default DeveloperCard;