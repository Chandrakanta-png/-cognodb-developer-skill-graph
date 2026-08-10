// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const API_URL = "http://127.0.0.1:8000/api";

// function Developers() {
//   const [developers, setDevelopers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch(`${API_URL}/developers/`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch developers");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setDevelopers(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="page">Loading developers...</div>;
//   }

//   if (error) {
//     return (
//       <div className="page">
//         <h2>Error</h2>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="page">
//       <h1>Developers</h1>

//       {developers.length === 0 ? (
//         <p>No developers found.</p>
//       ) : (
//         <div className="developer-grid">
//           {developers.map((developer) => (
//             <div className="developer-card" key={developer.id}>
//               <h2>{developer.name}</h2>

//               {developer.title && (
//                 <p>
//                   <strong>Title:</strong> {developer.title}
//                 </p>
//               )}

//               {developer.email && (
//                 <p>
//                   <strong>Email:</strong> {developer.email}
//                 </p>
//               )}

//               {developer.location && (
//                 <p>
//                   <strong>Location:</strong> {developer.location}
//                 </p>
//               )}

//               {developer.experience !== null &&
//                 developer.experience !== undefined && (
//                   <p>
//                     <strong>Experience:</strong> {developer.experience}
//                   </p>
//                 )}

//               <Link to={`/developer/${developer.id}`}>
//                 View Details
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Developers;
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/developers/`);

        if (!response.ok) {
          throw new Error("Failed to fetch developers");
        }

        const data = await response.json();

        setDevelopers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load developers");
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const filteredDevelopers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return developers;
    }

    return developers.filter((developer) => {
      return (
        developer.name?.toLowerCase().includes(query) ||
        developer.title?.toLowerCase().includes(query) ||
        developer.email?.toLowerCase().includes(query) ||
        developer.location?.toLowerCase().includes(query)
      );
    });
  }, [developers, search]);

  if (loading) {
    return <DevelopersSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-5 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Title */}

            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-600" />

                <span className="text-[10px] font-bold uppercase tracking-[1.8px] text-violet-600">
                  Developer Intelligence
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Developers
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Explore developers and their technical capabilities.
              </p>
            </div>

            {/* Search */}

            <div className="relative w-full lg:w-[360px]">
              <svg
                className="absolute left-3 top-3 h-4 w-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search developers..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}

      <main className="mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
        {/* Stats */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total Developers"
            value={developers.length}
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  strokeWidth="1.8"
                />
                <path
                  strokeLinecap="round"
                  strokeWidth="1.8"
                  d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                />
              </svg>
            }
          />

          <StatCard
            label="Showing"
            value={filteredDevelopers.length}
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  strokeWidth="1.8"
                />
              </svg>
            }
          />

          <StatCard
            label="Graph Status"
            value="Connected"
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 3v4m0 10v4M3 12h4m10 0h4M5.64 5.64l2.83 2.83m7.06 7.06 2.83 2.83m0-12.72-2.83 2.83m-7.06 7.06-2.83 2.83"
                />
              </svg>
            }
            status
          />
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                !
              </div>

              <div>
                <h3 className="text-sm font-bold text-red-800">
                  Unable to load developers
                </h3>

                <p className="mt-1 text-xs text-red-600">
                  {error}
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Header */}

        {!error && (
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Developer Directory
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {search
                  ? `Search results for "${search}"`
                  : "All developers indexed in the skill graph"}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">
                {filteredDevelopers.length} developers
              </span>
            </div>
          </div>
        )}

        {/* Empty State */}

        {!error && filteredDevelopers.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  strokeWidth="1.5"
                />
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-800">
              {search
                ? "No developers found"
                : "No developers available"}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {search
                ? "Try searching with a different name, title, or location."
                : "There are currently no developer profiles in the graph."}
            </p>
          </div>
        )}

        {/* Developer Grid */}

        {!error && filteredDevelopers.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredDevelopers.map((developer) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


/* ============================================================
   DEVELOPER CARD
============================================================ */

function DeveloperCard({ developer }) {
  const initials = getInitials(developer.name);

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50">

      {/* Top gradient */}

      <div className="h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500" />

      <div className="p-5">

        {/* Profile */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 text-sm font-bold text-violet-700">
              {initials}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-slate-900">
                {developer.name || "Unnamed Developer"}
              </h3>

              {developer.title ? (
                <p className="mt-1 truncate text-xs text-slate-500">
                  {developer.title}
                </p>
              ) : (
                <p className="mt-1 text-xs text-slate-400">
                  Developer
                </p>
              )}
            </div>

          </div>

          <div className="rounded-full bg-emerald-50 px-2.5 py-1">
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ACTIVE
            </span>
          </div>

        </div>


        {/* Information */}

        <div className="mt-6 space-y-3">

          {developer.email && (
            <InfoRow
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m22 6-10 7L2 6"
                  />
                </svg>
              }
              text={developer.email}
            />
          )}

          {developer.location && (
            <InfoRow
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    strokeWidth="1.5"
                  />
                </svg>
              }
              text={developer.location}
            />
          )}

          {developer.experience !== null &&
            developer.experience !== undefined && (
              <InfoRow
                icon={
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M8 12h8"
                    />
                  </svg>
                }
                text={`${developer.experience} years experience`}
              />
            )}

        </div>


        {/* Divider */}

        <div className="my-5 border-t border-slate-100" />


        {/* Footer */}

        <div className="flex items-center justify-between">

          <span className="text-[10px] font-medium text-slate-400">
            Developer ID: {developer.id}
          </span>

          <Link
            to={`/developer/${developer.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-[10px] font-semibold text-white transition group-hover:bg-violet-600"
          >
            View Profile

            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

        </div>

      </div>
    </div>
  );
}


/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({ icon, text }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
        {icon}
      </div>

      <span className="truncate text-xs text-slate-600">
        {text}
      </span>
    </div>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  label,
  value,
  icon,
  status,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          {icon}
        </div>

        {status && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            LIVE
          </span>
        )}

      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 font-bold tracking-tight ${
          status
            ? "text-lg text-emerald-600"
            : "text-2xl text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}


/* ============================================================
   LOADING SKELETON
============================================================ */

function DevelopersSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-5 lg:px-8">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-3 h-4 w-80 animate-pulse rounded bg-slate-100" />
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 py-7 lg:px-8">

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>

      </main>
    </div>
  );
}


/* ============================================================
   INITIALS
============================================================ */

function getInitials(name) {
  if (!name) {
    return "D";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default Developers;