import fs from "fs";
import path from "path";
import CertificatesCarousel, {
  CertificateItem,
} from "./certificates-carousel";

// Helper function to parse raw certificate filenames into clean metadata
function parseCertificateFilename(fileName: string): CertificateItem {
  const ext = path.extname(fileName).toLowerCase();
  const base = path.basename(fileName, ext);
  const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  const type: "image" | "pdf" = isImage ? "image" : "pdf";

  let title = base;
  let issuer = "Professional Credential";
  const lower = base.toLowerCase();

  // 1. Detect Issuer
  if (lower.includes("forage")) {
    if (lower.includes("tata")) {
      issuer = "Forage / TATA Group";
    } else {
      issuer = "Forage";
    }
  } else if (lower.includes("hackerrank") || lower.includes("hacker rank")) {
    issuer = "HackerRank";
  } else if (lower.includes("nptel")) {
    issuer = "NPTEL (IIT)";
  } else if (lower.includes("prepinsta")) {
    issuer = "PrepInsta Prime";
  } else if (lower.includes("juniper")) {
    issuer = "Juniper Networks";
  } else if (lower.includes("sgcnsp")) {
    issuer = "SGCNSP 2025 Conference";
  } else if (lower.includes("jenkin")) {
    issuer = "DevOps / CI-CD";
  } else if (lower.includes("devops")) {
    issuer = "DevOps Foundation";
  } else if (lower.includes("cm certificate")) {
    issuer = "Software Engineering";
  }

  // 2. Clean & Format Title
  if (/prepinsta cn/i.test(base)) {
    title = "Computer Networks";
  } else if (/prepinsta cpp/i.test(base)) {
    title = "C++ Programming Masterclass";
  } else if (/prepinsta html/i.test(base)) {
    title = "HTML5 & Web Development";
  } else if (/juniper/i.test(base)) {
    title = "Networking & Cloud Fundamentals";
  } else if (/jenkin/i.test(base)) {
    title = "Jenkins Continuous Integration";
  } else if (/devops/i.test(base)) {
    title = "DevOps Practices & Tooling";
  } else if (/cm certificate/i.test(base)) {
    title = "Configuration Management";
  } else if (/sgcnsp 2025/i.test(base)) {
    title = "SGCNSP 2025 Paper Presentation";
  } else if (/python_basic/i.test(base)) {
    title = "Python (Basic) Certification";
  } else if (/sql_basic/i.test(base)) {
    title = "SQL (Basic) Certification";
  } else if (/software_engineer_intern/i.test(base)) {
    title = "Software Engineer Intern Role";
  } else {
    // General cleanup for any future additions
    const clean = base
      .replace(/forage/gi, "")
      .replace(/tata/gi, "")
      .replace(/hackerrank|hacker rank/gi, "")
      .replace(/nptel/gi, "")
      .replace(/prepinsta/gi, "")
      .replace(/certificate\d*/gi, "")
      .replace(/cert\d*/gi, "")
      .replace(/[_\-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Fix casing for known tech acronyms
    const acronyms: Record<string, string> = {
      genai: "GenAI",
      ai: "AI",
      ml: "ML",
      sql: "SQL",
      cpp: "C++",
      html: "HTML",
      css: "CSS",
      iot: "IoT",
      sdr: "SDR",
      rf: "RF",
      cnn: "CNN",
    };

    title = clean
      .split(" ")
      .filter(Boolean)
      .map((word) => {
        const lowerWord = word.toLowerCase();
        if (acronyms[lowerWord]) return acronyms[lowerWord];
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");

    if (!title) {
      title = base.replace(/[_\-]+/g, " ").trim();
    }
  }

  return {
    id: fileName,
    fileName,
    fileUrl: `/certificates/${encodeURIComponent(fileName)}`,
    type,
    title,
    issuer,
  };
}

export default function Certificates() {
  const certsDir = path.join(process.cwd(), "public", "certificates");
  let certificates: CertificateItem[] = [];

  try {
    if (fs.existsSync(certsDir)) {
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
      const files = fs.readdirSync(certsDir);

      certificates = files
        .filter((file) => {
          if (file.startsWith(".")) return false;
          const ext = path.extname(file).toLowerCase();
          return allowedExtensions.includes(ext);
        })
        .map(parseCertificateFilename);

      const preferredOrder = [
        (cert: CertificateItem) => cert.issuer === "Juniper Networks",
        (cert: CertificateItem) =>
          cert.issuer === "HackerRank" && cert.title.includes("Software Engineer"),
        (cert: CertificateItem) =>
          cert.issuer === "HackerRank" && cert.title.includes("SQL"),
        (cert: CertificateItem) =>
          cert.issuer === "HackerRank" && cert.title.includes("Python"),
        (cert: CertificateItem) => cert.title.includes("SGCNSP 2025"),
        (cert: CertificateItem) =>
          cert.issuer === "Forage / TATA Group" && cert.title.includes("GenAI"),
        (cert: CertificateItem) =>
          cert.issuer === "Forage" && cert.title.includes("Software Engineering"),
        (cert: CertificateItem) => cert.issuer === "NPTEL (IIT)",
        (cert: CertificateItem) => cert.issuer === "DevOps Foundation",
        (cert: CertificateItem) => cert.title.includes("Jenkins"),
        (cert: CertificateItem) =>
          cert.issuer === "Software Engineering" &&
          cert.title === "Configuration Management",
      ];

      // Keep the existing order as the fallback for unlisted certificates.
      certificates.sort((a, b) => {
        if (a.type === "image" && b.type !== "image") return -1;
        if (b.type === "image" && a.type !== "image") return 1;
        return a.title.localeCompare(b.title);
      });

      certificates.sort((a, b) => {
        const aRank = preferredOrder.findIndex((matches) => matches(a));
        const bRank = preferredOrder.findIndex((matches) => matches(b));
        return (aRank === -1 ? preferredOrder.length : aRank) -
          (bRank === -1 ? preferredOrder.length : bRank);
      });
    }
  } catch (error) {
    console.error("Error reading certificates directory:", error);
  }

  if (certificates.length === 0) {
    return null;
  }

  return (
    <section
      id="certificates"
      className="section-rule py-16 md:py-24 border-t border-border/40"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section Heading — consistent typography system */}
        <div className="mb-10 md:mb-14">
          <h2 className="h-section text-[clamp(1.75rem,4vw,3rem)]">
            Certifications &amp; Credentials
          </h2>
          <p className="josefin-sans-1 text-subheading mt-2.5 max-w-xl">
            Verified certifications, academic credentials, and technical achievements.
          </p>
        </div>

        {/* Carousel Component */}
        <CertificatesCarousel certificates={certificates} />
      </div>
    </section>
  );
}
