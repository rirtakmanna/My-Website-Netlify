import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import lottie from "lottie-web-light";
import AOS from "aos";

gsap.registerPlugin(TextPlugin);

AOS.init({
  offset: 200,
  duration: 800,
  ease: "ease",
  mirror: false,
  anchorPlacement: "top-bottom",
});

const load = document.querySelector(".load_anim");
const preloader = document.querySelector(".preloder");

lottie.loadAnimation({
  container: load,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "/animation/preLoad.json",
});

window.addEventListener("load", () => {
  preloader.classList.add("preloder__finish");

  if (preloader.classList.contains("preloder__finish")) {
    gsap.fromTo(
      ".transition",
      { width: "100%" },
      { duration: 0.9, width: "0%", ease: "power2.inOut" }
    );

    const anim = document.getElementsByClassName("anim");

    Array.prototype.forEach.call(anim, (animation) => {
      let move = lottie.loadAnimation({
        container: animation,
        path: `/animation/${animation.dataset.file}.json`,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });

      animation.addEventListener("mouseenter", () => {
        move.goToAndStop(250, true);
      });
      animation.addEventListener("mouseleave", () => {
        move.goToAndPlay(50, true);
      });
    });

    const icon = document.getElementsByClassName("icon");

    Array.prototype.forEach.call(icon, (bm) => {
      let anim = lottie.loadAnimation({
        container: bm,
        path: `/icon/icon${bm.dataset.file}.json`,
        renderer: "svg",
        loop: false,
        autoplay: false,
      });

      const papa = bm.parentNode.parentNode;

      papa.addEventListener("mouseenter", () => {
        anim.setDirection(1);
        anim.play();
      });

      papa.addEventListener("mouseleave", () => {
        anim.setDirection(-1);
        anim.play();
      });
    });

    const cursor = document.querySelector(".cursor");
    const dark = document.querySelectorAll(".cursor__dark");
    const expand = document.querySelectorAll(".expand");
    let tl = gsap.timeline();
    let tl2 = gsap.timeline();

    if (window.matchMedia("(any-pointer:fine)").matches) {
      document.getElementsByTagName("body")[0].style.cursor = "none";

      tl.fromTo(
        ".cursor",
        { scale: "1", x: "-40%", y: "-40%" },
        {
          scale: "1.5",
          yoyo: true,
          duration: "1",
          repeat: "-1",
          x: "-40%",
          y: "-40%",
          ease: "sine.inOut",
          transformOrigin: "center center",
        }
      );

      tl2.fromTo(
        ".cursor",
        { scale: "2", x: "-40%", y: "-40%" },
        {
          scale: "2.5",
          yoyo: true,
          duration: "1",
          repeat: "-1",
          x: "-40%",
          y: "-40%",
          ease: "sine.inOut",
          transformOrigin: "center center",
        }
      );
      tl2.pause();

      // Add mouse move cursor
      window.addEventListener("mousemove", (e) => {
        cursor.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
      });

      // add cursor for link
      Array.prototype.forEach.call(expand, (link) => {
        link.addEventListener("mouseover", () => {
          tl.pause();
          tl2.play();
          cursor.classList.add("cursor__expand");
        });

        // remove cursor link class
        link.addEventListener("mouseleave", () => {
          tl.play();
          tl2.pause();
          cursor.classList.remove("cursor__expand");
        });
      });

      // for dark background
      Array.prototype.forEach.call(dark, (link) => {
        link.addEventListener("mouseover", () => {
          cursor.classList.add("cursor__darkAdd");
          if (cursor.classList.contains("cursor__expand")) {
            cursor.classList.remove("cursor__darkAdd");
          }
        });
        link.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor__darkAdd");
        });
      });

      // animation cursor
    } else {
      cursor.style.display = "none";
    }

    // gsap.fromTo(
    //   ".transition",
    //   { width: "100%" },
    //   { duration: 0.9, width: "0%", ease: "power2.inOut" }
    // );

    if (document.querySelector("body").classList.contains("home")) {
      let homeAnim = gsap.timeline();

      homeAnim
        .fromTo(
          ".header-home__image",
          { scale: "0" },
          { duration: 0.8, scale: "1", ease: "power2.inOut", delay: ".5" }
        )
        .to(".index1", {
          duration: 0.25,
          text: "Hello folks!!, I’m",
          ease: "power2.out",
        })
        .to(".index2", {
          duration: 0.1,
          text: " Rirtak",
          ease: "power2.out",
        })
        .to(".index3", {
          duration: 0.01,
          text: ",",
          ease: "power2.out",
        })
        .to(".index4", {
          duration: 0.4,
          text: "A web designer and Front-end developer.",
          ease: "power2.out",
        })
        .to(".index5", {
          duration: 0.2,
          text: "Not any average",
          ease: "power2.out",
        })
        .to(".index6", {
          duration: 0.08,
          text: " web ",
          ease: "power2.out",
        })
        .to(".index7", {
          duration: 0.1,
          text: "developer",
          ease: "power2.out",
        })
        .to(".index8", {
          duration: 0.1,
          text: "I code",
          ease: "power2.out",
        })
        .to(".index9", {
          duration: 0.15,
          text: " imagination",
          ease: "power2.out",
        })
        .to(".index10", {
          duration: 0.4,
          text: "With my skills, let's design the digital world in a new way.",
          ease: "power2.out",
        })
        .fromTo(
          ".header-home__link",
          { opacity: "0", y: "50" },
          {
            duration: 0.4,
            opacity: "1",
            y: "0",
          }
        )
        .fromTo("nav", { duration: 0.8, y: "-100" }, { y: "0" });

      homeAnim.eventCallback("onComplete", () => {
        homeAnim.clear();
      });
    }

    expand.forEach((e) => {
      e.onclick = (e) => {
        e.preventDefault();
        setTimeout(function () {
          if (!preloader.classList.contains("preloder__finish")) {
            console.log("Navigating....");
            if (!e.srcElement.parentElement.parentElement.parentElement.href) {
              if (!e.srcElement.parentElement.parentElement.href) {
                if (!e.srcElement.parentElement.href) {
                  window.location = e.srcElement.href;
                } else {
                  window.location = e.srcElement.parentElement.href;
                }
              } else {
                window.location = e.srcElement.parentElement.parentElement.href;
              }
            } else {
              window.location =
                e.srcElement.parentElement.parentElement.parentElement.href;
            }
          } else {
            console.log("whoops", e.srcElement.parentElement.href);
          }
        }, 1000);

        gsap.fromTo(
          ".transition",
          { width: "0%" },
          {
            duration: 0.9,
            width: "100%",
            ease: "power2.inOut",
            onComplete: function () {
              preloader.classList.remove("preloder__finish");
            },
          }
        );
      };
    });
  }
});
