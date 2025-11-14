import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, X, Aperture, RefreshCw, AlertCircle } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use a ref to track stream for cleanup to avoid closure staleness issues
  const streamRef = useRef<MediaStream | null>(null); 
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setStream(null);
  }, []);

  const startCamera = useCallback(async () => {
    stopCamera();
    setError('');
    
    try {
      // Try specific constraint first (Front camera)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      streamRef.current = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      console.warn("Primary camera config failed, trying fallback...", err);
      try {
        // Fallback to any available video device
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        streamRef.current = mediaStream;
        setStream(mediaStream);
      } catch (finalErr: any) {
         console.error(finalErr);
         let msg = 'Không thể truy cập camera.';
         if (finalErr.name === 'NotAllowedError' || finalErr.name === 'PermissionDeniedError') {
              msg = 'Quyền truy cập camera bị từ chối. Vui lòng nhấn vào biểu tượng ổ khóa 🔒 trên thanh địa chỉ để cấp quyền và thử lại.';
         } else if (finalErr.name === 'NotFoundError' || finalErr.name === 'DevicesNotFoundError') {
              msg = 'Không tìm thấy thiết bị camera nào trên máy của bạn.';
         } else if (finalErr.name === 'NotReadableError' || finalErr.name === 'TrackStartError') {
              msg = 'Camera đang được sử dụng bởi ứng dụng khác.';
         } else {
              msg = `Lỗi camera: ${finalErr.message || 'Không xác định'}`;
         }
         setError(msg);
      }
    }
  }, [stopCamera]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        // Mirror effect
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(imageDataUrl);
        stopCamera();
      }
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="shrink-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
          <span className="text-white font-medium flex items-center gap-2 font-serif">
            <Camera className="w-5 h-5 text-amber-400" /> Diện Mạng
          </span>
          <button 
            onClick={handleClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport */}
        <div className="relative grow bg-black flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
          {!error ? (
            <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                {/* Face Guide Overlay */}
                <div className="absolute inset-0 border-2 border-amber-500/30 rounded-[50%] w-48 h-64 sm:w-64 sm:h-80 m-auto pointer-events-none shadow-[0_0_50px_rgba(245,158,11,0.1)]"></div>
                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                    <span className="text-white/90 text-sm bg-black/40 inline-block px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                        Căn chỉnh khuôn mặt vào khung
                    </span>
                </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-red-400 p-8 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
              <p className="font-medium">{error}</p>
              <button 
                onClick={() => startCamera()}
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors mt-4 border border-slate-600"
              >
                <RefreshCw className="w-4 h-4" /> Thử Lại
              </button>
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="shrink-0 p-6 bg-slate-900 flex justify-center items-center border-t border-slate-800">
          <button
            onClick={handleCapture}
            disabled={!!error || !stream}
            className="group relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
             <div className="absolute inset-0 rounded-full border-4 border-slate-600 group-hover:border-amber-500 transition-colors"></div>
             <div className="w-16 h-16 rounded-full bg-white group-active:scale-90 transition-transform duration-150"></div>
             <Aperture className="absolute w-6 h-6 text-slate-400 group-hover:text-amber-600 transition-colors z-10 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;