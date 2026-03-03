import React from "react";
import "./MyOrdersSkeleton.css";

const MyOrdersSkeleton = ({ rows }) => {
  return (
    <>
      {/* ================= MOBILE SKELETON ================= */}
      <div className="d-md-none">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body">

              <div className="d-flex align-items-center mb-3">
                <div className="skeleton skeleton-img"></div>
                <div className="skeleton skeleton-price ms-3"></div>
              </div>

              <div className="skeleton skeleton-text mb-2"></div>
              <div className="skeleton skeleton-count mb-2"></div>
              <div className="skeleton skeleton-status mb-3"></div>

              <div className="skeleton skeleton-btn"></div>

            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP SKELETON ================= */}
      <div className="table-responsive d-none d-md-block">
        <table className="table align-middle">
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index}>
                <td>
                  <div className="skeleton skeleton-img"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-text"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-price"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-count"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-status"></div>
                </td>
                <td>
                  <div className="skeleton skeleton-btn"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyOrdersSkeleton;
