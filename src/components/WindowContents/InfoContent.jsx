import React from 'react';

const InfoContent = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div
          style={{
            position: 'relative',
            width: '220px',
            height: '220px',
            marginRight: '20px',
            borderRadius: '10%',
            overflow: 'hidden',
          }}
        >
          <img
            src="resources/img/avframe.png"
            alt="Avatar Frame"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 999,
              width: '100%',
              height: '100%',
            }}
          />
          <img
            src="resources/img/pfp.jpg"
            alt="Profile"
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '190px',
              height: '190px',
              objectFit: 'cover',
              borderRadius: '10%',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: "50px"}}>
          <h2 style={{ margin: '0 0 5px 0' }}>Semyon</h2>
          <p style={{ margin: '0 0 5px 0' }}>he/him</p>
          <p style={{ margin: '0 0 5px 0' }}>16 years</p>
          <p style={{ margin: '0 0 15px 0' }}>Last time online: 08 apr. 2004</p>
        </div>
      </div>
      
      <div
        style={{
          backgroundColor: '#f0f0f0',
          padding: '10px',
          borderRadius: '4px',
          marginTop: '20px',
          alignSelf: 'center',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <p style={{ margin: 0, textAlign: 'center' }}>
          Hi! This site is my portfolio/website styled like Windows 7.
          I'm an aspiring web developer with a passion for creating innovative and impactful applications❤️
        </p>
      </div>
      
      {/* TODO: надо чето подумать както насчет че можно вместо рекламы */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '25px',
        }}
      >
        <img
          src="resources/img/advert1.png"
          alt="Advert 1"
          style={{ maxWidth: '300px', maxHeight: '150px' }}
        />
        <img
          src="resources/img/advert2.png"
          alt="Advert 2"
          style={{ maxWidth: '300px', maxHeight: '150px' }}
        />
      </div>
    </div>
  );
};

export default InfoContent;
