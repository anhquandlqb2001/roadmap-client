import React from "react";
import styled from "styled-components";
import Link from "next/link";

type RoadButtonType = {
  href: string;
  name: string;
  intro: string;
  disabled?: boolean;
  id: string;
};

const RoadButton = ({ href, name, intro, disabled }: RoadButtonType) => {
  return (
    <Link href={href} passHref>
      <StyledLink isDisable={disabled}>
        <TextContainer>
          <ButtonText>{name}</ButtonText>
          <ButtonDetail>{intro}</ButtonDetail>
        </TextContainer>
      </StyledLink>
    </Link>
  );
};
const StyledLink = styled.a<{ isDisable: boolean }>`
  width: 400px;
  background: #ffffff;
  box-shadow: ${(props) =>
    props.isDisable
      ? " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      : "rgba(149, 157, 165, 0.2) 0px 8px 24px"};

  color: ${(props) => props.isDisable && "rgba(0,0,0,0.15)"};
  border-radius: 5px;
  margin: 0 auto;
  text-decoration: none;
  height: 120px;
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  margin: 0 20px;
  height: 80%;
`;

const ButtonText = styled.h4`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  margin: 0 0 10px 0;
`;

const ButtonDetail = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  margin: 3px 0;
  display: block; /* or inline-block */
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.6em;
`;

export default RoadButton;
