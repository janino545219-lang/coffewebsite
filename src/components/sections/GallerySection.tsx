import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_IMAGES } from '../../data/mockData';
import { Maximize2, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; category: string } | null>(null);

  return (
    <section id="gallery" className="py-24 bg-coffee-950/90 relative overflow-hidden border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">
            Visual Ambiance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
            Inside the <span className="text-gold-gradient">Glasshouse & Roastery</span>
          </h2>
          <p className="text-sm text-amber-100/70 font-light">
            A glance into our daily pursuit of coffee mastery, sunlit architectural corners, and delicate latte art.
          </p>
        </motion.div>

        {/* MASONRY IMAGE GRID WITH SCROLL REVEAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedImage(img)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-amber-500/15 shadow-xl hover:border-amber-400/50 transition-all duration-500"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* OVERLAY INFORMATION */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between transition-all transform group-hover:-translate-y-1">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-coffee-950/80 border border-amber-500/20 text-[10px] text-amber-300 font-mono uppercase">
                    {img.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-100">{img.title}</h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedImage(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fadeIn"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-4xl w-full bg-coffee-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-coffee-900/80 text-amber-200 hover:text-white border border-amber-500/20"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-6 bg-coffee-950 border-t border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400">{selectedImage.category}</span>
                <h3 className="font-serif text-2xl font-bold text-stone-100">{selectedImage.title}</h3>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
