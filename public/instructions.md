# Controls
Robobot controls are simple. You set the acceleration of the Robot with:
```
self.set_acceleration( acceleration )
```

***

# Robobot structure
Robobots are composed of components that you will create via code.

Components are represented as Python classes that extend the Component parent class.

The core of your robot is the `RobobotCore` component. This component is mandatory (cannot be renamed) and will be the core that keeps your Robobot together.

***

# Special Methods: `Start()` and `Update()`
In Robobot, robots operate in discrete frames spaced 0.02 seconds apart (50 fps). Each frame, the robot can sense
its environment and take logical actions.

All Robobots must have these 2 lifecycle methods:
 - `start(self)`

    Is executing once at the beginning when the robot is first initialized.

  - `update(self)`

    Is executed every frame (50 times per second). This is how your code will be able to interact
    dynamically with the game world.

***

# Doing Math with Python

To make your life easier when doing computation. We provide you access to the [NumPy](https://numpy.org/) package.
