import styled from '@emotion/styled';
import { fileUpload } from 'api/fileApi';
import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import { useRecoilState } from 'recoil';
import {
  autoChatFileNames,
  autoChatFiles,
  autoChatFileUrl,
  chatFileNames,
  chatFiles,
  chatFileUrl,
  isDragging,
} from 'recoil/atom';
import { FileTypes } from 'types/common/fileTypes';

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 3;
  position: absolute;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const DragDrop = () => {
  const [files, setFiles] = useRecoilState<FileTypes[]>(autoChatFiles);
  const [fileUrl, setFileUrl] = useRecoilState<string[]>(autoChatFileUrl);
  const [fileNames, setFileNames] = useRecoilState<string[]>(autoChatFileNames);
  const [isDrag, setIsDragging] = useRecoilState<boolean>(isDragging);
  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: FileTypes[] = files;

      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
          },
        ];
      }

      setFiles(tempFiles);
      const formData = new FormData();
      tempFiles.forEach((file) => {
        formData.append('multipartFiles', file.object);
      });
      fileUpload(formData).then((res) => {
        setFileUrl(res.data.fileUrlList);
        setFileNames(res.data.fileList);
      });
    },
    [files]
  );

  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: FileTypes) => file.id !== id));
    },
    [files]
  );

  const handleDragIn = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    [isDrag]
  );

  const handleDragOut = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    [isDrag]
  );

  const handleDragOver = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer!.files) {
        setIsDragging(true);
      }
    },
    [isDrag]
  );

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <Container>
      <input
        type="file"
        id="fileUpload"
        style={{ display: 'none' }}
        multiple={true}
        onChange={onChangeFiles}
      />

      <label htmlFor="fileUpload" ref={dragRef}>
        <Wrapper />
      </label>
    </Container>
  );
};

export default DragDrop;
