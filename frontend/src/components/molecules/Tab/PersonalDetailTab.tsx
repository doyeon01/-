import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FeedIcon, LikeIcon, RouteIcon, UsersIcon, CameraIcon } from './../../../../src/assets/icons/svg';
import { PersonalFeedDetail } from '../Card/PersonalFeedDetail';
import { PersonalLikeDetail } from '../Card/PersonalLikeDetail';
import { PersonalCompanionDetail } from '../Card/PersonalCompanionDetail';
import { PersonalPlanDetail } from '../Card/PersonalPlanDetail';
import { PersonalPhotoDetail } from '../Card/PersonalPhotoDetail';


import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from 'tw-elements-react';

export const PersonalDetailTab: React.FC = () => {
  const [fillActive, setFillActive] = useState<string>('tab1');
  const nav = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'tab1', label: '피드', icon: <FeedIcon active={fillActive === 'tab1'} />, content: <PersonalFeedDetail/> },
    { id: 'tab2', label: '좋아요', icon: <LikeIcon active={fillActive === 'tab2'} />, content: <PersonalLikeDetail/> },
    { id: 'tab3', label: '여행일정', icon: <RouteIcon active={fillActive === 'tab3'} />, content: <PersonalPlanDetail/> },
    { id: 'tab4', label: '게시글', icon: <UsersIcon active={fillActive === 'tab4'} />, content: <PersonalCompanionDetail/> },
    { id: 'tab5', label: '포토카드', icon: <CameraIcon active={fillActive === 'tab5'} />, content: <PersonalPhotoDetail/> },
  ];

  useEffect(() => {
    if (location.state?.activeTab) {
      setFillActive(location.state.activeTab);
    } else {
      setFillActive('tab1');
    }
  }, [location.state]);

  useEffect(() => {
    if (['tab2', 'tab3', 'tab4', 'tab5'].includes(fillActive)) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [fillActive]);

  const handleFillClick = (tabId: string) => {
    if (tabId === fillActive) return;
    setFillActive(tabId);
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
            className={`pb-4 !text-base flex items-center justify-center gap-2 h-full  ${
              fillActive === tab.id
                ? 'border-b-2 border-[#645E59] text-[#645E59]' // 활성화 상태
                : 'text-[#645E59]/50 !text-[#645E59]/50' // 비활성화 상태 (연하게)
            }`}
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
           className='pt-5'>
            {tab.content}
          </TETabsPane>
        ))}
      </TETabsContent>
    </div>
  );
};
