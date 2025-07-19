import React from 'react';

interface CircularIconProps {
  src?: string;
  alt?: string;
  backgroundColor?: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const CircularIcon: React.FC<CircularIconProps> = ({
  src,
  alt = '',
  backgroundColor = '#f8f9fa',
  size = 56,
  className = '',
  children,
}) => {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {children ? (
        React.cloneElement(children as React.ReactElement, {
          style: {
            width: size * 0.7,
            height: size * 0.7,
            ...(children as React.ReactElement).props.style,
          },
        })
      ) : src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: size * 0.7,
            height: size * 0.7,
            objectFit: 'contain',
          }}
        />
      ) : null}
    </div>
  );
};

export default CircularIcon; 