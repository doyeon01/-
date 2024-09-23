import { useRef, Dispatch, SetStateAction } from "react";
import useDetectClose from "../../../hooks/useDetectCLose";

interface DropDownProps {
  selectedPlace: string | null; 
  setSelectedPlace: Dispatch<SetStateAction<string | null>>;
}

const DropDown: React.FC<DropDownProps> = ({ selectedPlace, setSelectedPlace }) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedPlace(value ? value : null); 
    console.log(selectedPlace);
    
    setIsOpen(false); 
  };

  return (
    <div ref={dropDownRef} >
        <select
          name="searchArea"
          id="searchArea"
          title="지역 선택"
          className="border rounded p-2 ml-2 mr-2 "
          onChange={handleChange} 
        >
          <option value="">지역</option>
          <option value="1">서울</option>
          <option value="2">인천</option>
          <option value="3">대전</option>
          <option value="4">대구</option>
          <option value="5">광주</option>
          <option value="6">부산</option>
          <option value="7">울산</option>
          <option value="8">세종시</option>
          <option value="31">경기도</option>
          <option value="32">강원특별자치도</option>
          <option value="33">충청북도</option>
          <option value="34">충청남도</option>
          <option value="35">경상북도</option>
          <option value="36">경상남도</option>
          <option value="37">전북특별자치도</option>
          <option value="38">전라남도</option>
          <option value="39">제주도</option>
        </select>

    </div>
  );
};

export default DropDown;
