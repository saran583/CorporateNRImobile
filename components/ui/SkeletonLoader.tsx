import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const SkeletonLoader = ({ width, height, borderRadius = 4 }) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, []);
  
    const shimmerColor = shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#e0e0e0", "#f5f5f5"], // Light and dark shimmer effect
    });
  
    return <Animated.View style={[styles.skeleton, { width, height, borderRadius, backgroundColor: shimmerColor }]} />;
  };

export default SkeletonLoader;

  const styles = StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center", padding: 20 },
    textContainer: { marginLeft: 10 },
    skeleton: { marginBottom: 5 },
  });