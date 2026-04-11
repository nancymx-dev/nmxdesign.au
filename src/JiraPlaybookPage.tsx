import { animated, useTrail } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './components/OptimizedImage';
import ClickableImage from './components/ClickableImage';
import { FiArrowLeft, FiArrowRight, FiDownload } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';

// PDF.js worker configuration (same as Resume page)
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Click-to-zoom image component is now shared

const JiraPlaybookPage = () => {
  const trail = useTrail(15, {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 100,
  });

  // PDF state (reusing approach from Resume page)
  const [numPages, setNumPages] = useState<null | number>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [, setPdfLoaded] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(800);

  useEffect(() => {
    const el = pdfContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setPageWidth(Math.min(800, Math.max(320, w - 24)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfLoaded(true);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => (prev < (numPages || 1) ? prev + 1 : prev));
  };

  const pdfPath = '/jiraplaybook/Jira_Playbook.pdf';

  return (
    <div className="min-h-screen bg-[#FFF6ED]/60 m-4 md:m-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <animated.div style={trail[0]} className="mb-8">
          <Link to="/case-studies" className="text-[#AAAADD] hover:underline font-bold text-lg">
            ← Back to Case Studies
          </Link>
        </animated.div>

        {/* Hero Section */}
        <animated.div style={trail[1]} className="mb-16">
          <h1 className="mb-6 font-pfMarlet text-6xl font-medium text-gray-700">
            Jira Playbook for Designers
          </h1>
          <OptimizedImage
            src="/jiraplaybook/DisplayimageJiraplaybook.jpg"
            alt="Jira Playbook case study header image"
            className="w-full rounded-xl shadow-lg mt-2 mb-8"
            aspectRatio="16/9"
            loading="eager"
            fit="cover"
          />

          <div className="grid text-lg md:grid-cols-2 md:grid-rows-2 gap-x-8 gap-y-1 items-start">
            {/* Row 1 */}
            <div className="md:col-start-1 md:row-start-1">
              <h3 className="font-bold text-[#AAAADD] mb-1">Challenge</h3>
              <p className="text-gray-700">
                The Atlassian design team needed a Jira design playbook to streamline internal
                design processes and create alignment across the team. Design teams lacked
                consistent practices for using Jira to track design work, leading to poor visibility
                and delayed projects.
              </p>
            </div>

            <div className="md:col-start-2 md:row-start-1">
              <h3 className="font-bold text-[#AAAADD] mb-1">Role & Timeline</h3>
              <p className="text-gray-700">
                <strong>Role:</strong> Product Manager & Product Designer
                <br />
                <strong>Timeline:</strong> 4 weeks
                <br />
                <strong>Skills:</strong> Design operations, Workflow management, Template creation
              </p>
            </div>

            {/* Row 2 */}
            <div className="md:col-start-1 md:row-start-2">
              <h3 className="font-bold text-[#AAAADD] mb-1">Target Users</h3>
              <div className="text-gray-700 space-y-0.5">
                <p>
                  <strong>Design Managers:</strong> Need portfolio visibility and resource
                  allocation
                </p>
                <p>
                  <strong>Designers:</strong> Seek consistent ways of working and impact tracking
                </p>
              </div>
            </div>

            <div className="md:col-start-2 md:row-start-2">
              <h3 className="font-bold text-[#AAAADD] mb-1">Impact</h3>
              <p className="text-gray-700">
                50+ designers at Atlassian now use this playbook. Increased work visibility,
                strategic planning capabilities, and reduced designer burnout through better
                resource management.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mt-6">
            <strong>Overview:</strong> Standardizing a predictable and consistent tool for Cloud
            Readiness design team resulting in increased visibility of design work, more
            strategically planned projects, and capabilities to identify dependencies throughout the
            project lifecycle.
          </p>
        </animated.div>

        {/* The Problem */}
        <animated.section style={trail[3]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            What Problem Are We Solving?
          </h2>
          <div className="space-y-8">
            <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#AAAADD] mb-4">Context</h4>
              <p className="text-gray-700 mb-4">
                Atlassian design teams don't use Jira consistently to track and maintain design
                project work. Some teams use Jira, some teams don't use Jira. We don't have a
                consistent practice on how design teams should collaborate with other
                cross-functional partners or among themselves.
              </p>
              <p className="text-gray-700">
                The design organization has initiatives to create a consistent practice for all
                designers. This includes <em>Velocity</em>, one of the five feedback loops for
                World-Class Design.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-[#AAAADD] mb-4">Core Problems</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • <strong>Poor visibility</strong> of design work across Atlassian
                  </li>
                  <li>
                    • <strong>Lack of strategic planning</strong> across multiple teams/projects
                  </li>
                  <li>
                    • <strong>No dependency identification</strong> throughout project lifecycle
                  </li>
                  <li>
                    • <strong>Unclear design capacity</strong> across current and future projects
                  </li>
                  <li>
                    • <strong>No clear value prop</strong> for using Jira Epics, story points and
                    sprints
                  </li>
                </ul>
              </div>

              <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-[#AAAADD] mb-4">Business Impact</h4>
                <p className="text-gray-700 mb-4">
                  This lack of visibility for managers and designers delays work, limits our ability
                  to communicate deadlines to cross-functional partners, and causes us to set
                  unrealistic expectations.
                </p>
                <p className="text-gray-700">
                  <strong>Risk:</strong> Designer burnout, overloaded teams, and delayed feature
                  rollouts to customers.
                </p>
              </div>
            </div>

            <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#AAAADD] mb-4">Who Are We Solving This For?</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Design Managers</h5>
                  <p className="text-gray-700 text-sm">
                    Need to make decisions about a managed portfolio of work and plan with greater
                    transparency.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Designers</h5>
                  <p className="text-gray-700 text-sm">
                    Seek more consistent ways of working and help track their impact narrative.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </animated.section>

        {/* Research & Discovery */}
        <animated.section style={trail[4]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            Research &amp; Discovery
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">Two-Stream Approach</h3>
              <p className="text-lg text-gray-700 mb-6">
                I separated work into two separate streams to tackle both immediate team needs and
                broader organizational goals.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-[#AAAADD] mb-3">Stream 1: Cloud Readiness Team</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Onboard Cloud Readiness team to Jira</li>
                    <li>• Create ready-to-use Jira boards for all teams</li>
                    <li>• Develop onboarding plan with Jira rituals</li>
                    <li>• Create Jira playbook guide for designers</li>
                    <li>• Implement checkpoint surveys for continuous improvement</li>
                  </ul>
                </div>
                <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-[#AAAADD] mb-3">Stream 2: Wider Organization</h4>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Create Jira best practices for all designers</li>
                    <li>• Test playbook with other teams for iteration</li>
                    <li>• Align with design hub integration</li>
                    <li>• Scale learnings across design organization</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">
                  Workshop with Stakeholders
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Created workshop with stakeholders to understand expectations and align on
                  approach.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-4">
                  <ClickableImage
                    src="/jiraplaybook/Workshopalignment.png"
                    alt="Workshop alignment"
                    caption="Workshop alignment activities and stakeholder feedback"
                  />
                  <ClickableImage
                    src="/jiraplaybook/alignmentmeeting1.png"
                    alt="Alignment meeting outcomes"
                    caption="Key decisions and next steps from alignment sessions"
                  />
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-gray-200 mt-6">
                  <h4 className="font-bold text-[#AAAADD] mb-4">Key Workshop Takeaways</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Decisions Made</h5>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>• Define differences between Jira vs Atlas usage</li>
                        <li>• Structure Epics by TAW phases (not milestones)</li>
                        <li>• Use 1-week planning cycles (not 2-week sprints)</li>
                        <li>• Add "Paused" status for deprioritized work</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Moving Forward</h5>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>• Create Jira template and best practices page</li>
                        <li>• Link to existing Unified Workflow initiatives</li>
                        <li>• Design Jira templates specifically for designers</li>
                        <li>• Include designers in template critique process</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </animated.section>

        {/* Survey Research */}
        <animated.section style={trail[5]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">Survey Research</h2>
          <div className="space-y-8">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                The purpose of this survey was to gather insights into how people are currently
                tracking and planning their work, as well as their experiences with Jira Planning.
                By understanding what users like and dislike about the tool, we aimed to identify
                best practices and potential areas for improvement.
              </p>

              <ClickableImage
                src="/jiraplaybook/surveyplanning.png"
                alt="Survey planning brainstorm"
                caption="Brainstorm session for survey design and key questions"
              />
            </div>

            <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#AAAADD] mb-4">Our Hypothesis</h4>
              <p className="text-gray-700 text-lg font-medium">
                Designers prefer to track work with a simple Jira configuration and need guidance on
                Jira best practices.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-6">Key Survey Findings</h3>
              <p className="text-lg text-gray-700 mb-6">
                <strong>15 Cloud Readiness designers</strong> responded to the survey, revealing
                three critical insights:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-[#AAAADD] mb-3">
                    1. Simplified Jira Best Practices
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    <strong>60% of designers</strong> said simplified Jira best practices were most
                    helpful for work tracking.
                  </p>
                  <blockquote className="text-gray-600 italic text-sm border-l-4 border-[#AAAADD] pl-3">
                    "I don't find Jira easy to use, what is meant to go in an Epic, Child issue,
                    etc. Would be great to have some structure to understand how we should properly
                    be adding our work."
                  </blockquote>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-[#AAAADD] mb-3">2. Weekly Updates</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    <strong>40% of designers</strong> track their work weekly, with another 40%
                    configuring tasks at the start of every week.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Work updates should align with existing weekly practices like Atlas tickets for
                    a more cohesive system.
                  </p>
                </div>

                <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-[#AAAADD] mb-3">3. Project-Based Epics</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    <strong>86.7% of designers</strong> mentioned that showing work visibility is
                    the biggest purpose for Jira planning.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Epic tickets should be structured around projects and milestones, breaking down
                    into TAW phase issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </animated.section>

        {/* Solutions & Workflow */}
        <animated.section style={trail[6]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            Solutions & Workflow Design
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-6">
                Multiple Options & Alignment
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Created multiple workflow options and gathered stakeholders for alignment on the
                best approach.
              </p>

              <ClickableImage
                src="/jiraplaybook/alignmentmeeting2.png"
                alt="Workflow options and decision matrix"
                caption="Comparing workflow options: Scrum vs Kanban approaches"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-[#AAAADD] mb-4">✅ Recommended Approach</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-gray-700">Workflow: Enhanced Kanban</h5>
                    <p className="text-gray-600 text-sm">
                      Added "Paused" status to handle deprioritized work and reduce TODO clutter
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700">Epic Structure: TAW Phases</h5>
                    <p className="text-gray-600 text-sm">
                      Organize work by Think, Align, Work phases rather than arbitrary milestones
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700">Planning Cycle: Weekly</h5>
                    <p className="text-gray-600 text-sm">
                      1-week planning cycles align with designer review patterns
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-[#AAAADD] mb-4">🔑 Key Recommendations</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>
                    • <strong>Simplified best practices:</strong> Focus on most important fields
                    (project name, deadlines, assignee, priority)
                  </li>
                  <li>
                    • <strong>Weekly rituals:</strong> Incorporate design rituals for tracking and
                    updating work
                  </li>
                  <li>
                    • <strong>Project visibility:</strong> Structure Epics around projects with
                    clear TAW phase breakdown
                  </li>
                  <li>
                    • <strong>Template creation:</strong> Provide ready-to-use Jira templates for
                    designers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </animated.section>

        {/* Impact & Reflection */}
        <animated.section style={trail[7]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            Impact & Reflection
          </h2>
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-[#AAAADD] mb-4">🎯 Key Outcomes</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • <strong>50+ designers</strong> in the team now use this playbook
                  </li>
                  <li>
                    • <strong>Increased work visibility</strong> across design teams and leadership
                  </li>
                  <li>
                    • <strong>Strategic planning capabilities</strong> for resource allocation
                  </li>
                  <li>
                    • <strong>Reduced designer burnout</strong> through better workload management
                  </li>
                  <li>
                    • <strong>Integration potential</strong> with design operations Unified Workflow
                    project
                  </li>
                </ul>
              </div>

              <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-[#AAAADD] mb-4">📚 Key Learnings</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • <strong>Stakeholder alignment:</strong> Critical for adoption and success
                  </li>
                  <li>
                    • <strong>Framework integration:</strong> Building on existing guidelines rather
                    than creating from scratch
                  </li>
                  <li>
                    • <strong>Playbook creation:</strong> Balancing comprehensive guidance with
                    simplicity
                  </li>
                  <li>
                    • <strong>Change management:</strong> Importance of involving end users in
                    design process
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#AAAADD] mb-4">Future Considerations</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Epic Synchronization</h5>
                  <p className="text-gray-600 text-sm">
                    Explore ways to connect Jira Epics across different projects to reduce
                    duplication of work tracking efforts.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Leadership Alignment</h5>
                  <p className="text-gray-600 text-sm">
                    Establish collective expectations between triads and design leadership for work
                    visibility and priority tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </animated.section>

        {/* Playbook Content */}
        <animated.section style={trail[8]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-6 font-pfMarlet">
            Complete Case Study
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            View the complete case study documentation with detailed workflows, templates, and
            implementation guidelines.
          </p>
          <div className="w-full max-w-4xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={pageNumber <= 1}
                  className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  <FiArrowLeft />
                </button>
                <span className="text-gray-700 font-medium">
                  Page {pageNumber} of {numPages || '--'}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= (numPages || 1)}
                  className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  <FiArrowRight />
                </button>
              </div>
              <a
                href={pdfPath}
                download="Jira_Playbook.pdf"
                className="inline-flex items-center gap-2 bg-[#AAAADD] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#9999CC] transition-colors duration-300"
              >
                <FiDownload />
                Download
              </a>
            </div>

            <div
              ref={pdfContainerRef}
              className="h-[700px] w-full border-2 border-gray-200 rounded-lg shadow-inner overflow-auto bg-white/60"
            >
              <Document
                file={pdfPath}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex justify-center items-center h-full p-8">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                    <style>{`.loader { border-top-color: #AAAADD; animation: spinner 1.5s linear infinite; } @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                  </div>
                }
                error={
                  <p className="p-4 text-center text-red-500">
                    Failed to load PDF.
                    <a
                      href={pdfPath}
                      download="Jira_Playbook.pdf"
                      className="font-bold underline hover:text-red-700 ml-1"
                    >
                      Download it here.
                    </a>
                  </p>
                }
                className="flex justify-center"
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                  width={pageWidth}
                />
              </Document>
            </div>
          </div>
        </animated.section>

        {/* Navigation */}
        <animated.div style={trail[12]} className="text-center pt-8 border-t border-gray-200">
          <Link to="/case-studies" className="text-[#AAAADD] hover:underline font-bold text-lg">
            ← Back to Case Studies
          </Link>
        </animated.div>
      </div>
    </div>
  );
};

export default JiraPlaybookPage;
