export function ContentExperiance() {
     const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const totalYear = currentYear - startYear + 1;
    const experiences = [
        {
            company: "Andela",
            role: "Technical Leadership Program",
            period: "Jan 2024 — Sep 2024",
            type: "Technical Team Lead • Web & Mobile",
            desc: [
                "Leading a team of 12+ engineers to deliver client projects across fintech and edtech sectors.",
                "Mentoring junior developers and standardizing CI/CD pipelines, improving deployment speed by 40%.",
                "Architecting scalable web & mobile solutions with React, React Native & Node.js."
            ],
            stack: ["React Native", "Node.js", "AWS", "Leadership","PR Review","Mentorship","Team colabolation"],
            color: "A"
        },
        {
            company: "Awesomity Lab",
            role: "Senior Full stack Web Developer",
            period: "July 2024 — Nov 2024",
            type: "Senior Web Developer",
            desc: [
                "Built 6+ cross-platform mobile applications for fintech and logistics clients using Flutter & React Native.",
                "Integrated REST APIs, Firebase, and payment gateways, handling 100k+ transactions.",
                "Collaborated with UI/UX designers to improve user retention by 30%."
            ],
            stack: ["RTK Query", "Next.js", "Nest.js", "REST API","Github Actions","CI/CD","PostgreSQL","GitLab"],
            color: "AL"
        },
        {
            company: "MPost Global",
            role: "Mobile App Developer",
            period: "Jul 2025 — Nov 2025",
            type: "Mobile Developer — Internship",
            desc: [
                "Developed and maintained mobile app for postal services reaching 20k+ users across East Africa — Exchange Anything, Anytime, Anywhere.",
                "Implemented offline-first synchronization and push notifications using Flutter & Firebase.",
                "Optimized app performance, reducing load time by 45% and crash rate by 60%."
            ],
            stack: ["React Native", "Firebase", "UI Kiten", "Context API"],
            color: "MP"
        },
        {
            company: "Alight Rwanda-Uganda",
            role: "Senior Software Developer",
            period: "Jan 2026 — Present",
            type: "Senior Software Developer",
            desc: [
                "Monitor and support the progress of beginner software developers through practical coding activities.",
                "Train beginner software developers in web development and programming fundamentals.",
                "Guide learners through practical projects and help them develop problem-solving and software development skills."
            ],
            stack: ["Figma Design","React", "Tailwind css", "PostgreSQL","Node.js","Mongo DB","AI Prompt"],
            color: "AR"
        }
    ];
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between gap-6 mb-16">
                <div>
                    <h1 className="text-3xl text-[#055a76] md:text-4xl font-bold">Experience</h1>
                    <p className="text-gray-400 mt-3 text-lg">{totalYear}+ Years Building Scalable Web & Mobile Applications</p>
                </div>
                <div className="max-w-md" >
                    <span className="bg-[#f5b400] text-black px-4 py-1.5 rounded-full text-sm font-bold">✨ {totalYear}+ Years Experience</span>
                    <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                        A timeline of my professional journey — leading teams, building products, and shipping solutions across web and mobile platforms.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative border-l border-[#f5b400]/40 ml-3 md:ml-6">
                {experiences.map((exp, i) => (
                    <div key={i} className="mb-12 ml-6 md:ml-12 relative">
                        <span className="absolute -left-[39px] md:-left-[61px] top-6 w-3 h-3 bg-[#f5b400] rounded-full"></span>

                        <div className="grid md:grid-cols-[320px_1fr] gap-6 bg-[#3a3847] p-6 rounded-xl border border-white/5 hover:border-[#f5b400]/30 transition">
                            {/* Left */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#2e2c3a] border border-[#f5b400]/40 flex items-center justify-center font-bold text-[#f5b400]">
                                    {exp.color}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#055a76] text-lg">{exp.company}</h3>
                                    <p className="text-[#f5b400] text-sm">{exp.role}</p>
                                    <span className="inline-block mt-2 text-xs border border-[#f5b400]/40 px-2 py-1 rounded-full text-[#f5b400]">{exp.period}</span>
                                </div>
                            </div>

                            {/* Right */}
                            <div>
                                <h4 className="text-[#f5b400] font-semibold mb-2">{exp.type}</h4>
                                <ul className="space-y-1.5 text-sm text-gray-300">
                                    {exp.desc.map((d, idx) => <li key={idx}>- {d}</li>)}
                                </ul>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {exp.stack.map(s => (
                                        <span key={s} className="text-xs bg-[#f5b400]/20 text-[#f5b400] px-2.5 py-1 rounded-full">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}