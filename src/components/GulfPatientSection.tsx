import React from 'react';
import { Button } from './Button';
import { GULF_PATIENT_DESTINATIONS, CLINICAL_DOCTOR_INFO } from '../constants/content';

export interface GulfPatientSectionProps {
  onRequestSecondOpinion: () => void;
}

export const GulfPatientSection: React.FC<GulfPatientSectionProps> = ({ onRequestSecondOpinion }) => {
  return (
    <section className="gulf-editorial-section" aria-labelledby="gulf-heading">
      <div className="editorial-container">
        {/* Section Eyebrow */}
        <div className="gulf-header-block">
          <div className="gulf-eyebrow">
            <span className="gulf-eyebrow-num">06</span>
            <span className="gulf-eyebrow-divider" aria-hidden="true" />
            <span className="gulf-eyebrow-label">CROSS-BORDER ONCOLOGICAL CARE</span>
          </div>

          <h2 id="gulf-heading" className="gulf-main-title">
            CLARITY,<br />WHEREVER YOU ARE.
          </h2>

          <p className="gulf-lead-statement">
            A significant portion of Dr. Jem Kalathil’s surgical second opinions are conducted for families residing across the GCC and international destinations. Distance must never stand between a cancer patient and clinical certainty.
          </p>
        </div>

        {/* Editorial Geographic Composition: Abstract Route Architecture (NO FLAGS, NO CARDS) */}
        <div className="gulf-spatial-layout">
          {/* Left Column: Abstract Flight Route Axis with SVG Coordinates */}
          <div className="gulf-route-visual-pane">
            <div className="gulf-hub-card-editorial">
              <div className="hub-marker-row">
                <span className="hub-pulse-dot" aria-hidden="true" />
                <span className="hub-tag">QUATERNARY ONCOLOGY HUB</span>
              </div>
              <h3 className="hub-name">Aster Medcity, Kochi</h3>
              <p className="hub-desc">
                Direct non-stop flight connections from all GCC international airports into Cochin International Airport (COK).
              </p>
            </div>

            {/* Abstract Vector Graphic: Elegant Editorial Flight/Route Lines */}
            <div className="gulf-vector-graphic-wrap" aria-hidden="true">
              <svg width="100%" height="220" viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Latitudinal Hairlines */}
                <path d="M20 50 Q 230 20 440 50" stroke="#C8A96A" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
                <path d="M20 110 Q 230 70 440 110" stroke="#C8A96A" strokeWidth="1" opacity="0.65" />
                <path d="M20 170 Q 230 130 440 170" stroke="#C8A96A" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />

                {/* Hub Anchor Point: Kochi */}
                <circle cx="380" cy="110" r="6" fill="#3B0A07" stroke="#C8A96A" strokeWidth="2" />
                <circle cx="380" cy="110" r="14" stroke="#C8A96A" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.7" />
                <text x="380" y="145" fill="#3B0A07" fontFamily="'Poppins', sans-serif" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="0.08em">KOCHI (COK)</text>

                {/* Gulf Origin Nodes */}
                <circle cx="80" cy="95" r="4" fill="#C8A96A" />
                <text x="80" y="80" fill="#665544" fontFamily="'Montserrat', sans-serif" fontSize="10" fontWeight="500" textAnchor="middle">DXB / AUH</text>

                <circle cx="160" cy="125" r="4" fill="#C8A96A" />
                <text x="160" y="150" fill="#665544" fontFamily="'Montserrat', sans-serif" fontSize="10" fontWeight="500" textAnchor="middle">DOH / MCT</text>

                <circle cx="230" cy="75" r="4" fill="#C8A96A" />
                <text x="230" y="62" fill="#665544" fontFamily="'Montserrat', sans-serif" fontSize="10" fontWeight="500" textAnchor="middle">RUH / KWI</text>

                {/* Direct Arcs to Kochi */}
                <path d="M80 95 Q 230 30 380 110" stroke="#3B0A07" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>

          {/* Right Column: Typographic Destinations Grid with Thin Dividers */}
          <div className="gulf-destinations-column">
            <span className="destinations-column-label">PRIMARY CONSULTATION CORRIDORS</span>

            <div className="destinations-flow-list">
              {GULF_PATIENT_DESTINATIONS.map((dest, idx) => (
                <div key={dest.country} className="destination-flow-row">
                  <div className="dest-left">
                    <span className="dest-index">0{idx + 1}</span>
                    <span className="dest-country-name">{dest.country}</span>
                  </div>
                  <div className="dest-right">
                    <span className="dest-hubs">{dest.hub}</span>
                    <span className="dest-flight-badge">{dest.flightTime} non-stop</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Remote Second Opinion Protocol Box */}
            <div className="gulf-protocol-note">
              <span className="protocol-note-title">REMOTE TELE-ONCOLOGY PROTOCOL</span>
              <p className="protocol-note-p">
                Upload your digital DICOM cross-sectional scans (CT/MRI/PET-CT) and original histopathology reports securely. Dr. Kalathil will conduct an independent review and connect with you and your family for a comprehensive video consultation before you arrange international travel.
              </p>
            </div>

            {/* Actions */}
            <div className="gulf-cta-actions">
              <Button
                variant="primary"
                size="lg"
                className="gulf-primary-btn"
                onClick={onRequestSecondOpinion}
              >
                <span>Request a Second Opinion</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>

              <a
                href={`tel:${CLINICAL_DOCTOR_INFO.secretaryPhone.replace(/\s+/g, '')}`}
                className="gulf-secondary-call"
                title="International Clinical Desk Call"
              >
                <span>International Desk: {CLINICAL_DOCTOR_INFO.secretaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
