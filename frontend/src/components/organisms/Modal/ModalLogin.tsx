import React from 'react';
import {CloseIcon} from '../../../assets/icons/svg';
import logo from './../../../assets/statics/logo.png';
import google from './../../../assets/statics/google.png'
import naver from './../../../assets/statics/naver.png'
import kakao from './../../../assets/statics/kakao.png'

interface ModalLoginProps {
  onClose: () => void;
}

export const ModalLogin: React.FC<ModalLoginProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t relative">
            <img src={logo} alt="Handom Logo" className="mx-auto w-42 h-16" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="flex flex-col items-center space-y-4 w-full">
         
              <button className= "w-full max-w-xs bg-[#FFE812] text-yellow-800 border-yellow-300 hover:bg-opacity-70 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center">
                  <span className="inline-flex items-center justify-center">
                    <img
                      src={kakao}
                      alt="Kakao"
                      className="w-6 h-6 mr-2"
                    />
                    카카오 계정으로 로그인
                  </span>
              </button>

              <button className="w-full max-w-xs bg-[#1EDE00] text-green-800 border-green-300 hover:bg-opacity-70 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center"
              onClick={() => {
                window.location.href = "https://j11c205.p.ssafy.io/api/v1/user/oauth2/authorization/naver";
              }}
              >
                <span className="inline-flex items-center justify-center">
                  <img
                    src={naver}
                    alt="Naver"
                    className="w-6 h-6 mr-2"
                  />
                  네이버 계정으로 로그인
                </span>
              </button>

              <button className="w-full max-w-xs bg-white text-gray-800 border border-[#B1B3B6] hover:bg-gray-50 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center"
              >
                <span className="inline-flex items-center justify-center">
                  <img
                    src={google}
                    alt="Google"
                    className="w-6 h-6 mr-2"
                  />
                  구글 계정으로 로그인
                </span>
              </button>       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
