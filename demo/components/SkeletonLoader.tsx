import React from 'react';

interface SkeletonLoaderProps {
  type?: 'page' | 'section' | 'card' | 'table' | 'button' | 'input';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'page',
  count = 1,
}) => {
  const shimmerStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  };

  // Single Section Skeleton (title + content)
  const SectionSkeleton = () => (
    <div style={{ 
      background: 'white', 
      borderRadius: '16px', 
      padding: '32px', 
      marginBottom: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Title */}
      <div style={{
        ...shimmerStyle,
        height: '32px',
        borderRadius: '8px',
        marginBottom: '16px',
        width: '40%',
      }} />
      {/* Subtitle */}
      <div style={{
        ...shimmerStyle,
        height: '20px',
        borderRadius: '4px',
        marginBottom: '24px',
        width: '70%',
      }} />
      {/* Content lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          style={{
            ...shimmerStyle,
            height: '16px',
            borderRadius: '4px',
            marginBottom: '12px',
            width: i === 2 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  );

  // Card Grid Skeleton
  const CardSkeleton = () => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{
        ...shimmerStyle,
        height: '150px',
        borderRadius: '8px',
        marginBottom: '16px',
      }} />
      <div style={{
        ...shimmerStyle,
        height: '24px',
        borderRadius: '4px',
        marginBottom: '12px',
        width: '80%',
      }} />
      <div style={{
        ...shimmerStyle,
        height: '16px',
        borderRadius: '4px',
        width: '100%',
      }} />
    </div>
  );

  // Table Skeleton
  const TableSkeleton = () => (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px', 
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Table Header */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              ...shimmerStyle,
              height: '40px',
              borderRadius: '6px',
              flex: 1,
            }}
          />
        ))}
      </div>
      {/* Table Rows */}
      {Array.from({ length: 8 }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div
              key={colIndex}
              style={{
                ...shimmerStyle,
                height: '36px',
                borderRadius: '4px',
                flex: 1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  // Full Page Skeleton
  const PageSkeleton = () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          ...shimmerStyle,
          height: '48px',
          borderRadius: '8px',
          marginBottom: '16px',
          width: '50%',
        }} />
        <div style={{
          ...shimmerStyle,
          height: '24px',
          borderRadius: '4px',
          width: '70%',
        }} />
      </div>

      {/* Multiple Sections */}
      {Array.from({ length: 3 }).map((_, i) => (
        <SectionSkeleton key={i} />
      ))}
    </div>
  );

  // Button Skeleton
  const ButtonSkeleton = () => (
    <div style={{
      ...shimmerStyle,
      height: '44px',
      borderRadius: '8px',
      width: '120px',
    }} />
  );

  // Input Skeleton
  const InputSkeleton = () => (
    <div style={{
      ...shimmerStyle,
      height: '48px',
      borderRadius: '8px',
      width: '100%',
    }} />
  );

  // Render based on type
  if (type === 'page') {
    return <PageSkeleton />;
  }

  if (type === 'section') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <SectionSkeleton key={i} />
        ))}
      </>
    );
  }

  if (type === 'card') {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        padding: '20px'
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return <TableSkeleton />;
  }

  if (type === 'button') {
    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        {Array.from({ length: count }).map((_, i) => (
          <ButtonSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (type === 'input') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Array.from({ length: count }).map((_, i) => (
          <InputSkeleton key={i} />
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
