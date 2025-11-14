import React, { useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface UserInfoFormProps {
  onSubmit: (data: UserProfile) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserProfile>({
    fullName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: 'male',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-amber-300 mb-2">
          Bước 1: Thông Tin Bản Mệnh
        </h3>
        <p className="text-slate-400 text-sm">
          Nhập thông tin chính xác để AI lập lá số Bát tự và Thần số học.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Gender Selection */}
        <div className="flex justify-center gap-8 mb-6">
          <label className="flex items-center gap-2 cursor-pointer group p-4 rounded-xl border border-slate-700 hover:border-blue-500 bg-slate-800/50 transition-all">
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              checked={formData.gender === 'male'} 
              onChange={handleChange}
              className="hidden" 
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.gender === 'male' ? 'border-blue-400' : 'border-slate-500'}`}>
              {formData.gender === 'male' && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />}
            </div>
            <span className={`font-medium ${formData.gender === 'male' ? 'text-blue-400' : 'text-slate-400'}`}>Nam Mạng</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer group p-4 rounded-xl border border-slate-700 hover:border-pink-500 bg-slate-800/50 transition-all">
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              checked={formData.gender === 'female'} 
              onChange={handleChange}
              className="hidden" 
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.gender === 'female' ? 'border-pink-400' : 'border-slate-500'}`}>
              {formData.gender === 'female' && <div className="w-2.5 h-2.5 bg-pink-400 rounded-full" />}
            </div>
            <span className={`font-medium ${formData.gender === 'female' ? 'text-pink-400' : 'text-slate-400'}`}>Nữ Mạng</span>
          </label>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-amber-500" /> Họ và Tên
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="NGUYEN VAN A"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all uppercase placeholder-slate-600"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" /> Ngày sinh (Dương lịch)
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="number"
                name="birthDay"
                placeholder="Ngày"
                min="1" max="31"
                value={formData.birthDay}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-center"
              />
            </div>
            <div>
              <input
                type="number"
                name="birthMonth"
                placeholder="Tháng"
                min="1" max="12"
                value={formData.birthMonth}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-center"
              />
            </div>
            <div>
              <input
                type="number"
                name="birthYear"
                placeholder="Năm"
                min="1900" max="2025"
                value={formData.birthYear}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-center"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">*Hệ thống sẽ tự động chuyển đổi sang ngày Âm lịch.</p>
        </div>

        <button 
          type="submit"
          className="w-full py-4 mt-6 bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 text-lg"
        >
          Tiếp Tục <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default UserInfoForm;
