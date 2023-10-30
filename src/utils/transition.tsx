import React, { useContext, useEffect, useRef } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

const TransitionContext = React.createContext({
  parent: {} as ParentContextType,
});

type ParentContextType = {
  show?: boolean;
  isInitialRender: boolean;
  appear?: boolean;
};

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

type CSSTransitionProps = {
  show: boolean;
  enter?: string;
  enterStart?: string;
  enterEnd?: string;
  leave?: string;
  leaveStart?: string;
  leaveEnd?: string;
  appear?: boolean;
  unmountOnExit?: boolean;
  tag?: string;
  children: React.ReactNode;
};

function CSSTransition({
  show,
  enter = '',
  enterStart = '',
  enterEnd = '',
  leave = '',
  leaveStart = '',
  leaveEnd = '',
  appear,
  unmountOnExit,
  tag = 'div',
  children,
  ...rest
}: CSSTransitionProps) {
  const enterClasses = enter.split(' ').filter((s) => s.length);
  const enterStartClasses = enterStart.split(' ').filter((s) => s.length);
  const enterEndClasses = enterEnd.split(' ').filter((s) => s.length);
  const leaveClasses = leave.split(' ').filter((s) => s.length);
  const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length);
  const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length);
  const removeFromDom = unmountOnExit;

  function addClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.add(...classes);
  }

  function removeClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.remove(...classes);
  }

  const nodeRef = useRef<HTMLElement | null>(null);
  const Component: any = tag;

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done: (this: HTMLElement, ev: TransitionEvent) => any) => {
        nodeRef.current?.addEventListener('transitionend', done, false);
      }}
      onEnter={() => {
        const currentRef = nodeRef.current;
        if (!removeFromDom) currentRef?.style.removeProperty('display');
        addClasses(currentRef!, [...enterClasses, ...enterStartClasses]);
      }}
      onEntering={() => {
        removeClasses(nodeRef.current!, enterStartClasses);
        addClasses(nodeRef.current!, enterEndClasses);
      }}
      onEntered={() => {
        removeClasses(nodeRef.current!, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(nodeRef.current!, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        removeClasses(nodeRef.current!, leaveStartClasses);
        addClasses(nodeRef.current!, leaveEndClasses);
      }}
      onExited={() => {
        const currentRef = nodeRef.current;
        if (currentRef) {
          removeClasses(currentRef, [...leaveEndClasses, ...leaveClasses]);
          if (!removeFromDom) currentRef.style.display = 'none';
        }
      }}
    >
      <Component ref={nodeRef} {...rest as { children?: React.ReactNode }} style={{ display: !removeFromDom ? 'none' : null }}>
        {children}
      </Component>


    </ReactCSSTransition>
  );
}

type TransitionProps = {
  show?: boolean;
  appear?: boolean;
} & CSSTransitionProps;

function Transition({ show, appear, ...rest }: TransitionProps) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition appear={parent.appear || !parent.isInitialRender} show={parent.show || false} {...rest} />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show: show || false,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear || false} show={show || false} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
