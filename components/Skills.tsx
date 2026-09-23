import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import SkillCard from "@/components/SkillCard";
import {
  BoltIcon,
  BracketsIcon,
  ChipIcon,
  DropletIcon,
  LayoutIcon,
  ShieldIcon,
} from "@/components/icons";
import { container, eyebrow, section, sectionLead, sectionTitle } from "@/components/styles";

const skills = [
  {
    icon: <BoltIcon className="h-4.5 w-4.5" />,
    category: "Backend",
    name: "CodeIgniter 4",
    description: "Senior CI4 development, schema-aware and framework-savvy.",
    tags: ["PHP", "MVC", "REST APIs"],
  },
  {
    icon: <BracketsIcon className="h-4.5 w-4.5" />,
    category: "Backend",
    name: "Laravel",
    description: "Full Laravel application development from routes to refactors.",
    tags: ["PHP", "Eloquent", "Full-stack"],
  },
  {
    icon: <ShieldIcon className="h-4.5 w-4.5" />,
    category: "Security",
    name: "Security",
    description: "Defensive application security built into every change.",
    tags: ["OWASP", "Threat modeling", "Secure review"],
  },
  {
    icon: <LayoutIcon className="h-4.5 w-4.5" />,
    category: "Design",
    name: "UI/UX",
    description: "Interface and interaction design tuned to your product.",
    tags: ["Interfaces", "Design systems", "Accessibility"],
  },
  {
    icon: <DropletIcon className="h-4.5 w-4.5" />,
    category: "Mobile",
    name: "Flutter",
    description: "Cross-platform application development with a single codebase.",
    tags: ["Dart", "Widgets", "Multi-platform"],
  },
  {
    icon: <ChipIcon className="h-4.5 w-4.5" />,
    category: "Embedded",
    name: "ESP32",
    description: "Embedded and IoT development for connected hardware.",
    tags: ["C/C++", "Sensors", "BLE / Wi-Fi"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className={`${section} scroll-mt-20 border-t border-border/60`}>
      <div className={container}>
        <Reveal className="text-center">
          <p className={eyebrow}>Skills</p>
          <h2 className={`${sectionTitle} mx-auto max-w-2xl`}>
            Born knowing your stack.
          </h2>
          <p className={`${sectionLead} mx-auto`}>
            Jems AI ships with skills for the frameworks you already work in.
          </p>
        </Reveal>
        <div className="relative">
          <Parallax
            speed={-0.1}
            className="pointer-events-none absolute inset-x-0 top-6 -z-10 h-56 bg-accent/[0.04] blur-3xl"
          />
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {skills.map((skill, index) => (
              <Reveal key={skill.name} delay={index * 60} className="h-full">
                <SkillCard
                  icon={skill.icon}
                  category={skill.category}
                  name={skill.name}
                  description={skill.description}
                  tags={skill.tags}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}