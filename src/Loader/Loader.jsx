import React from 'react';
import './Loader.css';

const Loader = () => {
  // We create an array of 6 items to represent a grid of food cards
  const skeletonCards = Array(6).fill(0);

  return (
    <div className="container mt-5">
      {/* Header Skeleton */}
      <div className="skeleton-header mb-5">
        <div className="skeleton-title mb-2"></div>
        <div className="skeleton-subtitle"></div>
      </div>

      <div className="row">
        {skeletonCards.map((_, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="food-card-skeleton p-3 shadow-sm border-0">
              {/* Image Placeholder with an animated "Floating Burger" Icon */}
              <div className="skeleton-img-wrapper">
                 <div className="floating-icon">🍔</div>
                 <div className="shimmer-sweep"></div>
              </div>
              
              {/* Content Placeholders */}
              <div className="p-3">
                <div className="skeleton-line long mb-3"></div>
                <div className="skeleton-line medium mb-2"></div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-btn"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;