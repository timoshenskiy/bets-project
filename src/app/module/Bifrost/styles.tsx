import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  background: black;
`;

const ControlPanel = styled.div`
  box-sizing: border-box;
  padding: 32px 128px;
  display: grid;
  gap: 16px;
`;

const IframeSrc = styled.div`
  max-width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
`;

const ReloadButton = styled.div`
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  background: white;
  color: black;
  width: fit-content;
  padding: 8px 16px;
  border-radius: 16px;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const ServiceIframe = styled.iframe`
  width: 100%;
  height: 100vh;
  min-width: 100vw;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  align-items: center;
  justify-content: center;
  animation-timing-function: ease;
  animation-duration: 1.0s;
  display: ${({ isLoading }: any) => isLoading ? 'flex' : 'none'};
  background: #000;
  animation-fill-mode: forwards;
`;

const Loader = styled.div`
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default {
  Container,
  ControlPanel,
  IframeSrc,
  ReloadButton,
  ServiceIframe,
  Content,
  Loader,
  LoaderWrapper,
};
