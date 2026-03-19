import { Section } from "@/components/ui/section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ObfuscatedEmailText } from "@/components/obfuscated-email-text"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Celeste Abode's privacy policy outlining how we collect, use, and protect your personal information. Learn about our data protection practices and your privacy rights.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.celesteabode.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <Section className="pt-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl tracking-tight text-primary mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              How we collect, use, and protect your personal information
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
              <a href="#introduction" className="block text-muted-foreground hover:text-primary transition-colors">
                1. Introduction
              </a>
              <a href="#information-collection" className="block text-muted-foreground hover:text-primary transition-colors">
                2. Information We Collect
              </a>
              <a href="#information-use" className="block text-muted-foreground hover:text-primary transition-colors">
                3. How We Use Your Information
              </a>
              <a href="#information-sharing" className="block text-muted-foreground hover:text-primary transition-colors">
                4. Information Sharing and Disclosure
              </a>
              <a href="#data-security" className="block text-muted-foreground hover:text-primary transition-colors">
                5. Data Security
              </a>
              <a href="#your-rights" className="block text-muted-foreground hover:text-primary transition-colors">
                6. Your Rights and Choices
              </a>
              <a href="#cookies" className="block text-muted-foreground hover:text-primary transition-colors">
                7. Cookies and Tracking Technologies
              </a>
              <a href="#third-party" className="block text-muted-foreground hover:text-primary transition-colors">
                8. Third-Party Services
              </a>
              <a href="#children" className="block text-muted-foreground hover:text-primary transition-colors">
                9. Children's Privacy
              </a>
              <a href="#changes" className="block text-muted-foreground hover:text-primary transition-colors">
                10. Changes to This Policy
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                11. Contact Us
              </a>
            </nav>
          </div>
        </Section>

        {/* Content */}
        <Section>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <section id="introduction">
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Celeste Abode Private Limited ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
                </p>
                <p>
                  By using our services, you consent to the collection and use of your information as described in this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </div>
            </section>

            {/* Information Collection */}
            <section id="information-collection">
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                <p>
                  We may collect personal information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Property preferences and requirements</li>
                  <li>Financial information for investment purposes</li>
                  <li>Communication preferences and history</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-foreground mt-6">Automatically Collected Information</h3>
                <p>
                  When you visit our website, we automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website information</li>
                </ul>
              </div>
            </section>

            {/* Information Use */}
            <section id="information-use">
              <h2 className="text-2xl font-semibold text-primary mb-4">3. How We Use Your Information</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our real estate consulting services</li>
                  <li>Match you with suitable properties based on your preferences</li>
                  <li>Communicate with you about our services and updates</li>
                  <li>Process your requests and provide customer support</li>
                  <li>Analyze website usage and improve user experience</li>
                  <li>Comply with legal obligations and enforce our policies</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section id="information-sharing">
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With trusted service providers who assist in our operations</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section id="data-security">
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Data Security</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section id="your-rights">
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Your Rights and Choices</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies">
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Cookies and Tracking Technologies</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                </p>
              </div>
            </section>

            {/* Third Party */}
            <section id="third-party">
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Third-Party Services</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </div>
            </section>

            {/* Children */}
            <section id="children">
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Children's Privacy</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you believe we have collected such information, please contact us immediately.
                </p>
              </div>
            </section>

            {/* Changes */}
            <section id="changes">
              <h2 className="text-2xl font-semibold text-primary mb-4">10. Changes to This Policy</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section id="contact">
              <h2 className="text-2xl font-semibold text-primary mb-4">11. Contact Us</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
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


