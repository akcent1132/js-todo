import React from 'react';
import { View, Animated } from 'react-native';

const MicrophoneIconRN = ({ 
  size = 40, 
  color = '#333',
  isRecording = false,
  isMuted = false,
  showSoundWaves = true
}) => {
  // Animation for sound waves
  const waveAnim1 = React.useRef(new Animated.Value(0)).current;
  const waveAnim2 = React.useRef(new Animated.Value(0)).current;
  const waveAnim3 = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (showSoundWaves && !isMuted) {
      const createWaveAnimation = (animValue, delay) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const wave1 = createWaveAnimation(waveAnim1, 0);
      const wave2 = createWaveAnimation(waveAnim2, 300);
      const wave3 = createWaveAnimation(waveAnim3, 600);

      wave1.start();
      wave2.start();
      wave3.start();

      return () => {
        wave1.stop();
        wave2.stop();
        wave3.stop();
      };
    }
  }, [showSoundWaves, isMuted]);

  React.useEffect(() => {
    if (isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      return () => pulse.stop();
    }
  }, [isRecording]);

  const micColor = isRecording ? '#FF3B30' : color;
  const waveColor = isRecording ? '#FF3B30' : color;

  const styles = {
    container: {
      position: 'relative',
      width: size,
      height: size * 1.4,
      alignItems: 'center',
      justifyContent: 'flex-start',
      opacity: isMuted ? 0.5 : 1,
    },
    micCapsule: {
      width: size * 0.5,
      height: size * 0.7,
      backgroundColor: micColor,
      borderTopLeftRadius: size * 0.25,
      borderTopRightRadius: size * 0.25,
      borderBottomLeftRadius: size * 0.1,
      borderBottomRightRadius: size * 0.1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      zIndex: 3,
    },
    micBody: {
      width: size * 0.15,
      height: size * 0.3,
      backgroundColor: micColor,
      marginTop: -size * 0.05,
      borderBottomLeftRadius: size * 0.075,
      borderBottomRightRadius: size * 0.075,
      zIndex: 2,
    },
    standContainer: {
      marginTop: size * 0.05,
      alignItems: 'center',
      zIndex: 1,
    },
    standVertical: {
      width: size * 0.08,
      height: size * 0.25,
      backgroundColor: micColor,
      borderRadius: size * 0.04,
    },
    standHorizontal: {
      width: size * 0.6,
      height: size * 0.08,
      backgroundColor: micColor,
      borderRadius: size * 0.04,
      marginTop: -size * 0.04,
    },
    soundWavesContainer: {
      position: 'absolute',
      right: -size * 0.3,
      top: size * 0.2,
      zIndex: 1,
    },
    wave: {
      position: 'absolute',
      borderWidth: 2,
      borderColor: waveColor,
      borderRadius: 999,
    },
    wave1: {
      width: size * 0.3,
      height: size * 0.3,
    },
    wave2: {
      width: size * 0.5,
      height: size * 0.5,
      top: -size * 0.1,
      left: -size * 0.1,
    },
    wave3: {
      width: size * 0.7,
      height: size * 0.7,
      top: -size * 0.2,
      left: -size * 0.2,
    },
    mutedLine: {
      position: 'absolute',
      top: size * 0.1,
      left: size * 0.1,
      right: size * 0.1,
      bottom: size * 0.3,
      zIndex: 10,
    },
    mutedLineInner: {
      flex: 1,
      backgroundColor: '#FF3B30',
      transform: [{ rotate: '45deg' }],
      width: 3,
      alignSelf: 'center',
    },
  };

  const waveOpacity1 = waveAnim1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 0],
  });

  const waveOpacity2 = waveAnim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 0],
  });

  const waveOpacity3 = waveAnim3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 0],
  });

  const waveScale1 = waveAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.2],
  });

  const waveScale2 = waveAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.2],
  });

  const waveScale3 = waveAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.2],
  });

  return (
    <View style={styles.container}>
      {/* Microphone capsule/head */}
      <Animated.View 
        style={[
          styles.micCapsule,
          isRecording && {
            transform: [{ scale: pulseAnim }],
          }
        ]} 
      />
      
      {/* Microphone body */}
      <View style={styles.micBody} />
      
      {/* Microphone stand/base */}
      <View style={styles.standContainer}>
        <View style={styles.standVertical} />
        <View style={styles.standHorizontal} />
      </View>
      
      {/* Sound waves */}
      {showSoundWaves && !isMuted && (
        <View style={styles.soundWavesContainer}>
          <Animated.View 
            style={[
              styles.wave,
              styles.wave1,
              {
                opacity: waveOpacity1,
                transform: [{ scale: waveScale1 }],
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.wave,
              styles.wave2,
              {
                opacity: waveOpacity2,
                transform: [{ scale: waveScale2 }],
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.wave,
              styles.wave3,
              {
                opacity: waveOpacity3,
                transform: [{ scale: waveScale3 }],
              }
            ]} 
          />
        </View>
      )}
      
      {/* Muted indicator */}
      {isMuted && (
        <View style={styles.mutedLine}>
          <View style={styles.mutedLineInner} />
        </View>
      )}
    </View>
  );
};

export default MicrophoneIconRN;