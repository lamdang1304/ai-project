import React, { useState } from 'react';
import { Sparkles, Camera, UploadCloud, Loader2, User, ArrowLeft } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import CameraCapture from './components/CameraCapture';
import AnalysisReport from './components/AnalysisReport';
import UserInfoForm from './components/UserInfoForm';
import { analyzeDestiny } from './services/geminiService';
import { AppState, UserProfile } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT_INFO);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [showCamera, setShowCamera] = useState<boolean>(false);

  // --- HANDLERS ---

  // Step 1: Info Submit
  const handleInfoSubmit = (data: UserProfile) => {
    setUserProfile(data);
    setAppState(AppState.INPUT_IMAGE);
  };

  // Step 2: Image Handling
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        startUnifiedAnalysis(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Step 3: Analysis
  const startUnifiedAnalysis = async (dataUrl: string) => {
    if (!userProfile) return;

    setImageSrc(dataUrl);
    setShowCamera(false);
    setAppState(AppState.ANALYZING);

    try {
      const [metadata, base64Data] = dataUrl.split(',');
      const mimeType = metadata.match(/:(.*?);/)?.[1] || 'image/jpeg';

      const resultMarkdown = await analyzeDestiny(base64Data, mimeType, userProfile);
      setAnalysisResult(resultMarkdown);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
    }
  };

  // Reset / Back navigation
  const resetApp = () => {
    setAppState(AppState.INPUT_INFO);
    setUserProfile(null);
    setImageSrc(null);
    setAnalysisResult('');
  };

  const goBackToInfo = () => {
    setAppState(AppState.INPUT_INFO);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed bg-no-repeat">
      {/* Dark Overlay */}
      <div className="min-h-screen bg-slate-950/90 backdrop-blur-sm overflow-y-auto pb-20">
        
        {/* Navbar */}
        <nav className="w-full p-6 flex justify-center items-center border-b border-white/10 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={resetApp}>
            <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-purple-400 bg-clip-text text-transparent tracking-widest font-serif">
                HUYỀN HỌC AI
              </h1>
              <span className="text-xs text-slate-400 tracking-wider">NHÂN TƯỚNG • BÁT TỰ • THẦN SỐ</span>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 pt-8 max-w-4xl">
          
          {/* PROGRESS INDICATOR */}
          {appState !== AppState.RESULT && appState !== AppState.ERROR && (
             <div className="flex justify-center mb-10">
               <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${appState === AppState.INPUT_INFO ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-500'}`}>1</div>
                  <div className="w-16 h-1 bg-slate-800">
                    <div className={`h-full bg-amber-500 transition-all duration-500 ${appState !== AppState.INPUT_INFO ? 'w-full' : 'w-0'}`}></div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${appState === AppState.INPUT_IMAGE || appState === AppState.ANALYZING ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'}`}>2</div>
                  <div className="w-16 h-1 bg-slate-800">
                     <div className={`h-full bg-purple-500 transition-all duration-500 ${appState === AppState.ANALYZING ? 'w-full' : 'w-0'}`}></div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${appState === AppState.ANALYZING ? 'bg-blue-500 text-white animate-pulse' : 'bg-slate-800 text-slate-500'}`}>3</div>
               </div>
             </div>
          )}

          {/* STEP 1: INPUT INFO */}
          {appState === AppState.INPUT_INFO && (
            <div className="animate-fade-in">
              <UserInfoForm onSubmit={handleInfoSubmit} />
            </div>
          )}

          {/* STEP 2: INPUT IMAGE */}
          {appState === AppState.INPUT_IMAGE && (
            <div className="animate-fade-in flex flex-col items-center">
              <button 
                onClick={goBackToInfo}
                className="self-start mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>

              <div className="text-center mb-8 max-w-2xl">
                <h3 className="text-2xl font-serif text-purple-300 mb-2">
                  Bước 2: Diện Mạng
                </h3>
                <p className="text-slate-300">
                  Cung cấp hình ảnh khuôn mặt rõ nét (không đeo kính râm, đủ sáng) để AI kết hợp Nhân Tướng Học vào lá số của bạn.
                </p>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-8 rounded-2xl flex flex-col items-center space-y-6 hover:bg-slate-800/80 transition-all duration-300 shadow-lg border border-slate-700 hover:border-purple-500/50">
                  <div className="p-4 bg-purple-500/20 rounded-full text-purple-300">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Tải Ảnh Có Sẵn</h3>
                  <ImageUpload onImageSelected={processFile} />
                </div>

                <div className="glass-panel p-8 rounded-2xl flex flex-col items-center space-y-6 hover:bg-slate-800/80 transition-all duration-300 shadow-lg border border-slate-700 hover:border-amber-500/50">
                  <div className="p-4 bg-amber-500/20 rounded-full text-amber-300">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Chụp Trực Tiếp</h3>
                  <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-slate-600 rounded-xl bg-slate-900/50">
                    <button
                      onClick={() => setShowCamera(true)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                      <Camera className="w-5 h-5" /> Mở Camera
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ANALYZING */}
          {appState === AppState.ANALYZING && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <div className="relative mb-10">
                <div className="absolute inset-0 blur-2xl opacity-30 animate-pulse rounded-full bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500"></div>
                
                <div className="w-40 h-40 rounded-full border-4 border-slate-700 flex items-center justify-center shadow-2xl relative z-10 bg-slate-900 overflow-hidden">
                   {imageSrc && (
                     <img src={imageSrc} className="w-full h-full object-cover opacity-60" alt="loading" />
                   )}
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Sparkles className="w-12 h-12 text-white animate-ping" />
                   </div>
                </div>
                
                <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full w-full h-full animate-spin z-20"></div>
                <div className="absolute inset-2 border-b-4 border-amber-500 rounded-full w-[95%] h-[95%] animate-spin-slow z-20"></div>
              </div>
              
              <h2 className="text-3xl font-serif text-white mb-4">Đang Bình Giải Thiên Cơ...</h2>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center justify-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin" /> <span>Chuyển ngày dương sang âm lịch...</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin delay-150" /> <span>Lập lá số Bát tự & Thần số...</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin delay-300" /> <span>Phân tích tướng mạo...</span>
                </div>
              </div>
            </div>
          )}

          {/* FINAL: RESULT */}
          {appState === AppState.RESULT && (
            <AnalysisReport 
              markdown={analysisResult} 
              imageSrc={imageSrc} 
              onReset={resetApp} 
              title={`Lá Số Vận Mệnh: ${userProfile?.fullName.toUpperCase()}`}
            />
          )}

          {/* ERROR STATE */}
          {appState === AppState.ERROR && (
            <div className="text-center py-20 glass-panel max-w-xl mx-auto rounded-xl p-10">
              <div className="text-red-400 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-white mb-4">Thiên cơ bất khả lộ</h2>
              <p className="text-slate-300 mb-8">
                Có lỗi xảy ra trong quá trình luận giải. Vui lòng kiểm tra lại kết nối hoặc hình ảnh.
              </p>
              <button 
                onClick={resetApp}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Thử Lại
              </button>
            </div>
          )}

        </main>

        {/* Camera Modal */}
        {showCamera && (
          <CameraCapture 
            onCapture={startUnifiedAnalysis} 
            onClose={() => setShowCamera(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
