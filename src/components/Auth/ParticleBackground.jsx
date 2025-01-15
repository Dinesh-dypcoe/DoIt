import { useEffect } from 'react';

function ParticleBackground() {
  useEffect(() => {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#66bb6a'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.8,
          random: false
        },
        size: {
          value: 4,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#66bb6a',
          opacity: 0.6,
          width: 1.5
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        }
      },
      retina_detect: true
    });
  }, []);

  return <div id="particles-js" style={{ 
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  }} />;
}

export default ParticleBackground; 