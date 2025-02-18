import React from "react";

const AboutContent = () => {
  return (
    <div className="about-content">
      <h2 className="section-title">About Me</h2>
      <p>👋 Hey there! I'm a web developer focused on front-end technologies.</p>
      <p>💻 My expertise lies in <b>React.js</b>, <b>JavaScript</b>, and modern web development.</p>
      <p>🚀 I enjoy building interactive and visually appealing web applications.</p>

      <h3>My Interests</h3>
      <ul>
        <li>🎨 UI/UX Design & Web Animations</li>
        <li>⚛️ Modern Front-End Frameworks</li>
        <li>🛠️ Open Source & Linux</li>
        <li>📱 Mobile & PWA Development</li>
      </ul>

      <h3>Tech Stack</h3>
      <div className="badges">
        {/* Используем картинки Markdown Badges */}
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
        <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
        <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
        <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
        <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
        <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
        <img src="https://img.shields.io/badge/unity-%23000000.svg?style=for-the-badge&logo=unity&logoColor=white" alt="Unity" />
        <img src="https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white" alt="Photoshop" />
        <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
      </div>
      
      <h3>Hobbies</h3>
      <ul>
        <li>🎮 Gaming & Game Development</li>
        <li>📸 Digital Art & Photography</li>
        <li>🎵 Music & Sound Design</li>
      </ul>
    </div>
  );
};

export default AboutContent;
