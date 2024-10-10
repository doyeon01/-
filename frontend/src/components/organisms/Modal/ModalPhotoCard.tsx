import { useRef } from 'react';
import QR from '../../../assets/statics/QR.png';
import { DownLoadIcon } from '../../../assets/icons/svg';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

interface ModalPostCardProps {
  photoCardUrl?: string;
  onClose: () => void;
}

export const ModalPhotoCard: React.FC<ModalPostCardProps> = ({ photoCardUrl, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null); 

  const onDownloadBtn = () => {
    const card = cardRef.current;

    if (card) { // card가 존재할 때만 실행
      const filter = (node: Node) => {
        return (node as HTMLElement).tagName !== 'SPAN';
      };

      domtoimage
        .toBlob(card, { filter: filter })
        .then((blob) => {
          if (blob) {
            saveAs(blob, 'photocard.png');
          }
        })
        .catch((error) => {
          console.error('이미지 저장 중 오류가 발생했습니다.', error);
        });
    }
  };

  const hrCount = 7;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-lg w-[800px] h-[500px] flex overflow-hidden"
        ref={cardRef}
      >
        {/* 왼쪽 사진 영역 */}
        <div className="w-1/2 h-full">
          <img src={photoCardUrl} alt="Postcard" className="w-full h-full object-cover" />
        </div>

        {/* 오른쪽 엽서 형식 영역 */}
        <div className="w-1/2 h-full p-6 relative">
          {/* 엽서 스타일 텍스트 */}
          <div className="flex flex-col h-full justify-between">
            <div className="text-center text-gray-500 text-xl tracking-widest">
              PhotoCard
            </div>

            {/* 우측 입력 영역 */}
            <div className="flex flex-col space-y-4">
              {Array.from({ length: hrCount }).map((_, index) => (
                <hr key={index} className="border-gray-300 pb-6" />
              ))}
            </div>

            {/* 우표 모양의 작은 사각형 (장식) */}
            <div className="absolute right-5">
              <img src={QR} alt="QRCODE" className="w-12 h-12" />
            </div>
            
            {/* 다운로드 버튼 */}
            <span onClick={onDownloadBtn}>
              <DownLoadIcon className="absolute top-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
