# Data Abstraction
**Abstraction barriers** are what separate the layers of logic in a program. Properly placed abstraction barriers allow us to work with each layer without being aware of all the layers beneath it. Building abstraction barriers to compose maintainable and tractable programs is an important computer science fundamental and will be an recurring concept in this game.

# Robobot Data Structure
All classes that extend the `AEGISCore` parent class have access to **`robot_data_history`** class variable.

`robot_data_history` is an array of the data your robot collects each frame update. The most recent data is appended to the end of `robot_data_history` array. You can index `robot_data_history` to get your robot_data from any point in time.

For reference, robot_data is an data structure that looks like:
```python
#robot_data
{
position: (0,0) # cartesian coordinate of robot
delta_time: 0.02 # delta time since last frame update
sensor: object_sensor(heading) # function that returns visible object information
}
```
\
For example, you can get the **current position** of your Robobot like this:
```python
self.robot_data_history[-1].position
```

You can get the **previous position** of your Robobot like this:
```python
self.robot_data_history[-2].position
```

# Wall Sensor and Object Sensor
You may notice that the robot_data data structure contains a `sensor` key.

The `sensor(heading)` function takes in an angle (measured clockwise relative to north) and returns information about any object in that direction.

You can get the current wall position **directly ahead** of your robot like this:
```python
self.robot_data_history[-1].sensor(0) # 0 degrees heading clockwise
```

You can get the current wall position **to the right** of your robot like this:
```python
self.robot_data_history[-1].sensor(90) # 90 degrees heading clockwise
```

You can get the current wall position **directly behind** your robot like this:
```python
self.robot_data_history[-1].sensor(180) # 180 degrees heading clockwise
```

You can get the current wall position **to the left** of your robot like this:
```python
self.robot_data_history[-1].sensor(270) # 270 degrees heading clockwise
```
