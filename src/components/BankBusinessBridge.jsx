import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconPaths } from "./ColoredIcons";

gsap.registerPlugin(ScrollTrigger);

const cardDetails = [
  {
    name: "Extensive Merchant Network Access",
    desc: "Connect banks to digitally-enabled merchant ecosystems",
    color: "#4285F4",
  },
  {
    name: "Enterprise SaaS Technology",
    desc: "Robust infrastructure powering reliable payment solutions",
    color: "#34A853",
  },
  {
    name: "Simplified Collections & Automated Disbursements",
    desc: "Real-time payment processing with streamlined payouts",
    color: "#FBBC05",
  },
  {
    name: "One-To-Many Automated Disbursements",
    desc: "Real-time payment processing with streamlined and API driven payouts",
    color: "#EA4335",
  },
  {
    name: "High-TPS Performance",
    desc: "Handle peak transaction volumes with scalable architecture",
    color: "#AA00FF",
  },
  {
    name: "New Revenue Streams",
    desc: "Enable banks to launch innovative business lines, expand digital portfolios, and enjoy new revenue streams",
    color: "#00B8D4",
  },
];

const itemFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function BankBusinessBridge() {
  const blockRef = useRef(null);
  const animationControl = useAnimation();

  // Fade in cards when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationControl.start("visible");
        }
      },
      { threshold: 0.3 }
    );
    const refCurrent = blockRef.current;
    if (refCurrent) observer.observe(refCurrent);
    return () => observer.disconnect();
  }, [animationControl]);

  // SVG Animation on Scroll
  useEffect(() => {
    const pathsPerIcon = [];

    cardDetails.forEach((card, index) => {
      const paths = document.querySelectorAll(`.icon-${index} path`);
      const iconPaths = [];

      paths.forEach((path) => {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          stroke: "#A8A8A8",
          fill: "none",
          strokeWidth: 2.3,
          filter: "drop-shadow(0 0 20px ${card.color}) hue-rotate(360deg)"
        });

        iconPaths.push({ path, length, color: card.color });
      });

      pathsPerIcon.push(iconPaths);
    });

    const totalSteps = 7; // 7 scroll steps for 6 icons

    gsap.to({}, {
      scrollTrigger: {
        trigger: blockRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const scrollStep = Math.floor(self.progress * totalSteps);

          for (let i = 0; i < cardDetails.length; i++) {
            const iconPaths = pathsPerIcon[i];
            const shouldBeActive = i < scrollStep;

            // Toggle grayscale class on parent
            const iconContainer = document.querySelector(`.icon-${i}`);
            if (iconContainer) {
              iconContainer.classList.toggle("grayscale", !shouldBeActive);
            }

            iconPaths.forEach(({ path, length, color }) => {
              gsap.to(path, {
  strokeDashoffset: shouldBeActive ? 0 : length,
  stroke: shouldBeActive ? color : "#A8A8A8",
  strokeWidth: 2.3,
  filter: shouldBeActive
    ? `drop-shadow(0 0 20px ${color}) hue-rotate(360deg)`
    : "none",
  duration: 1.5,
  ease: "power2.out",
});
            });
          }
        },
      },
    });
  }, []);

  return (
    <section ref={blockRef} className="bg-white py-20 px-6 md:px-28">
      <div className="text-center mb-20">
        <h2 className="text-black text-4xl md:text-5xl font-bold mb-5 leading-tight">
          Bridging Banks and Businesses
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          At Minnal, we power merchants acquiring enterprise-grade SaaS technology that transforms how banks and merchants handle payments. Our AI-driven platform delivers high-TPS solutions for seamless payins and payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {cardDetails.map((card, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            variants={itemFade}
            initial="hidden"
            animate={animationControl}
            custom={index}
          >
            <div
              className={`icon-${index} w-full h-40 mb-6 grayscale transition-all duration-500`}
            >
              {IconPaths[index].svg}
            </div>
            <h3 className="text-sm font-semibold text-center mb-3 leading-snug text-gray-800">
              {card.name}
            </h3>
            <p className="text-gray-600 text-sm text-center leading-relaxed">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
