import React from 'react';

export interface SectionHeadingProps {
  orderNumber?: string;
  kicker: string;
  title: string;
  lead?: string;
  inverted?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  orderNumber,
  kicker,
  title,
  lead,
  inverted = false,
}) => {
  return (
    <header className="section-heading">
      <div className="section-kicker-row">
        {orderNumber && <span className="section-number">{orderNumber}</span>}
        <span
          className="section-kicker"
          style={inverted ? { color: 'var(--color-accent)' } : undefined}
        >
          {kicker}
        </span>
        <div
          className="section-divider-line"
          style={
            inverted
              ? { backgroundColor: 'rgba(250, 247, 242, 0.15)' }
              : undefined
          }
        />
      </div>
      <h2
        className="section-title"
        style={inverted ? { color: '#ffffff' } : undefined}
      >
        {title}
      </h2>
      {lead && (
        <p
          className="section-lead"
          style={
            inverted
              ? { color: 'rgba(250, 247, 242, 0.8)' }
              : undefined
          }
        >
          {lead}
        </p>
      )}
    </header>
  );
};
