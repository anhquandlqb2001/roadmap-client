import React from "react";
import styled from "styled-components";
import Link from "next/link";

type RoadButtonType = {
  href: string;
  name: string;
  detail: string;
  disabled?: boolean;
};

const RoadButton = ({ href, name, detail, disabled }: RoadButtonType) => {
  return (
    <Link href={href} prefetch passHref>
      <StyledLink isDisabled={disabled}>
        <TextContainer>
          <ButtonText isDisabled={disabled}>{name}</ButtonText>
          <ButtonDetail isDisabled={disabled}>{detail}</ButtonDetail>
        </TextContainer>
      </StyledLink>
    </Link>
  );
};

const StyledLink = styled.a`
  width: 400px;
  background: #ffffff;
  box-shadow: ${(props) =>
    props.isDisabled
      ? "0px 2px 2px rgba(0,0,0,0.25)"
      : "-5px 6px 4px rgba(0, 0, 0, 0.25)"};

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
  color: ${(props) => (props.isDisabled ? "rgba(0,0,0,0.1)" : "#000000")};
  margin: 0 0 10px 0;
`;

const ButtonDetail = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => (props.isDisabled ? "rgba(0,0,0,0.1)" : "#6b6b6b")};
  margin: 3px 0;
  display: block; /* or inline-block */
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.6em;
`;

export default RoadButton;
