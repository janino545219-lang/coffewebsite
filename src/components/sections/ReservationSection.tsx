import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-07-25',
    time: '11:00 AM',
    guests: 2,
    seating: 'Indoor Glasshouse' as 'Indoor Glasshouse' | 'Patio Garden' | 'Roastery Counter',
    requests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const resId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingConfirmed(resId);
    }, 1200);
  };

  return (
    <section id="reservation" className="py-24 bg-coffee-950 relative overflow-hidden border-t border-amber-500/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Guaranteed Seating</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 leading-tight">
              Reserve Your Table in Our <span className="text-gold-gradient">Glasshouse Sanctuary</span>
            </h2>

            <p className="text-sm text-amber-100/70 font-light leading-relaxed">
              Whether you are planning a weekend cupping session, a business meeting, or an intimate dessert date, reserve your preferred lounge area in advance.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-coffee-900/40 border border-amber-500/15 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-amber-100">Three Signature Environments</h4>
                  <p className="text-xs text-amber-200/60 font-light">
                    Choose between the sunlit main Glasshouse, lush outdoor Patio Garden, or direct interactive Roastery Counter.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-coffee-900/40 border border-amber-500/15 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-amber-100">Complementary Tasting Flight</h4>
                  <p className="text-xs text-amber-200/60 font-light">
                    Reservations for 4+ guests include a complimentary single-origin espresso cupping shot for each diner.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: RESERVATION FORM CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-coffee-900/50 border border-amber-500/20 backdrop-blur-xl shadow-2xl relative"
          >
            {bookingConfirmed ? (
              <div className="py-12 text-center space-y-4 animate-scaleUp">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-gold-gradient">Reservation Confirmed!</h3>
                <p className="text-xs text-amber-100/70 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-amber-300">{formData.name}</span>. Your reservation <span className="font-mono text-amber-400 font-bold">{bookingConfirmed}</span> for {formData.guests} guests on {formData.date} at {formData.time} ({formData.seating}) has been placed.
                </p>
                <p className="text-[11px] text-amber-200/50">A confirmation email has been sent to {formData.email}.</p>

                <button
                  onClick={() => setBookingConfirmed(null)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-coffee-800 hover:bg-coffee-700 text-amber-200 text-xs font-semibold uppercase tracking-wider border border-amber-500/30"
                >
                  Make Another Booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl font-bold text-amber-100 mb-2">Book Your Experience</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Claire Beauchamp"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-coffee-950 border border-amber-500/20 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="claire@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-coffee-950 border border-amber-500/20 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-amber-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-coffee-950 border border-amber-500/20 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-coffee-950 border border-amber-500/20 text-xs text-amber-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="08:30 AM" className="bg-coffee-950">08:30 AM</option>
                      <option value="10:00 AM" className="bg-coffee-950">10:00 AM</option>
                      <option value="11:30 AM" className="bg-coffee-950">11:30 AM</option>
                      <option value="02:00 PM" className="bg-coffee-950">02:00 PM</option>
                      <option value="04:30 PM" className="bg-coffee-950">04:30 PM</option>
                      <option value="07:00 PM" className="bg-coffee-950">07:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                      Party Size
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-amber-400 absolute left-3 top-3.5" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-coffee-950 border border-amber-500/20 text-xs text-amber-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                          <option key={num} value={num} className="bg-coffee-950">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                    Seating Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Indoor Glasshouse', 'Patio Garden', 'Roastery Counter'] as const).map((seat) => (
                      <button
                        type="button"
                        key={seat}
                        onClick={() => setFormData({ ...formData, seating: seat })}
                        className={`py-2 px-2 rounded-lg text-[11px] font-medium border transition-all ${
                          formData.seating === seat
                            ? 'bg-amber-500 text-coffee-950 border-amber-400 font-bold'
                            : 'bg-coffee-950 text-amber-200/70 border-amber-500/20 hover:border-amber-400'
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Anniversary celebration, high chair, quiet corner..."
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-amber-500/20 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-coffee-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-coffee-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Confirm Table Reservation</span>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
