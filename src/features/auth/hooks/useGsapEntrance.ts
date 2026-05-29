import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { gsap } from "gsap";

type EntranceOptions = {
  delay?: number;
  duration?: number;
  y?: number;
};

export function useGsapEntrance(options: EntranceOptions = {}) {
  const { delay = 0, duration = 0.7, y = 40 } = options;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(y)).current;

  useEffect(() => {
    const state = { y, opacity: 0 };

    gsap.to(state, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
      onUpdate: () => {
        translateY.setValue(state.y);
        opacity.setValue(state.opacity);
      },
    });
  }, [delay, duration, opacity, translateY, y]);

  return {
    style: {
      opacity,
      transform: [{ translateY }],
    },
  };
}

export function useGsapStagger(
  itemCount: number,
  options: { stagger?: number; baseDelay?: number } = {}
) {
  const { stagger = 0.1, baseDelay = 0.15 } = options;
  const animatedValues = useRef(
    Array.from({ length: itemCount }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(30),
    }))
  ).current;

  useEffect(() => {
    animatedValues.forEach((item, index) => {
      const state = { y: 30, opacity: 0 };

      gsap.to(state, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: baseDelay + index * stagger,
        ease: "power3.out",
        onUpdate: () => {
          item.translateY.setValue(state.y);
          item.opacity.setValue(state.opacity);
        },
      });
    });
  }, [animatedValues, baseDelay, stagger]);

  return animatedValues.map((item) => ({
    style: {
      opacity: item.opacity,
      transform: [{ translateY: item.translateY }],
    },
  }));
}
