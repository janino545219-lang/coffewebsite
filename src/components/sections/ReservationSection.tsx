import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';

export const ReservationSection: React.FC = () => {
  const [formState, setFormState] = useState({ date: '', time: '', guests: '2', specialRequests: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.res-content', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }}
      );
      
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }}
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Success animation
    gsap.fromTo('.success-msg', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
    );
  };

  return (
    <section ref={sectionRef} id="reservation" className="py-24 relative overflow-hidden">
      {/* Background with parallax image and dark overlay */}
      <div className="absolute inset-0 bg-coffee-950 z-0">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80" 
          alt="Cafe seating" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="res-content space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-100">
              Reserve Your <span className="text-gold-gradient">Experience</span>
            </h2>
            <p className="text-amber-100/70 font-light text-lg">
              Secure your spot in our glasshouse. Whether it's a quiet morning espresso or an afternoon tasting flight, we ensure every detail is prepared for your arrival.
            </p>
            
            <div className="pt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-200">Opening Hours</h4>
                  <p className="text-sm text-amber-100/60 mt-1">Mon - Fri: 7am - 7pm<br/>Sat - Sun: 8am - 8pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-200">Group Tastings</h4>
                  <p className="text-sm text-amber-100/60 mt-1">For groups larger than 6, please contact us directly to arrange a private tasting session.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {!isSubmitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="glass-panel-elevated p-8 sm:p-10 rounded-3xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date Input */}
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60 flex items-center gap-2">
                      <CalendarIcon className="w-3.5 h-3.5" /> Date
                    </label>
                    <input 
                      type="date" 
                      required
                      value={formState.date}
                      onChange={e => setFormState({...formState, date: e.target.value})}
                      className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all custom-calendar-picker"
                    />
                  </div>
                  
                  {/* Time Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> Time
                    </label>
                    <select 
                      required
                      value={formState.time}
                      onChange={e => setFormState({...formState, time: e.target.value})}
                      className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-400 transition-all appearance-none"
                    >
                      <option value="" disabled>Select Time</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Party Size
                  </label>
                  <select 
                    value={formState.guests}
                    onChange={e => setFormState({...formState, guests: e.target.value})}
                    className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-400 transition-all appearance-none"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-200/60">Special Requests</label>
                  <textarea 
                    rows={3}
                    value={formState.specialRequests}
                    onChange={e => setFormState({...formState, specialRequests: e.target.value})}
                    placeholder="E.g., Window seat preferred..."
                    className="w-full bg-coffee-900/50 border border-amber-500/20 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-400 transition-all resize-none placeholder:text-stone-500"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-coffee-950 font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all group"
                >
                  <span>Confirm Reservation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            ) : (
              <div className="success-msg glass-panel-elevated p-12 rounded-3xl text-center space-y-6 flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl font-bold text-stone-100 mb-2">Reservation Confirmed</h3>
                  <p className="text-amber-100/60 font-light">We look forward to serving you on {formState.date} at {formState.time} for {formState.guests} guests.</p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-amber-400 text-sm font-bold tracking-widest uppercase hover:text-amber-300 underline underline-offset-4 decoration-amber-500/30 hover:decoration-amber-400"
                >
                  Make Another Booking
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
