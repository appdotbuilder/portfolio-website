import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
    project_url: string | null;
    github_url: string | null;
    technologies: string[];
}

interface Props {
    projects: Project[];
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

export default function Welcome({ projects, flash }: Props) {
    const [activeSection, setActiveSection] = useState('home');
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('contact.store'), contactForm, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setContactForm({ name: '', email: '', subject: '', message: '' });
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setContactForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <Head title="Portfolio" />
            
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                Portfolio ✨
                            </h1>
                            <div className="hidden md:flex space-x-8">
                                {['home', 'about', 'projects', 'contact'].map((section) => (
                                    <button
                                        key={section}
                                        onClick={() => scrollToSection(section)}
                                        className={`capitalize transition-all duration-300 hover:text-yellow-400 ${
                                            activeSection === section ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                    >
                                        {section}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"></div>
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                                Creative Developer
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                                Crafting exceptional digital experiences with modern technologies and elegant design
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    onClick={() => scrollToSection('projects')}
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
                                >
                                    View My Work 🚀
                                </Button>
                                <Button
                                    onClick={() => scrollToSection('contact')}
                                    variant="outline"
                                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 rounded-lg transform transition-all duration-300 hover:scale-105"
                                >
                                    Get In Touch 💬
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <button onClick={() => scrollToSection('about')} className="text-yellow-400 hover:text-yellow-300 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 bg-gradient-to-r from-gray-900 to-black">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                About Me 👋
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="text-left">
                                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                        I'm a passionate full-stack developer with a love for creating beautiful, functional, and user-friendly applications. 
                                        With expertise in modern web technologies, I bring ideas to life through clean code and thoughtful design.
                                    </p>
                                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                        My journey in web development spans several years, during which I've worked on diverse projects ranging from 
                                        e-commerce platforms to complex web applications, always focusing on performance, scalability, and user experience.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['React', 'Laravel', 'TypeScript', 'Node.js', 'Vue.js', 'MySQL', 'Tailwind CSS', 'Git'].map((skill, index) => (
                                            <div key={index} className="bg-gray-800/50 rounded-lg p-3 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                                                <span className="text-yellow-400 font-medium">{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="w-80 h-80 mx-auto bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 rounded-full flex items-center justify-center border border-yellow-500/30">
                                        <div className="text-8xl">👨‍💻</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-20 bg-black">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                            Featured Projects 💼
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 group"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.image_url || `https://picsum.photos/600/400?random=${index + 1}`}
                                            alt={project.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies?.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            {project.project_url && (
                                                <a
                                                    href={project.project_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-medium py-2 px-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
                                                >
                                                    Live Demo 🚀
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 border border-gray-600 hover:border-yellow-400 text-gray-300 hover:text-yellow-400 font-medium py-2 px-4 rounded-lg text-center transition-all duration-300"
                                                >
                                                    GitHub 📱
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 bg-gradient-to-r from-gray-900 to-black">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                Let's Work Together 🤝
                            </h2>
                            
                            {flash?.success && (
                                <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center">
                                    {flash.success}
                                </div>
                            )}
                            
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                                    <p className="text-gray-300 mb-8 leading-relaxed">
                                        Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your ideas to life.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-gray-300">
                                            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center border border-yellow-500/20">
                                                📧
                                            </div>
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <p className="text-yellow-400">hello@portfolio.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-300">
                                            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center border border-yellow-500/20">
                                                🌍
                                            </div>
                                            <div>
                                                <p className="font-medium">Location</p>
                                                <p className="text-yellow-400">Available Worldwide</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-300">
                                            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center border border-yellow-500/20">
                                                ⚡
                                            </div>
                                            <div>
                                                <p className="font-medium">Response Time</p>
                                                <p className="text-yellow-400">Within 24 hours</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div>
                                        <Input
                                            type="text"
                                            placeholder="Your Name"
                                            value={contactForm.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            required
                                            className="bg-gray-800/50 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-400 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type="email"
                                            placeholder="Your Email"
                                            value={contactForm.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required
                                            className="bg-gray-800/50 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-400 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type="text"
                                            placeholder="Subject"
                                            value={contactForm.subject}
                                            onChange={(e) => handleInputChange('subject', e.target.value)}
                                            required
                                            className="bg-gray-800/50 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-400 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <Textarea
                                            placeholder="Your Message"
                                            value={contactForm.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            required
                                            rows={5}
                                            className="bg-gray-800/50 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-400 rounded-lg resize-none"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Sending... ⏳' : 'Send Message 🚀'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-black border-t border-gray-800 py-8">
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-gray-400">
                            © 2024 Portfolio. Built with ❤️ using Laravel & React
                        </p>
                        <div className="flex justify-center space-x-6 mt-4">
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">GitHub</a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">LinkedIn</a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Twitter</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}