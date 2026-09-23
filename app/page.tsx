import Architecture from "@/components/Architecture";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Foundation from "@/components/Foundation";
import Hero from "@/components/Hero";
import SkillExample from "@/components/SkillExample";
import SkillInstall from "@/components/SkillInstall";
import Skills from "@/components/Skills";
import Workflow from "@/components/Workflow";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Skills />
      <SkillInstall />
      <Architecture />
      <Workflow />
      <SkillExample />
      <Foundation />
      <CTA />
    </>
  );
}