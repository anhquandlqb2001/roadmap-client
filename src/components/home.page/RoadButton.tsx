import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Button } from "@material-ui/core";

type Props = {
  href: string;
  name: string;
  intro: string;
  disabled?: boolean;
  id: string;
};

const RoadButton = ({ href, name, intro, disabled }: Props) => {
  return (
    <Button style={{backgroundColor: "transparent"}} disabled={disabled}>
      <Link href={href} passHref>
        <StyledLink isDisable={disabled}>
          <TextContainer>
            <ButtonText>{name}</ButtonText>
            <ButtonDetail>{intro}</ButtonDetail>
          </TextContainer>
        </StyledLink>
      </Link>
    </Button>
  );
};


const StyledLink = styled.a<{ isDisable: boolean }>`
  width: 400px;
  background: #ffffff;
  box-shadow: ${(props) =>
    props.isDisable
      ? " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      : "rgba(149, 157, 165, 0.2) 0px 8px 24px"};

  color: ${(props) =>
    props.isDisable ? "rgba(0,0,0,0.15) !important" : "rgba(0,0,0,0.7)"};
  border-radius: 5px;
  margin: 0 auto;
  text-decoration: none;
  height: 120px;
  display: flex;
  align-items: center;
  transition: transform 0.15s ease-in-out;

  ${(props) =>
    props.isDisable
      ? `
        cursor: default;
      `
      : `
  :hover {
    transform: translateY(-3px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    color: rgba(0,0,0,0.8);
  }
  `}
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
  color: inherit;
`;

const ButtonDetail = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  margin: 3px 0;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.6em;
  color: inherit;
`;

export default RoadButton;
