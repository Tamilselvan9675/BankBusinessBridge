import { useEffect, useRef } from "react";
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
    desc: "API-driven, scalable disbursement across many endpoints",
    color: "#EA4335",
  },
  {
    name: "High-TPS Performance",
    desc: "Handle peak transaction volumes with scalable architecture",
    color: "#AA00FF",
  },
  {
    name: "New Revenue Streams",
    desc: "Enable banks to launch innovative business lines",
    color: "#00B8D4",
  },
];

export default function BankBusinessBridge() {
  const blockRef = useRef(null);

 useEffect(() => {
  const totalSteps = cardDetails.length;

  cardDetails.forEach((card, index) => {
    const path = document.querySelector(`.icon-${index} .icon-path`);
    if (!path) return;

    
    path.style.stroke = "#A8A8A8"; 
    path.style.filter = "grayscale(100%) ";
    path.style.strokeWidth = "2.5";
    path.style.transition = "stroke 0.3s ease, filter 0.3s ease";
    
  });

  // Scroll animation setup
  gsap.to({}, {
    scrollTrigger: {
      trigger: blockRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      markers: false,
      onUpdate: (self) => {
        const progress = self.progress;

        cardDetails.forEach((card, index) => {
          const icon = document.querySelector(`.icon-${index}`);
          const path = icon?.querySelector(".icon-path");
          if (!path) return;

          const length = path.getTotalLength();
          const startProgress = index / totalSteps;
          const endProgress = (index + 1) / totalSteps;

          let localProgress = 0;
          if (progress <= startProgress) {
            localProgress = 0;
          } else if (progress >= endProgress) {
            localProgress = 1;
          } else {
            localProgress = (progress - startProgress) / (endProgress - startProgress);
          }

          const currentColor = gsap.utils.interpolate("#A8A8A8", card.color, localProgress);
          const glow = `drop-shadow(0px 0px 10px ${card.color})`;
          const filter = `grayscale(${100 - localProgress * 100}%) ${localProgress > 0.6 ? glow : ''}`;
          const dashOffset = length * (1 - localProgress);

          gsap.set(path, {
            stroke: currentColor,
            filter: filter,
            strokeDashoffset: dashOffset,
          });
        });
      },
    },
  });
}, []);


  return (
    <section ref={blockRef} className="bg-white relative h-[600vh] py-10 px-6 md:px-28">
      <div className="sticky top-0">
        <div className="text-center">
          <h2 className="text-black text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Bridging Banks and Businesses
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            At Minnal, we power enterprise-grade SaaS technology that transforms how banks and merchants handle payments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cardDetails.map((card, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`icon-${index} w-full h-40 mb-6`}>
                {IconPaths[index].svg}
              </div>
              <h3 className="text-sm font-semibold text-center mb-3 leading-snug text-gray-800">
                {card.name}
              </h3>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
