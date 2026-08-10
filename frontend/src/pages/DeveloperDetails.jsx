import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDeveloper } from "../api/api";

function DeveloperDetails() {
  const { id } = useParams();

  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDeveloper = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDeveloper(id);

        setDeveloper(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load developer.");
      } finally {
        setLoading(false);
      }
    };

    loadDeveloper();
  }, [id]);

  const initials = useMemo(() => {
    if (!developer?.name) return "D";

    return developer.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  }, [developer]);

  if (loading) {
    return <DeveloperDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Link
            to="/developers"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600"
          >
            ← Back to Developers
          </Link>

          <div className="mt-6 rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg font-bold text-red-500">
                !
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Unable to load developer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {error}
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-600"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen bg-[#f8fafc] px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Link
            to="/developers"
            className="text-sm font-medium text-slate-500 hover:text-violet-600"
          >
            ← Back to Developers
          </Link>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Developer not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              The requested developer profile does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-5 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/developers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
            >
              <span className="text-lg">←</span>
              Back to Developers
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-slate-400">
                Developer Profile
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8">
        {/* Profile Hero */}

        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Decorative background */}

          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-100/60 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              {/* Identity */}

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {/* Avatar */}

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-2xl font-bold text-white shadow-lg shadow-violet-200">
                  {initials}
                </div>

                {/* Name */}

                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                      Active
                    </span>

                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-violet-600">
                      Developer
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {developer.name || "Unnamed Developer"}
                  </h1>

                  {developer.role && (
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      {developer.role}
                    </p>
                  )}

                  {developer.title && (
                    <p className="mt-1 text-sm text-slate-400">
                      {developer.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Developer ID */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-slate-400">
                  Developer ID
                </p>

                <p className="mt-1 font-mono text-sm font-semibold text-slate-700">
                  {developer.id}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            CONTENT GRID
        ================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}

          <div className="space-y-6">
            {/* Contact Information */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionTitle
                title="Profile Information"
                subtitle="Developer contact and professional information"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {developer.email && (
                  <DetailItem
                    label="Email"
                    value={developer.email}
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
                  />
                )}

                {developer.location && (
                  <DetailItem
                    label="Location"
                    value={developer.location}
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
                  />
                )}

                {developer.role && (
                  <DetailItem
                    label="Role"
                    value={developer.role}
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
                          strokeWidth="1.5"
                          d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"
                        />
                      </svg>
                    }
                  />
                )}

                {developer.experience !== null &&
                  developer.experience !== undefined && (
                    <DetailItem
                      label="Experience"
                      value={`${developer.experience} years`}
                      icon={
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            strokeWidth="1.5"
                          />
                          <path
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            d="M12 7v5l3 2"
                          />
                        </svg>
                      }
                    />
                  )}
              </div>
            </section>

            {/* Skills */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionTitle
                title="Technical Skills"
                subtitle="Technologies and capabilities associated with this developer"
              />

              {developer.skills &&
              Array.isArray(developer.skills) &&
              developer.skills.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {developer.skills.map((skill, index) => {
                    const skillName =
                      typeof skill === "string"
                        ? skill
                        : skill.name || "Unknown Skill";

                    return (
                      <div
                        key={skill.id || index}
                        className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition hover:border-violet-200 hover:bg-violet-50"
                      >
                        <span className="h-2 w-2 rounded-full bg-violet-500 transition group-hover:scale-125" />

                        <span className="text-xs font-semibold text-slate-700 group-hover:text-violet-700">
                          {skillName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-sm font-medium text-slate-500">
                    No skills available
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    No technical skills have been indexed for this developer.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT */}

          <aside className="space-y-6">
            {/* Skill Summary */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionTitle
                title="Skill Summary"
                subtitle="Graph profile overview"
              />

              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-bold tracking-tight text-slate-900">
                      {Array.isArray(developer.skills)
                        ? developer.skills.length
                        : 0}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Indexed skills
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                    style={{
                      width: `${Math.min(
                        (Array.isArray(developer.skills)
                          ? developer.skills.length
                          : 0) * 10,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Graph Connection */}

            <section className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-violet-300">
                    Skill Graph
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    Developer Network
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                Explore technologies, skills and relationships connected to
                this developer in the CognoDB knowledge graph.
              </p>

              <Link
                to={`/graph/developer/${developer.id}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-xs font-bold transition hover:bg-violet-500"
              >
                Explore Skill Graph

                <span>→</span>
              </Link>
            </section>

            {/* Profile Status */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Profile Indexed
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Developer data is available in CognoDB.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}


/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-base font-bold text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}


/* ============================================================
   DETAIL ITEM
============================================================ */

function DetailItem({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}


/* ============================================================
   LOADING SKELETON
============================================================ */

function DeveloperDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-5 lg:px-8">
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8">
        <div className="h-44 animate-pulse rounded-3xl border border-slate-200 bg-white" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />

            <div className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          </div>

          <div className="space-y-6">
            <div className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white" />

            <div className="h-56 animate-pulse rounded-2xl bg-slate-900" />

            <div className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DeveloperDetails;