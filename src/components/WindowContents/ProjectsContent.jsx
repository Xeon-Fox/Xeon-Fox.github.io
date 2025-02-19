import React from 'react';

const ProjectsContent = () => {
  const projects = [
    {
      title: 'Radeon Site Knockoff',
      image: 'resources/img/project1.png',
      description: 'Full-Stack Django app that is inspired by the AMD Radeon graphics card official website. ',
      github: 'https://github.com/aerosness/radeon-site-knockoff',
    },
    {
      title: 'aerosness.github.io',
      image: 'resources/img/project2.png',
      description: 'Literally the website you’re on right now! Built using React, with the windows 7/fruiteger aero aesthetics',
      github: 'https://github.com/aerosness/aerosness.github.io',
    },
    {
      title: 'Weather App',
      image: 'resources/img/project3.png',
      description: 'Mini React application with you can check the weather right now using OpenWeatherAPI, again with windows 7 aesthetic',
      github: 'https://github.com/aerosness/weather-app',
    },
    
  ];

  return (
    <div style={{ 
      padding: '20px', 
      backgroundImage: 'url(resources/img/projectsbg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <h1 style={{ marginBottom: '20px' }}>My Projects</h1>
      {projects.map((project, index) => (
        <div
        key={index}
        style={{
          position: 'relative',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '15px',
          overflow: 'hidden', // чтобы фон не выходил за границы
        }}
      >
        <div
          style={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(5px)',
            zIndex: 0,
          }}
        ></div>
      
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ margin: 0, flex: 1, fontSize: '18px' }}>{project.title}</h2>
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '200px',
                height: 'calc(200px * 9 / 16)', // 16:9
                objectFit: 'cover',
                marginLeft: '10px',
                borderRadius: '4px',
              }}
            />
          </div>
          <p style={{ margin: '0 0 5px 0' }}>{project.description}</p>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2196f3', textDecoration: 'none' }}
            >
              Github
            </a>
          )}
        </div>
      </div>
      ))}
    </div>
  );
};

export default ProjectsContent;