/**
 * PageLoader.jsx
 * ──────────────
 * A reusable inline loader for admin table pages.
 * Shows while a Redux thunk is in the `loading` state.
 *
 * Usage:
 *   import PageLoader from "../common/PageLoader";
 *   {loading && <PageLoader rows={6} />}
 */

import "./PageLoader.css";

const PageLoader = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="page-loader-wrapper">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div className="page-loader-row" key={rowIdx}>
          {Array.from({ length: cols }).map((_, colIdx) => (
            <div
              className="page-loader-cell skeleton"
              key={colIdx}
              style={{ animationDelay: `${(rowIdx * cols + colIdx) * 0.06}s` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PageLoader;