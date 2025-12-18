import React, { useState, useRef, useEffect } from 'react';
import { Camera, Mail, Instagram, ChevronRight, Layers, FileText, CheckCircle, Image as ImageIcon, MoveHorizontal, Download } from 'lucide-react';

// --- KOMPONEN SLIDER BEFORE/AFTER ---
const CompareSlider = ({ beforeImage, afterImage, beforeLabel, afterLabel }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl cursor-col-resize select-none shadow-lg group"
      onTouchMove={handleTouchMove}
    >
      {/* IMAGE 1: AFTER (Background Layer) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        draggable="false"
      />
      <div className="absolute top-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-sm z-10">
        {afterLabel || "AFTER"}
      </div>

      {/* IMAGE 2: BEFORE (Foreground Layer - Clipped) */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-white/50"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute top-0 left-0 max-w-none h-full object-cover"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          draggable="false"
        />
        <div className="absolute top-4 left-4 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded backdrop-blur-sm shadow-sm">
          {beforeLabel || "BEFORE"}
        </div>
      </div>

      {/* SLIDER HANDLE */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-600 hover:scale-110 transition-transform">
          <MoveHorizontal size={16} />
        </div>
      </div>
      
      {/* Overlay Instruction (Hilang saat di-hover) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-4 py-2 rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
        Drag slider to compare
      </div>
    </div>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---
const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('all');

  // DATA PROYEK
  const projects = [
    {
      id: 1,
      title: "Cinematic Sunset Transformation",
      category: "manipulation",
      description: "Transforming a daylight shot into a dramatic golden hour scene. Reconstructed lighting, added sun flare, and color graded for warmth.",
      // GAMBAR DIAMBIL DARI FOLDER PUBLIC
      beforeImg: "/p1-before.jpg", 
      afterImg: "/p1-sunset.jpg",
      tags: ["Sky Replacement", "Color Grading", "Lighting"]
    },
    {
      id: 2,
      title: "Architectural Cleanup",
      category: "cleanup",
      description: "Removing complex architectural structures (tower) while maintaining background sky and cloud consistency.",
      beforeImg: "/p1-before.jpg",
      afterImg: "/p1-cleanup.jpg",
      tags: ["Object Removal", "Inpainting", "Cleanup"]
    },
    {
      id: 3,
      title: "Color Correction Sample",
      category: "color",
      description: "Standard color correction workflow example (Example Data).",
      beforeImg: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop",
      afterImg: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1000&auto=format&fit=crop",
      tags: ["Color Correction", "Lightroom"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* NAVBAR */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-lg font-bold text-xl">H</div>
            <div>
              <span className="block font-bold text-lg leading-none tracking-tight">Hanif C.R.</span>
              <span className="text-xs text-gray-500 font-medium">Freelance Editor</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#portfolio" className="hover:text-black transition-colors">Portfolio</a>
            <a href="#skills" className="hover:text-black transition-colors">Skills</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>
          <a href="mailto:cahyo.hanif@gmail.com" className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Mail size={16} /> Hire Me
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 border border-blue-100">
            <CheckCircle size={16} /> Open for Commission & AI Projects
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-8 leading-tight">
            Visual Perfection.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pixel by Pixel.</span>
          </h1>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">
            Experienced Photo Editor (Est. 2018) specializing in high-end retouching, creative manipulation, and preparing clean datasets for AI training models.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#portfolio" className="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              View Comparison Gallery <ChevronRight size={20} />
            </a>
            
            {/* TOMBOL CV YANG SUDAH DIUPDATE */}
            <a 
              href="/cv.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:border-gray-400 transition-all flex items-center justify-center gap-2"
            >
              <Download size={20} /> View / Print CV
            </a>

          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section id="portfolio" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Selected Works</h2>
            <p className="text-gray-500 text-lg">Drag the sliders to reveal the transformation.</p>
          </div>
          
          <div className="flex gap-2 mt-6 md:mt-0 p-1 bg-gray-200 rounded-full">
            {['all', 'manipulation', 'cleanup', 'color'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all capitalize ${activeTab === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {projects
            .filter(p => activeTab === 'all' || p.category === activeTab)
            .map((project, index) => (
            <div key={project.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
              
              {/* Slider Area */}
              <div className="w-full md:w-3/5">
                <CompareSlider 
                  beforeImage={project.beforeImg}
                  afterImage={project.afterImg}
                  beforeLabel="ORIGINAL"
                  afterLabel="EDITED"
                />
              </div>

              {/* Text Area */}
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Workflow</h4>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Layers size={16} className="text-blue-600" /> 
                    <span>Non-Destructive Editing</span>
                  </div>
                   <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mt-2">
                    <FileText size={16} className="text-purple-600" /> 
                    <span>Includes AI Instructions</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="bg-black text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Tools of the Trade.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I don't just "fix" photos. I engineer visual data. My workflow is optimized for speed, precision, and the specific requirements of machine learning datasets.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-900 px-6 py-4 rounded-xl border border-gray-800 flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-bold">Photoshop (Expert)</span>
                </div>
                <div className="bg-gray-900 px-6 py-4 rounded-xl border border-gray-800 flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-bold">Generative AI</span>
                </div>
                <div className="bg-gray-900 px-6 py-4 rounded-xl border border-gray-800 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-bold">Data Annotation</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
                <Camera className="text-blue-500 mb-4" size={32} />
                <h3 className="font-bold text-xl mb-2">Retouching</h3>
                <p className="text-sm text-gray-400">Frequency separation, dodging & burning, seamless cloning.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
                <ImageIcon className="text-purple-500 mb-4" size={32} />
                <h3 className="font-bold text-xl mb-2">Manipulation</h3>
                <p className="text-sm text-gray-400">Environment blending, sky replacement, perspective correction.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
                <FileText className="text-green-500 mb-4" size={32} />
                <h3 className="font-bold text-xl mb-2">Instruction</h3>
                <p className="text-sm text-gray-400">Writing clear imperative prompts for AI model training.</p>
              </div>
               <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors">
                <Layers className="text-orange-500 mb-4" size={32} />
                <h3 className="font-bold text-xl mb-2">Batch Edit</h3>
                <p className="text-sm text-gray-400">High volume processing with consistent quality control.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-white py-16 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to elevate your visual content?</h2>
          <p className="text-gray-500 mb-8">Available for Wirestock projects and freelance commissions.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="mailto:cahyo.hanif@gmail.com" className="flex items-center gap-2 text-lg font-bold text-black hover:text-blue-600 transition-colors px-6 py-3 bg-gray-100 rounded-full">
              <Mail size={24} /> cahyo.hanif@gmail.com
            </a>
            <a href="https://instagram.com" className="flex items-center gap-2 text-lg font-bold text-black hover:text-pink-600 transition-colors px-6 py-3 bg-gray-100 rounded-full">
              <Instagram size={24} /> @fatarabbasu
            </a>
          </div>
          <div className="mt-16 text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Hanif Cahyo Romadhon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;