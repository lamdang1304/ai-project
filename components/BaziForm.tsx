import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { BaziInput } from '../types';

interface BaziFormProps {
  onSubmit: (data: BaziInput) => void;
}

const BaziForm: React.FC<BaziFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BaziInput>({
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    birthTime: '',
    gender: 'male',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.birthDay || !formData.birthMonth || !formData.birthYear || !formData.birthTime) {
      alert("Vui lòng nhập đầy đủ thông tin ngày giờ sinh!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto animate-fade-in">
      <h3 className="text-2xl font-serif text-amber-300 mb-6 text-center border-b border-white/10 pb-4">
        Nhập Thông Tin Bát Tự
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Gender */}
        <div className="flex justify-center gap-8 mb-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              checked={formData.gender === 'male'} 
              onChange={handleChange}
              className="hidden" 
            />
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.gender === 'male' ? 'border-blue-400' : 'border-slate-500'}`}>
              {formData.gender === 'male' && <div className="w-3 h-3 bg-blue-400 rounded-full" />}
            </div>
            <span className={`font-medium ${formData.gender === 'male' ? 'text-blue-400' : 'text-slate-400'}`}>Nam Mạng</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              checked={formData.gender === 'female'} 
              onChange={handleChange}
              className="hidden" 
            />
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.gender === 'female' ? 'border-pink-400' : 'border-slate-500'}`}>
              {formData.gender === 'female' && <div className="w-3 h-3 bg-pink-400 rounded-full" />}
            </div>
            <span className={`font-medium ${formData.gender === 'female' ? 'text-pink-400' : 'text-slate-400'}`}>Nữ Mạng</span>
          </label>
        </div>

        {/* Date of Birth */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium">Ngày</label>
            <input
              type="number"
              name="birthDay"
              placeholder="DD"
              min="1" max="31"
              value={formData.birthDay}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium">Tháng</label>
            <input
              type="number"
              name="birthMonth"
              placeholder="MM"
              min="1" max="12"
              value={formData.birthMonth}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-300 text-sm font-medium">Năm</label>
            <input
              type="number"
              name="birthYear"
              placeholder="YYYY"
              min="1900" max="2025"
              value={formData.birthYear}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Time of Birth */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> Giờ sinh (Rất quan trọng)
          </label>
          <input
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
          />
          <p className="text-xs text-slate-500">*Vui lòng nhập giờ sinh chính xác để tính Tứ Trụ chuẩn xác nhất.</p>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-900/20 transition-all transform hover:scale-[1.02] active:scale-95"
        >
          Luận Giải Bát Tự
        </button>
      </form>
    </div>
  );
};

export default BaziForm;
