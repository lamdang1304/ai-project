export enum AppState {
  INPUT_INFO = 'INPUT_INFO',
  INPUT_IMAGE = 'INPUT_IMAGE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface UserProfile {
  fullName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: 'male' | 'female';
}

export interface BaziInput {
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  birthTime: string;
  gender: 'male' | 'female';
}

export interface NumerologyInput {
  fullName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

export interface AnalysisResult {
  markdown: string;
}

export interface ImageSource {
  dataUrl: string; // Base64 full string (data:image/...)
  mimeType: string;
  base64Data: string; // Raw base64 data
}