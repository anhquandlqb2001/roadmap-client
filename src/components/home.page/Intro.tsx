import React from "react";
import styled from "styled-components";

const Intro = () => {
  return (
    <IntroContainer>
      <div>
        <IntroText>LỘ TRÌNH HỌC TẬP DÀNH CHO LẬP TRÌNH VIÊN</IntroText>
        <IntroDetail>
          cung cấp các tài liệu và từng bước cụ thể để học một ngôn ngữ, công
          nghệ
        </IntroDetail>
      </div>
    </IntroContainer>
  );
};

const IntroContainer = styled.div`
  height: 200px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IntroText = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  text-align: center;
  color: #000000;
  margin: 20px auto;
`;

const IntroDetail = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 29px;
  text-align: center;
  color: #797373;
`;

export default Intro;
