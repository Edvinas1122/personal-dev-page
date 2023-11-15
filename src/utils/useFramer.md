# Animation Management with Framer Motion and React Context
This document provides a guide on how to use withAnimationContext, AnimationProvider, and useFramerControl to manage animations in a React application using Framer Motion.

## Components and Hooks
- AnimationProvider: A context provider for the animation state.
withAnimationContext: A higher-order component to create motion components that automatically respond to animation state changes.
- useFramerControl: A hook for controlling the animation state from any component.
## Setup
1. Wrap Your Application with AnimationProvider
First, ensure that your application is wrapped with AnimationProvider to provide the animation context throughout your app.

```jsx
import { AnimationProvider } from './path/to/AnimationContext';

const App = () => {
  return (
    <AnimationProvider>
      {/* Rest of your application */}
    </AnimationProvider>
  );
};

export default App;
```
2. Create Motion Components with withAnimationContext
Use withAnimationContext to create motion components that are aware of the animation state.

```jsx
import { motion } from 'framer-motion';
import { withAnimationContext } from './path/to/withAnimationContext';

const MotionDiv = withAnimationContext(motion.div);
// Create other motion components similarly
```
3. Use Motion Components in Your Application
Use these motion components in your application. You can define variants for different animation states.

```jsx
const MyComponent = () => {
  const variants = {
    expanded: { opacity: 1, scale: 1.2 },
    contracted: { opacity: 0.5, scale: 1 }
  };

  return <MotionDiv variants={variants}>Content</MotionDiv>;
};
```
Controlling Animations
Using useFramerControl Hook
The useFramerControl hook allows you to control the animation state from any component.

```jsx
import useFramerControl from './path/to/useFramerControl';

const ControlComponent = () => {
  const { triggerAnimation } = useFramerControl();

  return (
    <div>
      <button onClick={() => triggerAnimation('expanded')}>Expand</button>
      <button onClick={() => triggerAnimation('contracted')}>Contract</button>
    </div>
  );
};
```

In this example, clicking the buttons will update the global animation state, causing all subscribed motion components to animate accordingly.