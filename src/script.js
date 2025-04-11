const goonies = {
  init : function(){
    this.preLoading();
    this.audioDisplay();
    this.sideMap();
    this.scrolltoSection();
    this.homePage();
    this.gooniesPage();
    this.gooniesVideoObj.mickeyVideoDisplay();
    this.gooniesVideoObj.chunkVideoDisplay();
    this.gooniesVideoObj.dataVideoDisplay();
    this.gooniesVideoObj.mouthVideoDisplay();
    this.gooniesCoins();
    this.credits();
    this.theater();
    this.gallery();
    this.footer();
  },
  preLoading : function(){
    const tl = gsap.timeline();
    const percentage = document.querySelector(".preloader__percentage");
    let value = 0;
    let flag = false;
    let interval1 = setInterval(()=>{
      percentage.innerHTML = `${value}%`;
      value += 1;
      if(value > 80){
        clearInterval(interval1);
      }
    },30)
    let interval2 = setInterval(()=>{
      percentage.innerHTML = `${value}%`;
      value += 1;
      if(value > 90){
        clearInterval(interval2);
      }
    },100)
    let interval3 = setInterval(()=>{
      percentage.innerHTML = `${value}%`;
      value += 1;
      if(value > 100){
        clearInterval(interval3);
        flag = true;
      }
    },300);

    tl.to(".preloader__overlay", {
      top : 0,
      duration : 5,
      ease : "power2.out"
    });
    tl.to(".preloader__overlay", {
      top : "-100%",
      duration : 0.5,
    }, "<+6");
    tl.to(".preloader", {
      top : "-100%",
      duration : 0.5
    }, "<+0.3")
    setInterval(()=>{
        const tlDot = gsap.timeline();
        tlDot.to(".preloader__dot", {
          opacity : 0,
          duration : 0.5 
        });
        tlDot.to(".preloader__dot", {
          opacity : 1,
          duration : 0.5
        },"<0.5");
    },1500)
    
  },
  audioDisplay : function() {
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "grey",
      progressColor: "#2c2828",
      url: "./audio/DJSnake-MagentaRiddim.mp3",
      height: 25,
      responsive: true,
      barWidth: 2,
    });
  
    const btn = document.querySelector(".sound__play--btn");
    btn.addEventListener("click", () => {
      wavesurfer.playPause();
      if (btn.src.includes("pause.svg")) {
        btn.src = "./images/play.svg";
      } else {
        btn.src = "./images/pause.svg";
      }
    });
    wavesurfer.on("finish", () => {
      btn.src = "./images/pause.svg";
      wavesurfer.stop();
    });
  
    const openSound = document.querySelector(".music__sound");
    const tlsound = gsap.timeline({ paused: true });
    tlsound
      .to(".sound", {
        right: "5%",
        duration: 0.5,
      })
      .reverse();
  
    openSound.addEventListener("click", () => {
      if (tlsound.reversed()) {
        tlsound.play();
      } else {
        tlsound.reverse();
      }
    });
  },
  sideMap : function() {
    const sideMap = document.querySelector(".sidemap");
    const { width, height } = sideMap.getBoundingClientRect();
    sideMap.addEventListener("mousemove", (e) => {
      let offsetX = (e.x / width) * 80;
      offsetX = 40 - offsetX;
      let offsetY = (e.y / height) * 80;
      offsetY = 40 - offsetY;
      gsap.to(".sidemap__image", {
        translateX: `${offsetX}%`,
        translateY: `${offsetY}%`,
      });
    });
  
    const mapOpenIcon = document.querySelector(".openmap");
    const mapCrossIcon = document.querySelector(".sidemap__cross--button");
    const tl = gsap.timeline();
    tl.to(".sidemap", {
      left: 0,
    }).reverse();
    mapOpenIcon.addEventListener("click", () => {
      tl.play();
    });
    mapCrossIcon.addEventListener("click", () => {
      tl.reverse();
    });
  
    setInterval(() => {
      gsap.fromTo(
        ".mapcircle",
        {
          scale: 0.3,
          opacity: 1,
        },
        {
          scale: 1.4,
          opacity: 0,
          duration: 1,
        }
      );
    }, 3000);
  },
  scrolltoSection : function() {
    document.querySelectorAll(".header__navlinks a").forEach((navlink) => {
      navlink.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionId = navlink.getAttribute("href");
        if (sectionId === "#plot") {
          gsap.to(window, {
            scrollTo: {
              y: 250,
            },
            duration: 3,
            ease: "power2.inOut",
          });
        } else {
          const section = document.querySelector(`${sectionId}`);
          gsap.to(window, {
            scrollTo: section,
            duration: 3,
            ease: "power2.inOut",
          });
        }
      });
    });
    document
      .querySelector(".gallery__share--button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        const section = document.querySelector(".footer");
        gsap.to(window, {
          scrollTo: section,
          duration: 2,
          ease: "power2.inOut",
        });
      });
    document
      .querySelector(".footer__backtop--button")
      .addEventListener("click", (e) => {
        const section = document.querySelector(".footer");
        gsap.to(window, {
          scrollTo: { y: 0 },
          duration: 4,
          ease: "power2.inOut",
        });
      });
  },
  homePage : function() {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        scroller: "body",
        scrub: 2,
        pin: true,
      },
    });
    tl.to(".homepage__tree", {
      scale: 2,
    });
    tl.to(
      ".homepage__mountain",
      {
        scale: 1.1,
      },
      "<"
    );
  
    tl.to(
      ".homepage__main",
      {
        opacity: 0,
        duration: 0.2,
      },
      "<"
    );
    tl.to(
      ".homepage__mouse",
      {
        opacity: 0,
        duration: 1,
      },
      "<"
    );
    tl.fromTo(
      ".homepage__plot--title",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "<+0.5"
    );
    tl.to(".header__dot--ball", {
      opacity : 1
    }, "<");
    tl.fromTo(
      " .homepage__plot--desc",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "<"
    );
    tl.fromTo(
      ".homepage__plot--drawline",
      {
        width: 0,
      },
      {
        width: "14rem",
        ease: "power2.out",
      },
      ">"
    );
  
    tl.to(
      ".homepage",
      {
        backgroundColor: "#000",
        duration: 0.5,
      },
      "<"
    );
    tl.to(
      ".homepage__tree, .homepage__mountain",
      {
        opacity: 0,
        duration: 0.5,
      },
      "<"
    );
    tl.to(
      ".homepage__tree",
      {
        y: -100,
      },
      "<"
    );
    tl.to(
      ".homepage__plot--title, .homepage__plot--desc",
      {
        opacity: 0,
      },
      "<+0.5"
    );
  
    tl.to(
      ".homepage__plot--drawline",
      {
        top: "16rem",
        rotate: 90,
        width: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "<"
    );
    tl.to(".header__dot--ball", {
      left : "36%",
      duration : 1,
      ease : "power2.inOut"
    }, );
  },
  gooniesPage : function() {
    const mikey = document.querySelector(".gooniespage__mikey");
    mikey.addEventListener("mouseenter", () => {
      gsap.to(".gooniespage__mikey--image", {
        scale: 1.1,
        duration: 3,
        overwrite: true,
      });
      gsap.to(".overlay-one", {
        backgroundColor: "transparent",
      });
      gsap.to(".gooniespage__mikey--desc", {
        bottom: "5%",
        zIndex: 3,
      });
    });
    mikey.addEventListener("mouseleave", () => {
      gsap.to(".gooniespage__mikey--image", {
        scale: 1,
        duration: 1,
        overwrite: true,
      });
      gsap.to(".overlay-one", {
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2,
      });
      gsap.to(".header", {
        zIndex: 3,
      });
      gsap.to(".gooniespage__mikey--desc", {
        bottom: "-20%",
      });
    });
    const chunk = document.querySelector(".gooniespage__chunk");
    chunk.addEventListener("mouseenter", () => {
      gsap.to(".gooniespage__chunk--image", {
        scale: 1.1,
        duration: 3,
        overwrite: true,
      });
      gsap.to(".overlay-two", {
        backgroundColor: "transparent",
      });
      gsap.to(".gooniespage__chunk--desc", {
        bottom: "5%",
        zIndex: 3,
      });
    });
    chunk.addEventListener("mouseleave", () => {
      gsap.to(".gooniespage__chunk--image", {
        scale: 1,
        duration: 1,
        overwrite: true,
      });
      gsap.to(".overlay-two", {
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2,
      });
      gsap.to(".header", {
        zIndex: 3,
      });
      gsap.to(".gooniespage__chunk--desc", {
        bottom: "-20%",
      });
    });
    const data = document.querySelector(".gooniespage__data");
    data.addEventListener("mouseenter", () => {
      gsap.to(".gooniespage__data--image", {
        scale: 1.1,
        duration: 3,
        overwrite: true,
      });
      gsap.to(".overlay-three", {
        backgroundColor: "transparent",
      });
      gsap.to(".gooniespage__data--desc", {
        bottom: "5%",
        zIndex: 3,
      });
    });
    data.addEventListener("mouseleave", () => {
      gsap.to(".gooniespage__data--image", {
        scale: 1,
        duration: 1,
        overwrite: true,
      });
      gsap.to(".overlay-three", {
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2,
      });
      gsap.to(".header", {
        zIndex: 3,
      });
      gsap.to(".gooniespage__data--desc", {
        bottom: "-20%",
      });
    });
    const mouth = document.querySelector(".gooniespage__mouth");
    mouth.addEventListener("mouseenter", () => {
      gsap.to(".gooniespage__mouth--image", {
        scale: 1.1,
        duration: 3,
        overwrite: true,
      });
      gsap.to(".overlay-four", {
        backgroundColor: "transparent",
      });
      gsap.to(".gooniespage__mouth--desc", {
        bottom: "5%",
        zIndex: 3,
      });
    });
    mouth.addEventListener("mouseleave", () => {
      gsap.to(".gooniespage__mouth--image", {
        scale: 1,
        duration: 1,
        overwrite: true,
      });
      gsap.to(".overlay-four", {
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2,
      });
      gsap.to(".header", {
        zIndex: 3,
      });
      gsap.to(".gooniespage__mouth--desc", {
        bottom: "-20%",
      });
    });
  },
  gooniesVideoObj : {
    mickeyVideoDisplay: function () {
      const mikey = document.querySelector(".gooniespage__mikey");
      const video = document.querySelector(".mikey__bg--video");
      mikey.addEventListener("click", () => {
        video.play();
        gsap.fromTo(
          ".gooniespage__mikeyvideo",
          {
            left: "-75%",
          },
          {
            left: "0%",
            duration: 0.8,
            ease: "power1.out",
          }
        );
      });
  
      const closeVideo = document.querySelector(".mikey__closevideo");
      closeVideo.addEventListener("click", () => {
        video.pause();
        gsap.to(".gooniespage__mikeyvideo", {
          left: "-100%",
          duration: 0.8,
          ease: "power1.out",
        });
      });
    },
    chunkVideoDisplay: function () {
      const chunk = document.querySelector(".gooniespage__chunk");
      const video = document.querySelector(".chunk__bg--video");
      chunk.addEventListener("click", () => {
        video.play();
        gsap.fromTo(
          ".gooniespage__chunkvideo",
          {
            left: "-75%",
          },
          {
            left: "0%",
            duration: 0.8,
            ease: "power1.out",
          }
        );
      });
  
      const closeVideo = document.querySelector(".chunk__closevideo");
      closeVideo.addEventListener("click", () => {
        video.pause();
        gsap.to(".gooniespage__chunkvideo", {
          left: "-100%",
          duration: 0.8,
          ease: "power1.out",
        });
      });
    },
    dataVideoDisplay: function () {
      const data = document.querySelector(".gooniespage__data");
      const video = document.querySelector(".data__bg--video");
      data.addEventListener("click", () => {
        video.play();
        gsap.fromTo(
          ".gooniespage__datavideo",
          {
            left: "-75%",
          },
          {
            left: "0%",
            duration: 0.8,
            ease: "power1.out",
          }
        );
      });
      const closeVideo = document.querySelector(".data__closevideo");
      closeVideo.addEventListener("click", () => {
        video.pause();
        gsap.to(".gooniespage__datavideo", {
          left: "-100%",
          duration: 0.8,
          ease: "power1.out",
        });
      });
    },
    mouthVideoDisplay: function () {
      const mouth = document.querySelector(".gooniespage__mouth");
      const video = document.querySelector(".mouth__bg--video");
      mouth.addEventListener("click", () => {
        video.play();
        gsap.fromTo(
          ".gooniespage__mouthvideo",
          {
            left: "-75%",
          },
          {
            left: "0%",
            duration: 0.8,
            ease: "power1.out",
          }
        );
      });
  
      const closeVideo = document.querySelector(".mouth__closevideo");
      closeVideo.addEventListener("click", () => {
        video.pause();
        gsap.to(".gooniespage__mouthvideo", {
          left: "-100%",
          duration: 0.8,
          ease: "power1.out",
        });
      });
    },
  },
  gooniesCoins : function() { 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gooniescoins",
        scroller: "body",
        scrub: true,
      },
    });
    tl.to(".gooniescoins__title", {
      opacity: 1,
    });
    tl.to(
      ".gooniescoins__stone",
      {
        rotate: -1,
        opacity: 0.5,
        duration : 1
      },
      "<"
    );
    tl.to(
      ".gooniescoins__coin--topleft",
      {
        top: "-15%",
        opacity: 1,
        duration : 1
      },
      "<"
    );
    tl.to(
      ".gooniescoins__coin--bottomleft",
      {
        top: "78%",
        rotate: 360,
        opacity: 0.2,
        duration : 1
      },
      "<"
    );
    tl.to(
      ".gooniescoins__coin--topright",
      {
        top: "0%",
        rotate: 360,
        opacity: 1,
        duration : 1
      },
      "<"
    );
    tl.to(
      ".gooniescoins__coin--bottomright",
      {
        top: "80%",
        rotate: -360,
        opacity: 0.2,
        duration : 1
      },
      "<"
    );
    tl.to(".header__dot--ball", {
      left : "61.8%",
      ease : "power1.inOut"
    }, "<+0.8")
  
  },
  credits : function() {
    function shadeupEffect(parent, target) {
      const tl = gsap.timeline();
      tl.to(target, {
        y: "-100%",
        duration: 0.2,
        ease: "power3.in",
      });
      tl.set(target, { y: "100%", scale: 1 });
      tl.to(target, {
        y: "0%",
        duration: 0.1,
        ease: "power3.out",
      }).reverse();
      document.querySelector(parent).addEventListener("mouseenter", () => {
        tl.play();
      });
      document.querySelector(parent).addEventListener("mouseleave", () => {
        tl.reverse();
      });
    }
    shadeupEffect(".credits__date", ".credits__date--title");
    shadeupEffect(".credits__budget", ".credits__budget--title");
    shadeupEffect(".credits__boxoffice", ".credits__boxoffice--title");
    shadeupEffect(".music__sound", ".music__sound--icon");
    shadeupEffect(".gallery__cross--button", ".gallery__cross--button--p");
    shadeupEffect(".openmap", ".openmap__icon");
    shadeupEffect(".sidemap__cross--button", ".sidemap__cross--button--p");
  
    function scaleImage(parent, image, overlay) {
      const tl = gsap.timeline();
      tl.to(overlay, {
        backgroundColor: "transparent",
        duration: 2,
      });
      tl.to(
        image,
        {
          scale: 1.1,
          duration: 3,
        },
        "<"
      ).reverse();
      document.querySelector(parent).addEventListener("mouseenter", () => {
        tl.play();
      });
      document.querySelector(parent).addEventListener("mouseleave", () => {
        tl.reverse();
      });
    }
    scaleImage(".credits__story", ".credits__all--image", ".overlay--story");
    scaleImage(".credits__music", ".credits__all--imagemusic", ".overlay--music");
    scaleImage(".credits__production", ".empty__image", ".overlay--production");
  
    function rePosition() {
      const production = document.querySelector(".credits__production");
      const { left, width } = production.getBoundingClientRect();
      production.addEventListener("mousemove", (e) => {
        const offset = e.x - left;
        const move = (offset / width) * 50;
        gsap.to(".credits__production--image", {
          left: `calc(50% - ${move}%)`,
          ease: "power2.out",
          duration: 0.3,
        });
      });
      production.addEventListener("mouseleave", (e) => {
        gsap.to(".credits__production--image", {
          left: "25%",
          ease: "power2.out",
          duration: 0.3,
        });
      });
    }
    rePosition();
  },
  theater : function() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".theater",
        scroller: "body",
        scrub: true,
      },
    });
    tl.to(".theater__skull", {
      width: "45%",
      top: "0%",
    });
    tl.to(
      ".theater__audience",
      {
        bottom: "0%",
      },
      "<"
    );
    tl.to(".header__dot--ball", {
      left : "86.5%",
      duration :1,
      ease : "power2.inOut"
    })
  },
  gallery : function() {
    const tl = gsap.timeline();
    tl.to(".gallery__details", {
      opacity: 0,
    });
    tl.to(
      ".gallery__one",
      {
        scale: 1,
      },
      "<"
    );
    tl.to(
      ".gallery__two",
      {
        scale: 1,
        translateX: 0,
      },
      "<"
    );
    tl.to(
      ".gallery__three",
      {
        translateY: 0,
      },
      "<"
    );
    tl.to(
      ".gallery__four",
      {
        scale: 1,
        translateY: 0,
      },
      "<"
    );
    tl.to(
      ".gallery__five",
      {
        scale: 1,
        translateX: 0,
        translateY: 0,
      },
      "<"
    );
    tl.to(
      ".gallery__six",
      {
        scale: 1,
        translateX: 0,
      },
      "<"
    );
    tl.to(
      ".gallery__seven",
      {
        scale: 1,
      },
      "<"
    );
    tl.to(
      ".gallery__eight",
      {
        scale: 1,
      },
      "<"
    );
    tl.to(
      ".gallery__nine",
      {
        scale: 1,
      },
      "<"
    );
    tl.to(
      ".gallery__ten",
      {
        translateY: 0,
      },
      "<"
    );
    tl.to(
      ".gallery__eleven",
      {
        scale: 1,
      },
      "<"
    );
    tl.to(
      ".gallery__cross--button",
      {
        opacity: 1,
        display: "block",
      },
      "<+0.5"
    );
    tl.to(
      ".gallery__cross--button",
      {
        top: "80%",
        duration: 0.5,
        ease: "power2.out",
      },
      "<+0.5"
    ).reverse();
    document.querySelector(".gallery__details").addEventListener("click", () => {
      tl.play();
    });
    document
      .querySelector(".gallery__cross--button")
      .addEventListener("click", () => {
        tl.reverse();
      });
  },
  footer : function() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer",
        scroller: "body",
        scrub: true,
        end: "top 20%",
      },
    });
    tl.to(".footer__drawline", {
      width: 0,
      ease: "power2.in",
    });
    tl.to(
      ".footer__experience",
      {
        opacity: 1,
      },
      "<"
    );
    tl.to(
      ".footer__title",
      {
        top: "47%",
        ease: "power2.in",
      },
      "<"
    );
    tl.to(
      ".footer__backtop--button",
      {
        top: "57%",
        ease: "power2.in",
      },
      "<"
    );
  }
};
document.addEventListener("DOMContentLoaded", () => {
  goonies.init();
});