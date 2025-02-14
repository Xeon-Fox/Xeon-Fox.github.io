// src/components/WindowContents/LinksContent.js
import React from 'react';

const LinksContent = () => {
  return (
    <div
      style={{
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Toolbar */}
      <div
        className="toolbar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '5px',
          backgroundColor: '#e8e8e8',
          borderBottom: '1px solid #ccc',
        }}
      >
        <div style={{ fontSize: '14px' }}>
          <u>F</u>ile <u>E</u>dit <u>V</u>iew <u>T</u>ools <u>H</u>elp
        </div>
        <div style={{ width: '20px', height: '20px' }}>
          <img
            style={{ width: '20px', height: '20px' }}
            src="resources/ico/search.ico"
            alt=""
          />
        </div>
      </div>

      {/* Content */}
      <div
        className="content"
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Sidebar */}
        <ul
          className="sidebar"
          style={{
            float: 'left',
            width: '200px',
            padding: 0,
            margin: 0,
            listStyle: 'none',
          }}
        >
          <li
            style={{
              padding: '5px',
              borderBottom: '1px solid #ddd',
            }}
          >
            Favorites
          </li>
          <li style={{ padding: '5px' }}>Desktop</li>
          <li style={{ padding: '5px' }}>Downloads</li>
          <li style={{ padding: '5px' }}>Recent Places</li>
          <li
            style={{
              padding: '5px',
              borderTop: '1px solid #ddd',
            }}
          >
            Libraries
          </li>
          <li style={{ padding: '5px' }}>Documents</li>
          <li style={{ padding: '5px' }}>Music</li>
          <li style={{ padding: '5px' }}>Pictures</li>
          <li style={{ padding: '5px' }}>Videos</li>
          <li
            style={{
              padding: '5px',
              borderTop: '1px solid #ddd',
            }}
          >
            Computer
          </li>
          <li style={{ padding: '5px' }}>Network</li>
        </ul>

        {/* Main Content */}
        <div
          className="main-content"
          style={{ marginLeft: '210px' }}
        >
          <p style={{ fontSize: '14px', color: '#555' }}>8 items</p>

          {/* Первая строка ссылок */}
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              alignContent: 'space-evenly',
              justifyContent: 'space-between',
              width: '640px',
            }}
          >
            <a target="_blank" href="https://github.com/aerosness">
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/githublogo.png"
                alt="Github"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                }}
              >
                Github
              </p>
            </a>

            <a target="_blank" href="https://www.youtube.com/@aerosness">
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/ytlogo.png"
                alt="YouTube"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                }}
              >
                Youtube
              </p>
            </a>

            <a
              target="_blank"
              href="https://open.spotify.com/user/5dwbjptmadzo73rzcvhnpxmnj"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/spotifylogo.png"
                alt="Spotify"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '1px',
                }}
              >
                Spotify
              </p>
            </a>

            <a
              target="_blank"
              href="https://steamcommunity.com/id/aerosness"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/steamlogo.png"
                alt="Steam"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '4px',
                }}
              >
                Steam
              </p>
            </a>

            <a
              target="_blank"
              href="https://www.tiktok.com/@aerosness"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/tiktoklogo.png"
                alt="TikTok"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '4px',
                }}
              >
                Tiktok
              </p>
            </a>

            <a
              target="_blank"
              href="https://ru.pinterest.com/aerosness/"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/pinlogo.png"
                alt="Pinterest"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                }}
              >
                Pinterest
              </p>
            </a>

            <a
              target="_blank"
              href="https://www.roblox.com/users/388269305/profile"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/robloxlogo.png"
                alt="Roblox"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '2px',
                }}
              >
                Roblox
              </p>
            </a>
          </div>

          {/* Вторая строка ссылок */}
          <div
            style={{
              marginTop: '50px',
              display: 'flex',
              alignContent: 'space-evenly',
              justifyContent: 'space-between',
              width: '640px',
            }}
          >
            <a target="_blank" href="https://x.com/aerosness">
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/xicon.png"
                alt="X (Twitter)"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '20px',
                }}
              >
                X
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksContent;
