import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';
import { HistoryCardProps } from './types';

const HistoryCard: React.FC<HistoryCardProps> = (props) => {
  return (
    <Container>
        <Text>HistoryCard</Text>
    </Container>
  );
}

export default HistoryCard;