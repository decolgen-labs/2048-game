import { Box } from "@chakra-ui/react";
import React from "react";
interface IProps {
  top?: number;

  right?: number;
  left?: number;
  bottom?: number;
  rotate: number;
}
//  position: absolute;
//   height: 14px;
//   width: 14px;
//   border: 1px solid rgba(64, 233, 241, 1);
//   top: ${(props) => props.top}px;
//   left: ${(props) => props.left}px;
//   bottom: ${(props) => props.bottom}px;
//   right: ${(props) => props.right}px;
//   transform: rotate(${(props) => props.rotate}deg);
//   border-right: none;
//   border-bottom: none;
const BlockConner = ({ top, left, right, bottom, rotate }: IProps) => {
  return (
    <Box
      position="absolute"
      h="14px"
      width="14px"
      border=" 1px solid rgba(64, 233, 241, 1)"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      borderRight="none"
      borderBottom="none"
      transform={`rotate(${rotate}deg)`}
    />
  );
};

export default BlockConner;
