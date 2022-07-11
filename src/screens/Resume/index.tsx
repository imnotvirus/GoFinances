import React from 'react';
import { Text } from 'react-native';

import { Container, Header, Title } from './styles';
import { ResumeProps } from './types';

const Resume: React.FC<ResumeProps> = (props) => {
  return (
    <Container>
      <Header>
        <Title>Resume</Title>
      </Header>
    </Container>
  );
}

export default Resume;