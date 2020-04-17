# API
## **AEGISCore class**
Contains all functionality of your robot. Extend this class when creating your own custom classes.
- **`set_acceleration(self, acceleration)`**

  Set desired robot acceleration

  Parameters:
    - acceleration
      - (x, y) tuple

  Returns:
    - None

  Examples:
    - `self.set_acceleration((0,2))`
    - `self.set_acceleration(np.array([0,2]))`
    - `self.set_acceleration([0,2])`

- **`robot_data_history`**

  Array of all past and current robot_data

  Examples:
    - `self.robot_data_history[0] #robot_data at t=0`
    - `self.robot_data_history[-1].position # most recent position`

## **RobotData class**
Data structure containing robot_data from a frame update. 
- Data fields
  - **`position`**
    - (x, y) tuple
    - cartesian coordinates of robot
  - **`delta_time`**
    - float
    - delta time since last update
    - Examples:

      `delta_time = self.currentSensorData().delta_time`

      cur_pos = self.currentSensorData().position
      prev_pos = self.prevSensorData().position
      delta_time = self.currentSensorData().delta_time

      velocity = (cur_pos - prev_pos) / delta_time

  - **`sensor`**
    - function: sensor(angle)
      - parameters:
        - angle (measured in degrees clockwise from north)
      - returns:
        - object info dictionary:
          - position (x, y)
          - type ('wall', 'exit', 'robot')
    - Examples:
      `self.robot_data_history[-1].wall_sensor(0)`
        - returns current object info north of robot

      `self.robot_data_history[-1].wall_sensor(90)`
        - returns current object info east of robot

      `self.robot_data_history[-1].wall_sensor(180)`
        - returns current object info south the robot





