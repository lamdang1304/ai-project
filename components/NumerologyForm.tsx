import React, { useState } from 'react';
import { Binary, Calendar, User } from 'lucide-react';
import { NumerologyInput } from '../types';

interface NumerologyFormProps {
  onSubmit: (data: NumerologyInput) => void;
}

const NumerologyForm: React.FC<NumerologyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<NumerologyInput>({
    fullName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      alert("Vui lòng nhập đầy đủ họ tên và ngày sinh!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto animate-fade-in">
      <h3 className="text-2xl font-serif text-cyan-300 mb-6 text-center border-b border-white/10 pb-4">
        Tra Cứu Thần Số Học
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-500" /> Họ và Tên (Trên giấy khai sinh)
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="NGUYEN VAN A"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all uppercase placeholder-slate-600"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-500" /> Ngày sinh (Dương lịch)
          </label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              name="birthDay"
              placeholder="DD"
              min="1" max="31"
              value={formData.birthDay}
              onChange={handleChange}
              className="bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-center"
            />
            <input
              type="number"
              name="birthMonth"
              placeholder="MM"
              min="1" max="12"
              value={formData.birthMonth}
              onChange={handleChange}
              className="bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-center"
            />
            <input
              type="number"
              name="birthYear"
              placeholder="YYYY"
              min="1900" max="2025"
              value={formData.birthYear}
              onChange={handleChange}
              className="bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-center"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
        >
          <Binary className="w-5 h-5" /> Giải Mã Các Con Số
        </button>
      </form>
    </div>
  );
};

export default NumerologyForm;
