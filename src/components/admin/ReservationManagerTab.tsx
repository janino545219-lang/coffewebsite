import React, { useState } from 'react';
import { INITIAL_RESERVATIONS } from '../../data/mockData';
import { Reservation } from '../../types';
import { Check, X, Calendar, Clock, Users } from 'lucide-react';

export const ReservationManagerTab: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);

  const handleUpdateStatus = (id: string, newStatus: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="font-serif text-2xl font-bold text-amber-100">Table Reservation Management</h3>
        <p className="text-xs text-amber-200/50">Approve or assign seating for upcoming guest bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-2xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-md space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-coffee-800">
                <span className="font-mono text-sm font-bold text-amber-300">{res.id}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    res.status === 'Confirmed'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : res.status === 'Pending'
                      ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {res.status}
                </span>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-100">{res.customerName}</h4>
                <p className="text-xs text-amber-200/60">{res.email} • {res.phone}</p>
              </div>

              <div className="space-y-1.5 text-xs text-amber-100/80 pt-2 border-t border-coffee-800/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{res.date} at {res.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{res.guests} Guests ({res.seating})</span>
                </div>
                {res.specialRequests && (
                  <p className="text-[11px] text-amber-300/80 italic pt-1">
                    Note: "{res.specialRequests}"
                  </p>
                )}
              </div>
            </div>

            {/* ACTION CONTROLS */}
            <div className="pt-3 border-t border-coffee-800 flex items-center gap-2">
              <button
                onClick={() => handleUpdateStatus(res.id, 'Confirmed')}
                className="flex-1 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm</span>
              </button>
              <button
                onClick={() => handleUpdateStatus(res.id, 'Cancelled')}
                className="flex-1 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center justify-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Decline</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
