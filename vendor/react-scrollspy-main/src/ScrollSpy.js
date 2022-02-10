/* eslint-disable no-undef */
import React, { useEffect } from "react";

const ScrollSpy = ({
  className = "active",
  offsetTop = 0,
  offsetLeft = 0,
  duration = 1000,
  children,
}) => {
  useEffect(() => {
    const sourceElements = [];
    const targetElements = [];

    const listTitleElements = [];
    const listSourceTitleElements = [];

    const listTargetElements = [];
    const listSourceElements = [];

    const childrenElements = Array.isArray(children) ? children : [children];

    let pendingScroll;

    const throttle = (fn, wait = 100) => {
      let timer;
      let time = Date.now();

      return (params) => {
        clearTimeout(timer);

        if (time + wait - Date.now() < 0) {
          fn(params);
          time = Date.now();
        } else {
          timer = setTimeout(fn, wait / 5);
        }
      };
    };

    const onScrollHandler = throttle(() => {
      const scrollElement =
        document.scrollingElement || document.documentElement;

      const top = {
        x: scrollElement.scrollLeft + offsetLeft,
        y: scrollElement.scrollTop + offsetTop,
      };

      const mergedSourced = [
        ...sourceElements,
        ...listSourceTitleElements,
        ...listSourceElements,
      ];
      const mergedElements = [
        ...targetElements,
        ...listTitleElements,
        ...listTargetElements,
      ];

      mergedSourced.map((source, i) => {
        const target = mergedElements[i];

        const visibleHorizontal =
          target.offsetLeft >= 0 &&
          top.x >= target.offsetLeft &&
          top.x < target.offsetLeft + target.offsetWidth;

        const visibleVertical =
          target.offsetTop >= 0 &&
          top.y >= target.offsetTop &&
          top.y < target.offsetTop + target.offsetHeight;

        if (visibleVertical && visibleHorizontal) {
          source.classList.add(className);
        } else {
          source.classList.remove(className);
        }

        return true;
      });
    });

    const onClickHandler = (event, targetTop, targetLeft, targetDuration) => {
      event.preventDefault();

      if (pendingScroll) return true;
      pendingScroll = true;

      const scrollElement =
        document.scrollingElement || document.documentElement;

      const scrollLimit = {
        x: Math.max(0, scrollElement.scrollWidth - window.innerWidth),
        y: Math.max(0, scrollElement.scrollHeight - window.innerHeight),
      };

      const scrollToPosition = {
        x: Math.min(Math.max(0, targetLeft), scrollLimit.x),
        y: Math.min(Math.max(0, targetTop), scrollLimit.y),
      };
      window.scrollTo(scrollToPosition.x, scrollToPosition.y);
    };

    const createArrays = (e, href, firstArr, secondArr) => {
      const self = e.ref && e.ref.current;

      const targetElement =
        href === "#" ? document.body : document.querySelector(href);

      if (targetElement) {
        self.onclick = (e) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          onClickHandler(
            e,
            targetElement.offsetTop - offsetTop,
            targetElement.offsetLeft - offsetLeft,
            // eslint-disable-next-line comma-dangle
            duration
          );
        firstArr.push(targetElement);
        secondArr.push(self);
      }
    };

    childrenElements.map((el) => {
      const { props } = el;
      const href = props && props.href;

      if (props.scrollSpyList === undefined) {
        createArrays(el, href, targetElements, sourceElements);
      } else {
        createArrays(el, href, listTitleElements, listSourceTitleElements);

        props.scrollSpyList.forEach((e) =>
          createArrays(e, e.href, listTargetElements, listSourceElements)
        );
      }

      return true;
    });

    if (targetElements.length || listTargetElements.length) {
      const ScrollEvent = new Event("scroll");
      window.addEventListener("scroll", onScrollHandler, { passive: true });
      window.dispatchEvent(ScrollEvent);
    }

    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, [children, className, duration, offsetTop, offsetLeft]);

  return <>{children}</>;
};

export default ScrollSpy;
