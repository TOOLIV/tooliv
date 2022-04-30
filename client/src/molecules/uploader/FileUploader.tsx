import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from 'shared/color';
import { workspaceImgType } from 'types/workspace/workspaceTypes';
import { ReactComponent as ImageIcon } from '../../assets/img/image.svg';

export const Container = styled.div`
  width: 280px;
  /* width: 100%; */
  height: 240px;
  margin: 30px auto;
  border: 5px dashed ${colors['gray200']};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

const Preview = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;
const UploadWrapper = styled.div`
  height: 100%;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const FileUploader = ({ file, onChange }: workspaceImgType) => {
  const [imgFile, setImgFile] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadBtnClick = () => {
    inputRef.current?.click();
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setIsLoading(true);
    const file = event.target.files!;
    onChange(file);
    // setImgFile(URL.createObjectURL(file[0]));
  };

  useEffect(() => {
    if (file) setImgFile(URL.createObjectURL(file));
    else setImgFile('');
  }, [file]);

  return (
    <Container onClick={handleUploadBtnClick}>
      <UploadInput
        type="file"
        id="inputImage"
        onChange={handleUploadImage}
        ref={inputRef}
        accept="image/*"
      />
      {imgFile ? (
        <Preview src={imgFile} />
      ) : (
        <UploadWrapper>
          {/* <Icons icon="image" width="42" height="42" color="blue100" /> */}
          <ImageIcon width={42} height={42} />
          <Text color="gray300" size={14}>
            5MB이내 PNG, JPG, GIF 파일
          </Text>
          <Button text="이미지 선택하기" />
        </UploadWrapper>
      )}
    </Container>
  );
};

export default FileUploader;
