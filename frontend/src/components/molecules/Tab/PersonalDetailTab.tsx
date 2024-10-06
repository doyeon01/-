import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { FeedIcon, LikeIcon, RouteIcon, UsersIcon, CameraIcon } from './../../../../src/assets/icons/svg';
import { PersonalFeedDetail } from '../Card/PersonalFeedDetail';
import { PersonalLikeDetail } from '../Card/PersonalLikeDetail';
import { PersonalCompanionDetail } from '../Card/PersonalCompanionDetail';
import { PersonalPlanDetail } from '../Card/PersonalPlanDetail';
import { PersonalPhotoDetail } from '../Card/PersonalPhotoDetail';
import { PlanInputState, PlanSortState } from '../../../Recoil/atoms/MyPage';

import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from 'tw-elements-react';

export const PersonalDetailTab: React.FC = () => {
  const [fillActive, setFillActive] = useState<string>('tab1');
  const [tabKey, setTabKey] = useState<number>(0); // 탭 리렌더링을 위한 key 상태 추가
  const nav = useNavigate();
  const location = useLocation();
  
  const resetInputValue = useSetRecoilState(PlanInputState);
  const resetSortOrder = useSetRecoilState(PlanSortState);

  const tabs = [
    { id: 'tab1', label: '피드', icon: <FeedIcon active={fillActive === 'tab1'} />, content: <PersonalFeedDetail key={tabKey} /> }, // key 값 추가
    { id: 'tab2', label: '좋아요', icon: <LikeIcon active={fillActive === 'tab2'} />, content: <PersonalLikeDetail resetSelectedButton={fillActive === 'tab2'}/> },
    { id: 'tab3', label: '여행일정', icon: <RouteIcon active={fillActive === 'tab3'} />, content: <PersonalPlanDetail /> },
    { id: 'tab4', label: '게시글', icon: <UsersIcon active={fillActive === 'tab4'} />, content: <PersonalCompanionDetail /> },
    { id: 'tab5', label: '포토카드', icon: <CameraIcon active={fillActive === 'tab5'} />, content: <PersonalPhotoDetail /> },
  ];

  useEffect(() => {
    if (location.state?.activeTab) {
      setFillActive(location.state.activeTab);
      if (location.state.activeTab === 'tab1') {
        setTabKey(prev => prev + 1); // 피드 탭이 활성화될 때 key 변경
      }
    } else {
      setFillActive('tab1');
    }
  }, [location.state]);

  const handleFillClick = (tabId: string) => {
    if (tabId === fillActive) return;

    resetInputValue('');
    resetSortOrder('최신순'); 
    setFillActive(tabId);

    // 피드 탭 클릭 시 key 변경하여 리렌더링 유도
    if (tabId === 'tab1') {
      setTabKey(prev => prev + 1); // key 값을 변경하여 컴포넌트 리렌더링
    }

    nav(location.pathname, { state: { activeTab: tabId } });
  };

  return (
    <div>
      <TETabs fill>
        {tabs.map((tab) => (
          <TETabsItem
            key={tab.id}
            onClick={() => handleFillClick(tab.id)}
            active={fillActive === tab.id}
            className={`pb-4 !text-base flex items-center justify-center gap-2 h-full  ${fillActive === tab.id ? 'border-b-2 border-[#645E59] text-[#645E59]' : 'text-[#645E59]/50 !text-[#645E59]/50'}`}
          >
            {tab.icon && <span className="icon">{tab.icon}</span>}
            <span className="text-center">{tab.label}</span>
          </TETabsItem>
        ))}
      </TETabs>

      <TETabsContent>
        {tabs.map((tab) => (
          <TETabsPane
            key={tab.id}
            show={fillActive === tab.id}
            className='pt-5'
          >
            {tab.content}
          </TETabsPane>
        ))}
      </TETabsContent>
    </div>
  );
};
