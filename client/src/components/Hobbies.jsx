import { FiCamera, FiCompass, FiZap, FiActivity, FiSmile } from 'react-icons/fi';
import { FaChessKnight, FaGamepad } from 'react-icons/fa6';
import { MdOutlineSportsTennis } from 'react-icons/md';

const hobbyIcons = {
  camera: FiCamera,
  chess: FaChessKnight,
  game: FaGamepad,
  sports: MdOutlineSportsTennis
};

export const Hobbies = ({ data }) => {
  const hobbies = data?.hobbies || [
    {
      title: "Photography & Visual Framing",
      category: "Creative Arts",
      icon: "camera",
      description: "Street and product photography focusing on light geometry, composition balance, depth of field, and color grading."
    },
    {
      title: "Chess (State Level U-17)",
      category: "Strategic Thinking",
      icon: "chess",
      description: "State-level competitive chess player. Fosters long-term positional thinking, pattern recognition, and calculated tactical moves under clock pressure."
    },
    {
      title: "Tactical Gaming & Puzzles",
      category: "Spatial Agility",
      icon: "game",
      description: "Competitive strategy games (Free Fire MAX) and algorithmic brain teasers that sharpen real-time decision making and coordination."
    },
    {
      title: "Badminton & Active Sports",
      category: "Physical Agility",
      icon: "sports",
      description: "Playing competitive badminton to cultivate quick reflexes, endurance, mental agility, and healthy team dynamics."
    }
  ];

  return (
    <section id="hobbies" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FiSmile size={14} />
            <span>Beyond The Screen</span>
          </div>
          <h2>Creative Pursuits & Interests</h2>
          <p>
            Disciplines that keep creative thinking sharp, strategic reflexes quick, and perspective fresh.
          </p>
        </div>

        <div className="hobbies-grid">
          {hobbies.map((hobby, idx) => {
            const Icon = hobbyIcons[hobby.icon] || FiCompass;
            return (
              <article
                key={idx}
                className="hobby-card"
              >
                <div className="hobby-icon-wrap">
                  <Icon />
                </div>
                <div className="hobby-category">{hobby.category || "Passion"}</div>
                <h3 className="hobby-title">{hobby.title}</h3>
                <p className="hobby-desc">{hobby.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
