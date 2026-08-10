// import { useEffect, useState } from "react";
// import { healthCheck } from "../api/api";
// import React from "react";
// function Dashboard() {

//   const [status, setStatus] = useState("Checking...");
//   const [error, setError] = useState("");

//   useEffect(() => {

//     const checkBackend = async () => {

//       try {

//         const data = await healthCheck();

//         console.log("Backend response:", data);

//         setStatus("Backend Connected");

//       } catch (error) {

//         console.error(error);

//         setStatus("Backend Offline");

//         setError(
//           "Unable to connect to Django backend."
//         );

//       }

//     };

//     checkBackend();

//   }, []);

//   return (
//     <div className="page">

//       <div className="hero">

//         <div>
//           <p className="eyebrow">
//             DEVELOPER INTELLIGENCE
//           </p>

//           <h1>
//             Developer Skill Graph
//           </h1>

//           <p className="hero-description">
//             Explore developers, skills, technologies
//             and relationships powered by CognoDB.
//           </p>
//         </div>

//       </div>

//       <div className="status-card">

//         <div>
//           <h3>Backend Status</h3>

//           <p>
//             Django REST API
//           </p>
//         </div>

//         <div
//           className={
//             status === "Backend Connected"
//               ? "status connected"
//               : "status disconnected"
//           }
//         >
//           {status}
//         </div>

//       </div>

//       {error && (
//         <div className="error">
//           {error}
//         </div>
//       )}

//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { healthCheck } from "../api/api";

function Dashboard() {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await healthCheck();

        console.log("Backend response:", data);

        setStatus("Backend Connected");
        setError("");
      } catch (error) {
        console.error(error);

        setStatus("Backend Offline");
        setError("Unable to connect to Django backend.");
      }
    };

    checkBackend();
  }, []);

  const connected = status === "Backend Connected";

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">

      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 lg:px-8">

          {/* Brand */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white shadow-sm">
              SG
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900">
                SkillGraph
              </h1>

              <p className="text-[9px] font-medium uppercase tracking-[1.5px] text-slate-400">
                Developer Intelligence
              </p>
            </div>

          </div>


          {/* Search */}

          <div className="hidden w-[420px] lg:block">

            <div className="relative">

              <span className="absolute left-3 top-2.5 text-slate-400">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search developers, skills, projects..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-12 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />

              <span className="absolute right-3 top-2 rounded border border-slate-200 bg-white px-1.5 text-[9px] text-slate-400">
                /
              </span>

            </div>

          </div>


          {/* Right */}

          <div className="flex items-center gap-4">

            <div
              className={`hidden items-center gap-2 rounded-full border px-3 py-1.5 sm:flex ${
                connected
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >

              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  connected
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />

              <span
                className={`text-[10px] font-semibold ${
                  connected
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {connected ? "API Connected" : "API Offline"}
              </span>

            </div>


            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
              D
            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          PAGE
      ====================================================== */}

      <main className="mx-auto max-w-[1600px] px-5 py-7 lg:px-8">


        {/* ===================================================
            PAGE HEADER
        ==================================================== */}

        <section className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <div className="mb-2 flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

              <span className="text-[10px] font-bold uppercase tracking-[1.8px] text-violet-600">
                Developer Intelligence
              </span>

            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Engineering Overview
            </h2>

            <p className="mt-1.5 max-w-2xl text-sm text-slate-500">
              Explore developers, technical skills, projects and
              relationships across your engineering ecosystem.
            </p>

          </div>


          <div className="flex items-center gap-2">

            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
              Export
            </button>

            <button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800">
              Explore Graph →
            </button>

          </div>

        </section>


        {/* ===================================================
            ERROR
        ==================================================== */}

        {error && (

          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-xs text-red-600">
              !
            </div>

            <div>

              <p className="text-xs font-semibold text-red-700">
                Backend connection failed
              </p>

              <p className="mt-0.5 text-[10px] text-red-500">
                {error}
              </p>

            </div>

          </div>

        )}


        {/* ===================================================
            KPI CARDS
        ==================================================== */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            label="Developers"
            value="—"
            description="Indexed developer profiles"
            icon="◉"
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />

          <MetricCard
            label="Skills"
            value="—"
            description="Technical capabilities"
            icon="◇"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />

          <MetricCard
            label="Projects"
            value="—"
            description="Indexed engineering projects"
            icon="▣"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />

          <MetricCard
            label="Relationships"
            value="—"
            description="Knowledge graph connections"
            icon="⌘"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

        </section>


        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">


          {/* GRAPH CARD */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

              <div>

                <h3 className="text-sm font-bold text-slate-900">
                  Developer Skill Graph
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Technology relationships across your developer ecosystem
                </p>

              </div>

              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-slate-500 transition hover:border-violet-300 hover:text-violet-600">
                View graph
              </button>

            </div>


            {/* Graph Visualization */}

            <div className="relative h-[390px] overflow-hidden bg-[#fbfcfe]">

              {/* Graph grid */}

              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />


              {/* Connection lines */}

              <GraphLine className="left-[34%] top-[45%] w-[180px] rotate-[20deg]" />

              <GraphLine className="left-[51%] top-[45%] w-[180px] -rotate-[25deg]" />

              <GraphLine className="left-[34%] top-[55%] w-[180px] -rotate-[20deg]" />

              <GraphLine className="left-[51%] top-[55%] w-[180px] rotate-[20deg]" />


              {/* Center node */}

              <GraphNode
                label="Developer"
                primary
                className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />


              {/* Technology nodes */}

              <GraphNode
                label="Python"
                className="left-[18%] top-[22%]"
              />

              <GraphNode
                label="React"
                className="right-[18%] top-[20%]"
              />

              <GraphNode
                label="Django"
                className="bottom-[19%] left-[18%]"
              />

              <GraphNode
                label="PostgreSQL"
                className="bottom-[17%] right-[14%]"
              />


              {/* Graph legend */}

              <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-violet-500" />
                  <span className="text-[9px] text-slate-500">
                    Developer
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  <span className="text-[9px] text-slate-500">
                    Technology
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* TOP SKILLS */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-4">

              <h3 className="text-sm font-bold text-slate-900">
                Top Skills
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Most represented technologies
              </p>

            </div>


            <div className="space-y-5 p-5">

              <Skill
                name="Python"
                percentage={82}
              />

              <Skill
                name="React"
                percentage={74}
              />

              <Skill
                name="Django"
                percentage={68}
              />

              <Skill
                name="PostgreSQL"
                percentage={61}
              />

              <Skill
                name="JavaScript"
                percentage={56}
              />

            </div>


            <div className="border-t border-slate-100 p-4">

              <button className="w-full rounded-lg border border-slate-200 py-2 text-[10px] font-semibold text-slate-500 transition hover:border-violet-300 hover:text-violet-600">
                View all skills
              </button>

            </div>

          </div>

        </section>


        {/* ===================================================
            LOWER SECTION
        ==================================================== */}

        <section className="mt-5 grid gap-5 lg:grid-cols-2">


          {/* DEVELOPERS */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

              <div>

                <h3 className="text-sm font-bold text-slate-900">
                  Developers
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Recently indexed developer profiles
                </p>

              </div>

              <button className="text-[10px] font-semibold text-violet-600">
                View all →
              </button>

            </div>


            <div>

              <Developer
                initials="AB"
                name="Alex Brown"
                role="Full Stack Developer"
                skills="Python · React · Django"
              />

              <Developer
                initials="SK"
                name="Sarah Kim"
                role="Backend Developer"
                skills="Python · PostgreSQL · API"
              />

              <Developer
                initials="RM"
                name="Rahul Mehta"
                role="Frontend Developer"
                skills="React · TypeScript · Next.js"
              />

              <Developer
                initials="JD"
                name="James Davis"
                role="Software Engineer"
                skills="Django · AWS · PostgreSQL"
              />

            </div>

          </div>


          {/* SYSTEM STATUS */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-4">

              <h3 className="text-sm font-bold text-slate-900">
                Platform Status
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Current backend service health
              </p>

            </div>


            <div className="space-y-3 p-5">

              <ServiceStatus
                name="Django REST API"
                description="Application API"
                connected={connected}
              />

              <ServiceStatus
                name="Developer Graph"
                description="Graph data service"
                connected={connected}
              />

              <ServiceStatus
                name="CognoDB"
                description="Knowledge graph database"
                connected={connected}
              />

            </div>

          </div>

        </section>


        {/* ===================================================
            FOOTER
        ==================================================== */}

        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 py-5 text-[10px] text-slate-400 sm:flex-row">

          <span>
            Developer Skill Graph
          </span>

          <span>
            Powered by{" "}
            <strong className="font-semibold text-violet-600">
              CognoDB
            </strong>
          </span>

        </footer>

      </main>

    </div>
  );
}


/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  label,
  value,
  description,
  icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor} text-sm font-bold`}
        >
          {icon}
        </div>

        <span className="text-[9px] font-medium text-slate-300">
          LIVE
        </span>

      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-400">
        {description}
      </p>

    </div>
  );
}


/* ============================================================
   GRAPH NODE
============================================================ */

function GraphNode({
  label,
  className,
  primary,
}) {
  return (
    <div
      className={`absolute flex min-h-12 min-w-12 items-center justify-center rounded-full border px-3 text-[9px] font-semibold shadow-sm ${
        primary
          ? "border-violet-500 bg-violet-600 text-white shadow-violet-200"
          : "border-blue-200 bg-white text-slate-600"
      } ${className}`}
    >
      {label}
    </div>
  );
}


/* ============================================================
   GRAPH LINE
============================================================ */

function GraphLine({ className }) {
  return (
    <div
      className={`absolute h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent ${className}`}
    />
  );
}


/* ============================================================
   SKILL
============================================================ */

function Skill({
  name,
  percentage,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs font-medium text-slate-600">
          {name}
        </span>

        <span className="text-[10px] font-semibold text-slate-400">
          {percentage}%
        </span>

      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}


/* ============================================================
   DEVELOPER
============================================================ */

function Developer({
  initials,
  name,
  role,
  skills,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-[10px] font-bold text-violet-600">
        {initials}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs font-semibold text-slate-800">
          {name}
        </p>

        <p className="mt-0.5 text-[9px] text-slate-400">
          {role}
        </p>

      </div>

      <div className="hidden text-right sm:block">

        <p className="text-[9px] text-slate-400">
          {skills}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   SERVICE STATUS
============================================================ */

function ServiceStatus({
  name,
  description,
  connected,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            connected
              ? "bg-emerald-50"
              : "bg-red-50"
          }`}
        >

          <span
            className={`h-2 w-2 rounded-full ${
              connected
                ? "bg-emerald-500"
                : "bg-red-500"
            }`}
          />

        </div>

        <div>

          <p className="text-xs font-semibold text-slate-700">
            {name}
          </p>

          <p className="mt-0.5 text-[9px] text-slate-400">
            {description}
          </p>

        </div>

      </div>


      <span
        className={`text-[9px] font-bold ${
          connected
            ? "text-emerald-600"
            : "text-red-600"
        }`}
      >
        {connected ? "Operational" : "Offline"}
      </span>

    </div>
  );
}

export default Dashboard;

