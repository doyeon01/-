import React from "react";
import { NEKR, CPKA, NPUR, CEUA, NEKA, CPKR, NEUR, CEUR, NPKA, CPUA, CEKA, NPKR, NEUA, CPUR, NPUA,CEKR } from "../../atoms/input/MBTI"; // 컴포넌트 임포트

interface Props {
  mbti: string;
}

export const MBTIRenderer: React.FC<Props> = ({ mbti }) => {
  const renderMBTIComponent = () => {
    console.log(mbti);
    
    switch (mbti) {
      case "NEKR":
        return <NEKR />;
      case "CPKA":
        return <CPKA />;
      case "NPUR":
        return <NPUR />;
      case "CEUA":
        return <CEUA />;
      case "CPKR":
        return <CPKR />;
      case "NEKA":
        return <NEKA />;
      case "NEUR":
        return <NEUR />;
      case "CEUR":
        return <CEUR />;
      case "NPKA":
        return <NPKA />;
      case "CPUA":
        return <CPUA />;
      case "CEKA":
        return <CEKA />;
      case "NPKR":
        return <NPKR />;
      case "NEUA":
        return <NEUA />;
      case "CPUR":
        return <CPUR />;
      case "NPUA":
        return <NPUA />;
      case "CEKR":
        return <CEKR />;
    }
  };

  return <div>{renderMBTIComponent()}</div>;
};

export default MBTIRenderer;
