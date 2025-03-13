import React from 'react';
import { Card as MantineCard, Text, Image, Button } from '@mantine/core';

interface CardProps {
  image?: string;
  title: string;
  description: string;
  onButtonClick?: () => void;
  buttonLabel?: string;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  onButtonClick,
  buttonLabel = 'Learn More'
}) => {
  return (
    <MantineCard shadow="sm" padding="lg" radius="md" withBorder className="my-4">
      {image && <Image src={image} alt={title} height={160} />}
      <Text weight={500} size="lg" mt="md">
        {title}
      </Text>
      <Text size="sm" color="dimmed" mt="xs">
        {description}
      </Text>
      {onButtonClick && (
        <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </MantineCard>
  );
};

export default Card;
