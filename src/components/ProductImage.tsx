import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = '' }) => {
  const [error, setError] = useState(false);
  
  // Fallback image URL
  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80';
  
  return (
    <img
      src={error ? fallbackImage : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default ProductImage; 