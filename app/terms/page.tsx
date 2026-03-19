import { Section } from "@/components/ui/section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ObfuscatedEmailText } from "@/components/obfuscated-email-text"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing your use of Celeste Abode's real estate services. Read our terms of service, user obligations, and service agreements.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.celesteabode.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <Section className="pt-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl tracking-tight text-primary mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The terms and conditions governing your use of our services
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </Section>

        {/* Table of Contents */}
        <Section className="bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-primary mb-6">Table of Contents</h2>
            <nav className="space-y-2">
              <a href="#acceptance" className="block text-muted-foreground hover:text-primary transition-colors">
                1. Acceptance of Terms
              </a>
              <a href="#services" className="block text-muted-foreground hover:text-primary transition-colors">
                2. Description of Services
              </a>
              <a href="#eligibility" className="block text-muted-foreground hover:text-primary transition-colors">
                3. Eligibility and Registration
              </a>
              <a href="#user-obligations" className="block text-muted-foreground hover:text-primary transition-colors">
                4. User Obligations and Conduct
              </a>
              <a href="#intellectual-property" className="block text-muted-foreground hover:text-primary transition-colors">
                5. Intellectual Property Rights
              </a>
              <a href="#privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                6. Privacy and Data Protection
              </a>
              <a href="#disclaimers" className="block text-muted-foreground hover:text-primary transition-colors">
                7. Disclaimers and Limitations
              </a>
              <a href="#liability" className="block text-muted-foreground hover:text-primary transition-colors">
                8. Limitation of Liability
              </a>
              <a href="#termination" className="block text-muted-foreground hover:text-primary transition-colors">
                9. Termination
              </a>
              <a href="#governing-law" className="block text-muted-foreground hover:text-primary transition-colors">
                10. Governing Law and Disputes
              </a>
              <a href="#changes" className="block text-muted-foreground hover:text-primary transition-colors">
                11. Changes to Terms
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                12. Contact Information
              </a>
            </nav>
          </div>
        </Section>

        {/* Content */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Acceptance */}
            <section id="acceptance">
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  By accessing and using the services provided by Celeste Abode Private Limited ("we," "our," or "us"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you and Celeste Abode regarding your use of our real estate consulting services, website, and related offerings.
                </p>
              </div>
            </section>

            {/* Services */}
            <section id="services">
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Description of Services</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Celeste Abode provides premium real estate consulting services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Property selection and curation</li>
                  <li>Investment advisory and market analysis</li>
                  <li>NRI and global client services</li>
                  <li>End-to-end consulting support</li>
                  <li>Lifestyle mapping and personalization</li>
                  <li>Exclusive access to premium projects</li>
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
                </p>
              </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility">
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Eligibility and Registration</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  To use our services, you must:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into binding agreements</li>
                  <li>Provide accurate and complete information</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
                <p>
                  You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
              </div>
            </section>

            {/* User Obligations */}
            <section id="user-obligations">
              <h2 className="text-2xl font-semibold text-primary mb-4">4. User Obligations and Conduct</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our services only for lawful purposes</li>
                  <li>Provide accurate and truthful information</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Not engage in any fraudulent or deceptive practices</li>
                  <li>Not interfere with the proper functioning of our services</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
                <p>
                  We reserve the right to terminate or suspend your access to our services for violations of these obligations.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual-property">
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Intellectual Property Rights</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  All content, features, and functionality of our services, including but not limited to text, graphics, logos, images, and software, are owned by Celeste Abode or its licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative works of our content without our express written consent.
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section id="privacy">
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Privacy and Data Protection</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p>
                  By using our services, you consent to the collection and use of your information as described in our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Disclaimers */}
            <section id="disclaimers">
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Disclaimers and Limitations</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The accuracy or completeness of property information</li>
                  <li>The availability of specific properties</li>
                  <li>Investment returns or property appreciation</li>
                  <li>Uninterrupted or error-free service</li>
                </ul>
                <p>
                  We are not responsible for decisions made based on our recommendations or market analysis.
                </p>
              </div>
            </section>

            {/* Liability */}
            <section id="liability">
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  To the maximum extent permitted by law, Celeste Abode shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
                </p>
                <p>
                  Our total liability to you for any claims arising from the use of our services shall not exceed the amount you paid to us for the specific service in question.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section id="termination">
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Termination</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We may terminate or suspend your access to our services at any time, with or without cause, with or without notice. You may terminate your use of our services at any time.
                </p>
                <p>
                  Upon termination, your right to use our services will cease immediately, and we may delete your account and related information.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section id="governing-law">
              <h2 className="text-2xl font-semibold text-primary mb-4">10. Governing Law and Disputes</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Noida, India.
                </p>
                <p>
                  We encourage you to contact us first to resolve any disputes amicably before pursuing legal action.
                </p>
              </div>
            </section>

            {/* Changes */}
            <section id="changes">
              <h2 className="text-2xl font-semibold text-primary mb-4">11. Changes to Terms</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and updating the "Last updated" date.
                </p>
                <p>
                  Your continued use of our services after such changes constitutes acceptance of the updated Terms.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section id="contact">
              <h2 className="text-2xl font-semibold text-primary mb-4">12. Contact Information</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p><strong>Email:</strong> <ObfuscatedEmailText /></p>
                  <p><strong>Phone:</strong> +91 9910906306</p>
                  <p><strong>Address:</strong> Celeste Abode, 615, 6th Floor, Galaxy Blue Sapphire Plaza, Sector 4, Greater Noida (West), U.P - 201309.</p>
                </div>
              </div>
            </section>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}


