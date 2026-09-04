import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TechStack from "@/components/tech-stack";
import ProjectsGrid from "@/components/projects-grid";
import BeyondTheCode from "@/components/beyond-the-code";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Tech Stack Section */}
        <TechStack />

        {/* 3. Featured Projects Grid Section */}
        <ProjectsGrid />

        {/* 4. Beyond The Code Section */}
        <BeyondTheCode />

        {/* 5. Certificates & Credentials Section */}
        <Certificates />

        {/* 6. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
