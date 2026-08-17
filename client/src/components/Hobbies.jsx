import { FiCamera, FiCompass, FiZap, FiActivity } from 'react-icons/fi';
import { FaChessKnight, FaGamepad } from 'react-icons/fa6';
import { MdOutlineSportsTennis } from 'react-icons/md';
import { RevealSection } from './RevealSection';

const pursuits = [
  {
    icon: FiCamera,
    title: "PHOTOGRAPHY",
    category: "COMPOSITION & LIGHTING",
    desc: "Street and product photography focusing on light geometry, composition balance, depth of field, and color grading."
  },
  {
    icon: FaChessKnight,
    title: "CHESS",
    category: "STRATEGIC THINKING • STATE LEVEL U-17",
    desc: "State-level competitive chess player. Fosters long-term positional thinking, pattern recognition, and calculated tactical moves under clock pressure."
  },
  {
    icon: FaGamepad,
    title: "TACTICAL GAMING",
    category: "SPATIAL AGILITY & REFLEXES",
    desc: "Competitive strategy games (Free Fire MAX) and algorithmic puzzle teasers that sharpen real-time decision making and coordination."
  },
  {
    icon: MdOutlineSportsTennis,
    title: "BADMINTON",
    category: "PHYSICAL AGILITY & SPEED",
    desc: "Active badminton player cultivating rapid reflexes, endurance, mental agility, and healthy competitive stamina."
  }
];

export const Hobbies = () => {
  return (
    <section id="hobbies" className="section f1-offtrack-section">
      <div className="container">
        <RevealSection variant="speed-wipe">
          <div className="section-header">
            <div className="f1-section-badge">
              <span className="f1-badge-red-block">08</span>
              <span>OFF THE TRACK // DRIVER AGILITY</span>
            </div>
            <h2>Off The Track: Strategy & Pursuits</h2>
            <p>
              Disciplines that keep creative thinking sharp, strategic reflexes quick, and perspective fresh.
            </p>
          </div>
        </RevealSection>

        <RevealSection variant="stagger-cards" className="f1-offtrack-grid">
          {pursuits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article
                key={idx}
                className="f1-offtrack-card"
              >
                <div className="f1-offtrack-top">
                  <div className="f1-offtrack-icon-box">
                    <Icon size={22} />
                  </div>
                  <span className="f1-offtrack-cat">{item.category}</span>
                </div>

                <h3 className="f1-offtrack-title">{item.title}</h3>
                <p className="f1-offtrack-desc">{item.desc}</p>
              </article>
            );
          })}
        </RevealSection>
      </div>
    </section>
  );
};
