import { chakra, Stack, Center } from '@chakra-ui/react';

const HeroSection = () => {
  return (
    <Center p={[2, 5]}>
      <Stack direction="column" spacing={6} alignItems="center">
        <chakra.h1
          fontSize={{ base: '4xl', sm: '5xl' }}
          fontWeight="bold"
          textAlign="center"
        >
          Play, Learn, and Compete:&nbsp;
          <chakra.span
            color="teal"
            bg="linear-gradient(transparent 50%, #83e9e7 50%)"
          >
            Our Quiz App Has it All!
          </chakra.span>
        </chakra.h1>
      </Stack>
    </Center>
  );
};

export default HeroSection;
