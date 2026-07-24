import React from 'react';
import { User, Shield, Briefcase, Mail, Phone, MoreVertical, Plus } from 'lucide-react';

export const StaffTab: React.FC = () => {
  const staff = [
    { id: 'EMP-001', name: 'Marcus Chen', role: 'Master Roaster', email: 'marcus@auraroast.com', phone: '(415) 555-0198', status: 'Active', shift: 'Morning' },
    { id: 'EMP-002', name: 'Sarah Jenkins', role: 'Head Barista', email: 'sarah@auraroast.com', phone: '(415) 555-0234', status: 'Active', shift: 'Afternoon' },
    { id: 'EMP-003', name: 'David Miller', role: 'Cafe Manager', email: 'david@auraroast.com', phone: '(415) 555-0771', status: 'On Leave', shift: 'N/A' },
    { id: 'EMP-004', name: 'Elena Rostova', role: 'Barista', email: 'elena@auraroast.com', phone: '(415) 555-0442', status: 'Active', shift: 'Morning' },
    { id: 'EMP-005', name: 'James Wilson', role: 'Pastry Chef', email: 'james@auraroast.com', phone: '(415) 555-0899', status: 'Active', shift: 'Early Morning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-100">Staff Management</h2>
          <p className="text-sm text-amber-200/50 mt-1">Manage team roles, shifts, and access levels</p>
        </div>
        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      <div className="glass-panel-elevated rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-coffee-800 bg-coffee-900/40">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Employee</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Role</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Contact</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Shift</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-amber-200/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-800/50">
              {staff.map((emp) => (
                <tr key={emp.id} className="hover:bg-coffee-900/20 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-coffee-900 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-200 group-hover:text-amber-300 transition-colors">{emp.name}</p>
                        <p className="text-[10px] text-amber-200/50 font-mono">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-stone-200">
                      {emp.role.includes('Manager') || emp.role.includes('Head') || emp.role.includes('Master') ? 
                        <Shield className="w-3.5 h-3.5 text-emerald-400" /> : 
                        <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                      }
                      {emp.role}
                    </div>
                  </td>
                  <td className="p-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-amber-100/70">
                      <Mail className="w-3.5 h-3.5 text-amber-500/50" /> {emp.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-amber-100/70">
                      <Phone className="w-3.5 h-3.5 text-amber-500/50" /> {emp.phone}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-stone-200">
                    {emp.shift}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      emp.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-amber-200/50 hover:text-amber-400 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
