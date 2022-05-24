import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { addWorkspaceMemberType } from 'types/workspace/workspaceTypes';
import { TimepickerUI } from 'timepicker-ui';
import Button from 'atoms/common/Button';
import { useParams } from 'react-router-dom';
import { autoChatFiles, autoChatMessage } from 'recoil/atom';
import { useRecoilState } from 'recoil';
import { reserveMessage } from 'api/reservationApi';
import { FileTypes } from 'types/common/fileTypes';
import AutoChatEditor from 'molecules/chat/AutoChatEditor';
import AutoFiles from 'organisms/chat/AutoFiles';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.7);
  ${(props) =>
    props.isOpen &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const Container = styled.div`
  width: 600px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 16px; */
`;

const Description = styled.div`
  margin-bottom: 16px;
`;

const Time = styled.div`
  width: 500px;
`;

const TimePicker = styled.input`
  /* width: 500px; */
  border: none;
  width: 500px;
  font-size: 50px;
`;

const ButtonBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-left: auto;
`;

const AutoChatModal = forwardRef<HTMLDivElement, addWorkspaceMemberType>(
  ({ isOpen, onClose }, ref) => {
    const { channelId } = useParams();
    const [files, setFiles] = useRecoilState<FileTypes[]>(autoChatFiles);
    const [content, setContent] = useRecoilState<string>(autoChatMessage);
    const tmRef = useRef(null);
    const [inputValue, setInputValue] = useState('10:00 PM');
    const [timeValue, setTimeValue] = useState({
      degreesHours: 270,
      degreesMinutes: 0,
      hour: '10',
      minutes: '00',
      type: 'PM',
    });
    const [returnTimeValue, setReturnTimeValue] = useState('');

    const testHandler = useCallback((e: CustomEvent) => {
      setTimeValue(e.detail);
      setInputValue(`${e.detail.hour}:${e.detail.minutes} ${e.detail.type}`);
    }, []);

    useEffect(() => {
      const date = new Date();
      const time = date.toISOString().split('T')[0];
      const initTime = time + 'T10:00:00';
      setReturnTimeValue(initTime);
      // return () => {
      //   setFiles([]);
      //   setContent('');
      // };
    }, []);
    useEffect(() => {
      const date = new Date();
      console.log(date.getFullYear());
      console.log(date.getMonth() + 1);
      console.log(date.getDate());
      // const year = Number(date.toISOString().split('T')[0].split('-')[0]);
      // const month = Number(date.toISOString().split('T')[0].split('-')[1]);
      // let day = Number(date.toISOString().split('T')[0].split('-')[2]);
      const year = Number(date.getFullYear());
      const month = Number(date.getMonth() + 1);
      let day = Number(date.getDate());

      const currentHour = Number(date.getHours());
      const currentMinutes = Number(date.getMinutes());

      const settingHour =
        timeValue.type === 'PM'
          ? Number(timeValue.hour) + 12
          : Number(timeValue.hour);
      const settingMinutes = Number(timeValue.minutes);

      if (
        currentHour > settingHour ||
        (currentHour <= settingHour && currentMinutes >= settingMinutes)
      ) {
        day = day + 1;
      }

      const formatMonth = month < 10 ? '0' + month : month;
      const formatMinutes =
        settingMinutes < 10 ? '0' + settingMinutes : settingMinutes;
      const returnTime =
        year +
        '-' +
        formatMonth +
        '-' +
        day +
        'T' +
        settingHour +
        ':' +
        formatMinutes +
        ':00';
      console.log(returnTime);
      setReturnTimeValue(returnTime);
    }, [inputValue]);

    useEffect(() => {
      const tm = tmRef.current as unknown as HTMLDivElement;

      const newPicker = new TimepickerUI(tm, {});
      newPicker.create();

      //@ts-ignore
      tm.addEventListener('accept', testHandler);

      return () => {
        //@ts-ignore
        tm.removeEventListener('accept', testHandler);
      };
    }, [testHandler]);

    const exitModal = useCallback(() => {
      // inputRef.current!.value = '';

      setFiles([]);
      setContent('');

      onClose();
    }, [onClose]);

    const reserveMessageApi = async () => {
      const formData = new FormData();
      console.log(files);
      files.forEach((file) => {
        formData.append('multipartFiles', file.object);
      });
      formData.append(
        'reservationCreateRequestDTO',
        new Blob(
          [
            JSON.stringify({
              channelId,
              sendTime: returnTimeValue,
              content,
            }),
          ],
          {
            type: 'application/json',
          }
        )
      );
      const response = await reserveMessage(formData);
      console.log(response);
      setFiles([]);
      setContent('');
    };
    return (
      <Modal isOpen={isOpen}>
        <Container ref={ref}>
          <Header>
            <Text size={18}>자동 메시지</Text>
            <Icons icon="xMark" width="32" height="32" onClick={exitModal} />
          </Header>
          <Description>
            <Text size={12}>
              설정한 시간에 매일 자동으로 메시지가 전송됩니다.
            </Text>
          </Description>
          <Time ref={tmRef}>
            <TimePicker
              type="test"
              className="timepicker-ui-input"
              defaultValue={inputValue}
            />
          </Time>
          <AutoFiles />
          <AutoChatEditor onClick={() => {}} />
          <ButtonBox>
            <Button
              width="125"
              height="35"
              text="취소"
              bgColor="gray300"
              onClick={exitModal}
            />
            <Button
              width="125"
              height="35"
              text="추가"
              onClick={reserveMessageApi}
            />
          </ButtonBox>
        </Container>
      </Modal>
    );
  }
);

export default AutoChatModal;
