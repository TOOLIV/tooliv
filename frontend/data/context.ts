import sidemenu from "/public/assets/images/sidemenu.png";
import workspace from "/public/assets/images/workspace.png";
import imo from "/public/assets/images/imo.png";
import chat from "/public/assets/images/chat.png";
import imochat from "/public/assets/images/imochat.png";
import chatgroup from "/public/assets/images/chatgroup.png";
import imomeeting from "/public/assets/images/imomeeting.png";
import meetinggroup from "/public/assets/images/meetinggroup.png";
import meeting from "/public/assets/images/meeting.png";
import { DescriptionType } from "../components/Content";

export const contexts: DescriptionType[] = [
  {
    id: 1,
    title: "팀별 작업 공간을 만들어 소통해 보세요.",
    description: [
      "Tooliv에서는 팀별 작업 공간을 만들어 업무를 진행할 수 있습니다.",
      "워크스페이스 내에서 그룹별로 새로운 채널을 개설하여",
      "대화 및 화상 미팅을 진행할 수 있어요.",
    ],
    mainImage: sidemenu,
    subImage: workspace,
    imoImage: imo,
  },
  {
    id: 2,
    title: "채팅을 통해 팀원들과 대화하세요.",
    description: [
      "채널에 참여한 팀 구성원들과 대화를 나눌 수 있습니다.",
      "협업에 필요한 다양한 자료를 빠르게 전송하여 업무 효율을 높여보세요.",
      "마크다운을 활용해 다양한 스타일로 대화를 나눠보세요.",
    ],
    mainImage: chat,
    subImage: chatgroup,
    imoImage: imochat,
  },
  {
    id: 3,
    title: "미팅룸으로 이동해 화상 회의를 진행해 보세요.",
    description: [
      "화상 회의 채널은 캠을 이용한 비대면 미팅 공간이에요.",
      "팀원들과 마주 보고 소통하여 업무 집중력을 높여보세요.",
      "화면을 공유할 내용이 있다면 화면 공유 기능도 활용하세요.",
    ],
    mainImage: meeting,
    subImage: meetinggroup,
    imoImage: imomeeting,
  },
];
