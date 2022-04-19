import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilState } from "recoil";
import WorkSpace from "../../../containers/sidemenu/WorkSpace";
import { isOpenSide } from "../../../recoil/atom";

const Container = styled(motion.div)`
  margin-top: 24px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 0 50px 0 0;
`;

const SideMenu = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-80%" },
  };

  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  return (
    <Container
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      <WorkSpace />
    </Container>
  );
};

export default SideMenu;
