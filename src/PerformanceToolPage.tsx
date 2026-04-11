import { animated, useTrail } from '@react-spring/web';
import { Link } from 'react-router-dom';
import OptimizedImage from './components/OptimizedImage';
import ClickableImage from './components/ClickableImage';

// Click-to-zoom image component is now shared

const PerformanceToolPage = () => {
  const trail = useTrail(15, {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 100,
  });

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
          <h1 className="mb-6 font-pfMarlet text-6xl font-medium text-gray-700">Apex Wrapped</h1>
          <OptimizedImage
            src="/perftooldesigns/header_image.jpeg"
            alt="Apex Wrapped case study header image"
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
                Build a performance review tool that streamlines internal processes and improves
                efficiency for all Atlassians.
              </p>
            </div>

            <div className="md:col-start-2 md:row-start-1">
              <h3 className="font-bold text-[#AAAADD] mb-1">Role & Timeline</h3>
              <p className="text-gray-700">
                <strong>Role:</strong> Driver, Owner, Product Manager &amp; Product Designer
                <br />
                <strong>Timeline:</strong> 3 day design sprint, 9 month engineering, 1 month design
              </p>
            </div>

            {/* Row 2 */}
            <div className="md:col-start-1 md:row-start-2">
              <h3 className="font-bold text-[#AAAADD] mb-1">Collaborators</h3>
              <div className="text-gray-700 space-y-0.5">
                <p>
                  <strong>Zeynep</strong> — Visual Design
                </p>
                <p>
                  <strong>Andreea</strong> — Interaction Design
                </p>
                <p>
                  <strong>Jesse &amp; Hamish</strong> — Engineering
                </p>
              </div>
            </div>

            <div className="md:col-start-2 md:row-start-2">
              <h3 className="font-bold text-[#AAAADD] mb-1">Impact</h3>
              <p className="text-gray-700">30%+ adoption in first cycle </p>
              <p className="text-gray-700">10,000 hours saved </p>
              <p className="text-gray-700">~10 hours saved per employee</p>
            </div>
          </div>

          <p className="text-gray-700 mt-6">
            <strong>Overview:</strong> We set out to build a performance review tool that would
            streamline internal processes and create efficiency for all Atlassians.
          </p>
        </animated.div>

        {/* Figma Embed moved to final section */}

        {/* The Problem */}
        <animated.section style={trail[3]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">The Problem</h2>
          <div className="space-y-8">
            {/* Main problem narrative */}
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Atlassian's biannual performance review consumed about 10 hours per employee each
                cycle. When review season approached, productivity dipped as people tried to balance
                their day job with a time‑intensive process.
              </p>
              <p className="text-lg text-gray-700 mb-0">
                Working at Atlassian, I noticed peers struggling to balance their work while
                ensuring their performance reviews were completed. This reduced productivity across
                the organisation — whether time spent on critical projects or reviewing work from
                the past quarter.
              </p>
            </div>

            {/* Quotes block */}
            <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#AAAADD] mb-4">What Atlassians were saying</h4>
              <div className="space-y-3 text-gray-700">
                <blockquote className="italic">
                  "Team, the self assessment for the entire org is at 35% and today is the last day.
                  As a team we have delivered a lot in the last 6 months, so please take a few hours
                  to capture everything that you have accomplished in your self assessment so we can
                  have a productive APEX cycle."
                </blockquote>
                <blockquote className="italic">
                  "Manager time in performance review hasn't been reduced. Managers are actively
                  moving dates forwards to their teams to allow adequate time to write performance
                  notes. One week to write 14+ notes isn't possible without late nights/weekend."
                </blockquote>
                <blockquote className="italic">
                  "Sorry, I'm focused on performance review."
                </blockquote>
                <blockquote className="italic">
                  "Here's the reality: 100% of my performance review is currently done on nights and
                  weekends because I have zero available time. I'm pretty sure critical projects are
                  a higher priority than performance review, so there's no pushing that work out."
                </blockquote>
              </div>
              <p className="text-gray-700 mt-4">
                There were no tools or process improvements to help with the performance review
                process.
              </p>
            </div>

            {/* Supporting image */}
            <ClickableImage
              src="/perftooldesigns/brainstormingInOffice.png"
              alt="Brainstorming session in the Atlassian office"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </animated.section>

        {/* Research & Discovery */}
        <animated.section style={trail[4]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            Research &amp; Discovery
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">Who is this for?</h3>
              <p className="text-lg text-gray-700 mb-6">
                To better understand Atlassians, I created a questionnaire. We narrowed down to two
                user groups — individual contributors and managers. The survey had 63 responses from
                various roles, levels and teams.
              </p>

              <h4 className="font-bold text-gray-700 mb-3">Our assumptions:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Finding and collecting information about your work is challenging</li>
                <li>• Writing up the self‑assessment is challenging</li>
                <li>• Not having enough time meeting up with your manager</li>
                <li>• Not knowing where to start, there's not enough guidance</li>
                <li>• Performance reviews impact your current work</li>
                <li>• Frequency of doing performance reviews</li>
                <li>• The time you've taken for performance review</li>
                <li>• Providing feedback</li>
              </ul>

              <h3 className="text-2xl font-bold text-[#AAAADD] mb-4 mt-8">Results</h3>
              <p className="text-gray-700 mb-4">
                Managers and individual contributors shared the same struggles. The root cause lies
                in how the performance review system is set up, but as I'm not part of that team I
                couldn't address some problems — for example, 81% said the time taken for
                performance review was an issue, 66.7% felt it impacted their current work, 58.7%
                were frustrated by the frequency of reviews, 23.8% cited a lack of time with their
                manager and 19% lacked guidance.
              </p>
              <p className="text-gray-700 mb-4">
                I focused on the two challenges we could meaningfully improve: 61.9% of respondents
                struggled to write their self‑assessment, and 46% struggled to find and collect
                information about their work.
              </p>
              <p className="text-gray-700">
                <strong>So what?</strong> Atlassians needed a tool that integrates with our apps to
                help them gather work evidence and guide them through writing their self‑assessment.
              </p>
            </div>
          </div>
        </animated.section>

        {/* Design Process */}
        <animated.section style={trail[5]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">Design Process</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">Diagramming the approach</h3>
              <p className="text-lg text-gray-700 mb-6">
                We diagrammed the information we needed from users and the final outcome they
                needed. Through this exercise we realised we couldn't define "relevance" objectively
                — filtering what mattered depended on each individual. There wasn't a baseline rule
                to categorise information, and people might want to collect multiple projects or
                links that others would deem irrelevant. We therefore iterated on our design plan.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <ClickableImage
                  src="/perftooldesigns/roughDiagrams.png"
                  alt="Rough diagrams on the performance review tool"
                  className="rounded-xl shadow-lg"
                />
                <ClickableImage
                  src="/perftooldesigns/updatedDiagram.png"
                  alt="Updated diagram on the performance review tool"
                  className="rounded-xl shadow-lg"
                />
              </div>

              <p className="text-gray-700 mt-6">
                Taking this information, I helped the team reimagine the scope into five parts: (1)
                Welcome screen, (2) Input screen, (3) Edit mode for projects, (4) Edit how the
                information is structured, and (5) Final Confluence page output.
              </p>
            </div>

            {/* Mock Ups */}
            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">Mock‑ups & early designs</h3>
              <p className="text-gray-700 mb-6">
                With the engineers, we explored how the tool might work. We realised the links found
                by our model needed to be grouped so people could choose what was relevant. The best
                version would require minimal user input — the model would read Confluence pages,
                group them by theme and surface relevancy.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <ClickableImage
                  src="/perftooldesigns/chooseWhichinformationIsimportant.png"
                  alt="Option to choose which information is most important"
                  caption="Option to choose what information is most important"
                />
                <ClickableImage
                  src="/perftooldesigns/generateMultipleProjectSumarries.png"
                  alt="Ability to generate multiple project summaries"
                  caption="Ability to generate multiple project summaries"
                />
                <ClickableImage
                  src="/perftooldesigns/reviewScreen.png"
                  alt="Review screen"
                  caption="Review screen - view all performance areas at once"
                />
              </div>
            </div>

            {/* Design Handover */}
            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">
                Design handover to engineers
              </h3>
              <p className="text-gray-700 mb-6">
                Our design team created a home screen to showcase all areas of the performance
                review side‑by‑side. (Some designs are omitted due to privacy.).
              </p>
              <ClickableImage
                src="/perftooldesigns/homePageDesignHandoff.png"
                alt="Design handoff home page"
                caption="Design handoff home page"
              />
            </div>
          </div>
        </animated.section>

        {/* Implementation & Launch */}
        <animated.section style={trail[6]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            Implementation &amp; Launch
          </h2>
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">
                  The official tool &amp; trade‑offs
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Our engineers implemented the designs separately and produced visuals that
                  differed from the Figma handoff because the designs weren't part of any existing
                  library. We evaluated how long it would take to match our designs and agreed the
                  primary goal was a fully functional tool rather than pixel‑perfect. To ship value
                  quickly, we let the engineers hardcode the front‑end.
                </p>
              </div>

              <div className="bg-white/60 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-[#AAAADD] mb-3">Results</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 30%+ adoption in the first cycle</li>
                  <li>• 10,000+ hours saved in H2</li>
                  <li>• Featured in a company‑wide design presentation</li>
                  <li>• Rollout supported by Design Operations</li>
                </ul>
              </div>
            </div>

            <ClickableImage
              src="/perftooldesigns/homePageFullyFunctional.png"
              alt="Home page of the fully functional tool"
              caption="Home page of the fully functional tool"
            />

            {/* Blitz testing */}
            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">
                Blitz testing before global release
              </h3>
              <p className="text-gray-700">
                With the next performance cycle approaching, we wanted to launch one week early. I
                led the design and engineering teams in a QA blitz: updating UI components, adding
                confirmation modals and refining UX writing to Atlassian standards. I also designed
                the tool's branding logo used across releases and loading screens.
              </p>
            </div>

            {/* Collaboration with Design Ops */}
            <div>
              <h3 className="text-2xl font-bold text-[#AAAADD] mb-4">
                Collaboration with Design Operations
              </h3>
              <p className="text-gray-700 mb-4">
                I partnered with our design operations team on the communication strategy. Together
                with our lead, we planned how and where to announce the feature. I wrote an official
                release blog post introducing the tool and providing a how‑to guide and answers to
                expected questions, and created a new space for related projects.
              </p>
              <p className="text-gray-700">
                We also set up a dedicated Slack help channel so our team could respond quickly to
                any issues paired with the announcement.
              </p>
            </div>
          </div>
          {/* Blog Reference */}

          <div className="text-center">
            <ClickableImage
              src="/perftooldesigns/blog.png"
              alt="Blog post announcing Apex Wrapped"
              className="rounded-xl shadow-lg mx-auto max-w-2xl"
            />
            <p className="text-gray-600 mt-4 italic">
              Official blog post announcing the tool to all Atlassians.
            </p>
          </div>
        </animated.section>

        {/* Post-Launch Evolution */}
        <animated.section style={trail[7]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            Post-Launch Evolution
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Because Apex wrapped was an internal tool, I redesigned the entire experience as{' '}
            <strong>Summed Up</strong>, adding the features Atlassians requested.
          </p>

          <div className="bg-white/60 p-6 rounded-xl border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-[#AAAADD] mb-4">New features added</h3>
            <ul className="grid md:grid-cols-3 gap-4 text-gray-700">
              <li>• Peer feedback</li>
              <li>• Overall summary</li>
              <li>• Easier navigation between pages</li>
              <li>• Enhanced user flows</li>
              <li>• Improved information architecture</li>
              <li>• More cohesive visual design system</li>
            </ul>
          </div>
        </animated.section>

        {/* Low-Fidelity Redesign */}
        <animated.section style={trail[8]} className="mb-16">
          <h3 className="text-3xl font-bold text-gray-700 mb-6 font-pfMarlet">
            Low‑Fidelity User Flows
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            I remapped the flows to address the core pain points, focusing on streamlined navigation
            and clearer hierarchy.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <ClickableImage
              src="/perftooldesigns/Low-fidelity performance tool /Summed Home and settings flow.png"
              alt="Low-fidelity home and settings flow"
              className="rounded-xl shadow-lg"
            />
            <ClickableImage
              src="/perftooldesigns/Low-fidelity performance tool /Summed summary generation flow.png"
              alt="Low-fidelity summary generation flow"
              className="rounded-xl shadow-lg"
            />
            <ClickableImage
              src="/perftooldesigns/Low-fidelity performance tool /Peer feedback generation flow.png"
              alt="Low-fidelity peer feedback generation flow"
              className="rounded-xl shadow-lg"
            />
            <ClickableImage
              src="/perftooldesigns/Low-fidelity performance tool /Summed Overall summary flow.png"
              alt="Low-fidelity overall summary flow"
              className="rounded-xl shadow-lg"
            />
          </div>
        </animated.section>

        {/* High-Fidelity Redesign */}
        <animated.section style={trail[9]} className="mb-16">
          <h3 className="text-3xl font-bold text-gray-700 mb-6 font-pfMarlet">
            High‑Fidelity Design System
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            The high-fidelity designs unify the visuals, clarify content hierarchy and improve
            interactions.
          </p>

          {/* Additional Figma embed placed above the existing one */}
          <div className="text-center mb-8">
            <img
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              width="100%"
              src="/perftooldesigns/DesignSystem.jpg"
              alt="Visual design system and components."
              className="rounded-xl shadow-lg max-w-4xl mx-auto"
            />
            <p className="text-gray-600 mt-4 italic">Visual design system and components.</p>
          </div>

          <div className="text-center">
            <iframe
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              width="100%"
              height="450"
              src="https://embed.figma.com/design/mvKf4FxeoRpzGIEP0cq1aO/Projects?node-id=169-44486&embed-host=share"
              allowFullScreen
              className="rounded-xl shadow-lg max-w-4xl mx-auto"
            />
            <p className="text-gray-600 mt-4 italic">High-fidelity screens of the design.</p>
          </div>
        </animated.section>

        {/* Impact & Reflection */}
        <animated.section style={trail[10]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            Impact &amp; Reflection
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/60 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-[#AAAADD] mb-4">Key Outcomes</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Shipped Atlassian's first AI‑powered internal tool</li>
                <li>• Saved 10,000+ hours across the organisation</li>
                <li>• 30%+ adoption in the first cycle</li>
                <li>• Led a cross‑functional team end to end</li>
                <li>• Established patterns for future AI tools</li>
              </ul>
            </div>

            <div className="bg-white/60 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-[#AAAADD] mb-4">Key Learnings</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Balance design vision with engineering constraints</li>
                <li>• Ground AI features in user research</li>
                <li>• Trade visual polish for functionality when needed</li>
                <li>• Iterate quickly based on feedback</li>
                <li>• Align early with partner teams</li>
              </ul>
            </div>
          </div>
        </animated.section>

        {/* Interactive Prototype (moved from top) */}
        <animated.section style={trail[11]} className="mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-8 font-pfMarlet">
            Interactive Prototype
          </h2>
          <div className="text-center">
            <iframe
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              width="100%"
              height="450"
              src="https://embed.figma.com/proto/mvKf4FxeoRpzGIEP0cq1aO/Projects?node-id=169-44487&page-id=1%3A2&starting-point-node-id=169%3A44487&embed-host=share"
              allowFullScreen
              className="rounded-xl shadow-lg max-w-4xl mx-auto"
            />
            <p className="text-gray-600 mt-4 italic">Explore the full end‑to‑end prototype.</p>
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

export default PerformanceToolPage;
