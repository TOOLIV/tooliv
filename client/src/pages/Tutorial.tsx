import ChannelCreateTutorial from 'organisms/modal/tutorial/ChannelCreateTutorial';
import ChannelMemberTutorial from 'organisms/modal/tutorial/ChannelMemberTutorial';
import ChannelSettingTutorial from 'organisms/modal/tutorial/ChannelSettingTutorial';
import DirectMessageTutorial from 'organisms/modal/tutorial/DirectMessageTutorial';
import UserStatusTutorial from 'organisms/modal/tutorial/UserStatusTutorial';
import VideoMeetingTutorial from 'organisms/modal/tutorial/VideoMeetingTutorial';
import WorkspaceCreateTutorial from 'organisms/modal/tutorial/WorkspaceCreateTutorial';
import WorkspaceSettingTutorial from 'organisms/modal/tutorial/WorkspaceSettingTutorial';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isTutorial } from 'recoil/atom';

const Tutorial = () => {
  const [workspaceCreate, setWorkspaceCreate] = useState(true);
  const [channelCreate, setChannelCreate] = useState(false);
  const [directMessage, setDirectMessage] = useState(false);
  const [workspaceSetting, setWorkspaceSetting] = useState(false);
  const [channelSetting, setChannelSetting] = useState(false);
  const [channelMember, setChannelMember] = useState(false);
  const [videoMeeting, setVideoMeeting] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const setIsTutorialOpen = useSetRecoilState(isTutorial);
  return (
    <>
      <WorkspaceCreateTutorial
        isOpen={workspaceCreate}
        onClose={() => {
          setWorkspaceCreate(false);
          setIsTutorialOpen(false);
        }}
        onNext={() => {
          setChannelCreate(true);
          setWorkspaceCreate(false);
        }}
        progress={0}
      />
      <ChannelCreateTutorial
        isOpen={channelCreate}
        onClose={() => {
          setChannelCreate(false);
          setIsTutorialOpen(false);
        }}
        onNext={() => {
          setDirectMessage(true);
          setChannelCreate(false);
        }}
        progress={14}
      />
      <DirectMessageTutorial
        isOpen={directMessage}
        onClose={() => {
          setDirectMessage(false);
          setIsTutorialOpen(false);
        }}
        onNext={() => {
          setWorkspaceSetting(true);
          setDirectMessage(false);
        }}
        progress={28}
      />
      <WorkspaceSettingTutorial
        isOpen={workspaceSetting}
        onClose={() => {
          setWorkspaceSetting(false);
          setIsTutorialOpen(false);
        }}
        onNext={() => {
          setWorkspaceSetting(false);
          setChannelSetting(true);
        }}
        progress={42}
      />
      <ChannelSettingTutorial
        isOpen={channelSetting}
        onClose={() => {
          setChannelSetting(false);
          setIsTutorialOpen(false);
        }}
        onNext={() => {
          setChannelSetting(false);
          setChannelMember(true);
        }}
        progress={56}
      />
      <ChannelMemberTutorial
        isOpen={channelMember}
        onClose={() => {
          setChannelMember(false);
          setIsTutorialOpen(false);
        }}
        onNext={() => {
          setChannelMember(false);
          setVideoMeeting(true);
        }}
        progress={70}
      />
      <VideoMeetingTutorial
        isOpen={videoMeeting}
        onClose={() => {
          setVideoMeeting(false);
          setIsTutorialOpen(false);
        }}
        onNext={() => {
          setVideoMeeting(false);
          setUserStatus(true);
        }}
        progress={84}
      />
      <UserStatusTutorial
        isOpen={userStatus}
        onClose={() => {
          setUserStatus(false);
          setIsTutorialOpen(false);
        }}
        onNext={() => {
          setUserStatus(false);
          setIsTutorialOpen(false);
        }}
        progress={100}
      />
    </>
  );
};

export default Tutorial;
