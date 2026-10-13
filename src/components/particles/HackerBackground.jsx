import { useEffect } from "react";

export default function HackerBackground() {
  useEffect(() => {
    if (!window.particlesJS) return;

    console.log(window.particlesJS);

    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: 400,
          density: {
            enable: true,
            value_area: 1200,
          },
        },

        color: {
          value: "#8dfffd",
        },

        shape: {
          type: "circle",
        },

        opacity: {
          value: 0.5,
        },

        size: {
          value: 5,
          random: true,
        },

        line_linked: {
          enable: true,
          distance: 150,
          color: "#8dfffd",
          opacity: 0.25,
          width: 1,
        },

        move: {
          enable: true,
          speed: 1.5,
          out_mode: "out",
        },
      },

      interactivity: {
        detect_on: "window",

        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },

          onclick: {
            enable: true,
            mode: "push",
          },

          resize: true,
        },

        modes: {
          grab: {
            distance: 100,

            line_linked: {
              opacity: 1,
            },
          },

          push: {
            particles_nb: 10,
          },
        },
      },

      retina_detect: true,
    });
  }, []);

  return <div id="particles-js"></div>;
}
