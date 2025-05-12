/*
 * 환경설정 페이지 (10)
 */

import styled from 'styled-components';

const Settings = () => {
  return (
    <Container>
      <Text>Settings</Text>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.p`
  font-size: 24px;
  color: #333;
`;
