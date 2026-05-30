import { useEffect, useRef } from "react";
import { Animated } from "react-native";

type EntranceOptions = {
  delay?: number;
  duration?: number;
};

/** Fade-in entrance (opacity only — avoids Android translateY transform bugs). */
export function useGsapEntrance(options: EntranceOptions = {}) {
  const { delay = 0, duration = 700 } = options;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [delay, duration, opacity]);

  return {
    style: {
      opacity,
    },
  };
}

export function useGsapStagger(
  itemCount: number,
  options: { stagger?: number; baseDelay?: number } = {}
) {
  const { stagger = 100, baseDelay = 150 } = options;
  const items = useRef(
    Array.from({ length: itemCount }, () => ({
      opacity: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    items.forEach((item, index) => {
      Animated.timing(item.opacity, {
        toValue: 1,
        duration: 600,
        delay: baseDelay + index * stagger,
        useNativeDriver: true,
      }).start();
    });
  }, [items, baseDelay, stagger]);

  return items.map((item) => ({
    style: {
      opacity: item.opacity,
    },
  }));
}
