import styled from "styled-components";

export const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 20px;
  width: 170px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #111;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;

export const StyledPlayButtonWrapper = styled.div``;
export const StyledPlayButton = styled.div`
  background: url(/assets/btn/play_btn.svg);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  color: rgba(64, 233, 241, 1);
  border: none;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  width: 150px;
  span {
    margin-left: 8px;
  }
  &:hover {
    background: url(/assets/btn/play_btn_hover.svg);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
