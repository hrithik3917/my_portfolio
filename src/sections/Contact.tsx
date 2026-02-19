import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Linkedin, Github, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // FormSubmit will handle the actual submission
    // The page will redirect to FormSubmit's thank you page, then back
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hritik.dalvi1803@gmail.com', href: 'mailto:hritik.dalvi1803@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Lexington, KY', href: null },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/hritikdalvi', href: 'https://linkedin.com/in/hritikdalvi' },
    { icon: Github, label: 'GitHub', value: 'github.com/hritikdalvi', href: 'https://github.com/hrithik3917' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 px-4 md:px-8"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-section font-bold mb-4 text-white">
            Let's Create Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Have a project in mind? Let's talk. I'm always open to discussing new opportunities 
            and interesting collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            <div className="card-glass p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-cyan/10">
                      <item.icon className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white hover:text-cyan transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 p-4 rounded-lg glass">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-matrix" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-matrix animate-ping" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Available for opportunities</p>
                <p className="text-xs text-white/50">Open to full-time roles & contracts</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="card-glass p-6 md:p-8 flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-matrix/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-matrix" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60">Thank you for reaching out. I'll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form
                ref={formRef}
                action="https://formsubmit.co/hritik.dalvi1803@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="card-glass p-6 md:p-8 relative overflow-hidden"
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New message from Portfolio!" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
                <input type="hidden" name="_captcha" value="false" />

                <h3 className="text-lg font-semibold text-white mb-6">Send a Message</h3>
                
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="input-glow"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="input-glow"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="input-glow resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan/10 to-transparent" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
