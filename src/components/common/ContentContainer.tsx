import styled from 'styled-components';

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ContentContainer;
