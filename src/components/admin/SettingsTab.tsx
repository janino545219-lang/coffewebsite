import React, { useState } from 'react';
import { Save, Bell, Moon, Sun, Shield, DollarSign } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const [storeName, setStoreName] = useState('Aura Roast Flagship');
  const [taxRate, setTaxRate] = useState('8.0');
  const [currency, setCurrency] = useState('USD ($)');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [darkModeDefault, setDarkModeDefault] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      <div>
        <h3 className="font-serif text-2xl font-bold text-amber-100">Store Settings & Configuration</h3>
        <p className="text-xs text-amber-200/50">Manage roastery operational parameters, taxes & system preferences</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* GENERAL SETTINGS */}
        <div className="p-6 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl space-y-4">
          <h4 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span>Store Profile & Financials</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-amber-300 block mb-1">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="font-semibold text-amber-300 block mb-1">Sales Tax Rate (%)</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-coffee-950 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-amber-300 block mb-1">Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-amber-500/20 text-amber-100 focus:outline-none"
              >
                <option value="USD ($)">USD ($) United States Dollar</option>
                <option value="EUR (€)">EUR (€) Euro</option>
                <option value="GBP (£)">GBP (£) British Pound</option>
              </select>
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="p-6 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl space-y-4">
          <h4 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <span>Alerts & Notifications</span>
          </h4>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-coffee-950 border border-amber-500/10 cursor-pointer">
              <div>
                <span className="font-semibold text-stone-200 block">Low Stock Email Alerts</span>
                <span className="text-[11px] text-amber-200/50">Notify roastery manager when bean levels drop below 15kg</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded border-amber-500/30 text-amber-500 focus:ring-amber-500/40 bg-coffee-900 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-coffee-950 border border-amber-500/10 cursor-pointer">
              <div>
                <span className="font-semibold text-stone-200 block">Instant Reservation SMS Notifications</span>
                <span className="text-[11px] text-amber-200/50">Send instant text to host desk on new booking</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="rounded border-amber-500/30 text-amber-500 focus:ring-amber-500/40 bg-coffee-900 w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* THEME PREFERENCES */}
        <div className="p-6 rounded-3xl bg-coffee-900/40 border border-amber-500/20 backdrop-blur-xl space-y-4">
          <h4 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-2">
            <Moon className="w-5 h-5 text-amber-400" />
            <span>UI Theme Preferences</span>
          </h4>

          <label className="flex items-center justify-between p-3 rounded-xl bg-coffee-950 border border-amber-500/10 cursor-pointer text-xs">
            <div>
              <span className="font-semibold text-stone-200 block">Default Dark Espresso Mode</span>
              <span className="text-[11px] text-amber-200/50">Enable dark glassmorphic UI by default</span>
            </div>
            <input
              type="checkbox"
              checked={darkModeDefault}
              onChange={(e) => setDarkModeDefault(e.target.checked)}
              className="rounded border-amber-500/30 text-amber-500 focus:ring-amber-500/40 bg-coffee-900 w-4 h-4"
            />
          </label>
        </div>

        {/* SAVE ACTION */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-coffee-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configurations</span>
          </button>
          {saved && <span className="text-xs text-emerald-400 font-medium">✓ Configurations saved successfully!</span>}
        </div>
      </form>
    </div>
  );
};
