import styled from 'styled-components';

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  margin-top: 5rem;
  margin-bottom: 2rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ContentContainer;
