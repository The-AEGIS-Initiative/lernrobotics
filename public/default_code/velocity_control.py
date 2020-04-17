from game.game_api import Component
import numpy as np

class Robobot(AEGISCore):

    def start(self):
        """
        start function is called at the beginning of the game

        Write initialization code here
        """
        print("Robot Initialized")

    def update(self):
        """
        update function is called every frame of the game

        Write code here to dynamically control your robot
        """

        # This is a naive approach without feedback
        decay = 0.9999
        self.set_acceleration( np.array([0,10]) * decay )



        # Proportional feedback approach
        # Uncomment the following line after implementing required methods
        
        # self.move_at_vel( (0, 1.5) )

    def move_at_vel(self, target_vel):
        """
        Apply the necessary acceleration u(t)
        that will drive the robot at the target_vel

        Returns
        -------
        None

        Hint
        ----
        You will need to use self.set_acceleration(acceleration)
        """

        # Calculate difference between setpoint and target velocity
        vel_error = self.calc_vel_error(target_vel)

        pass

    def calc_vel_error(self, target_vel):
        """
        Calculate velocity error e(t)

        e(t) is the difference between the desired setpoint
        target_vel and the current robot velocity v(t)

        Returns
        -------
        (x,y) tuple of the velocity error
        """

        # Current velocity
        vel = self.calc_vel()

        pass

    def calc_vel(self):
        """
        Calculate current robot velocity v(t)

        Returns
        -------
        (x,y) tuple of the current robot velocity

        Hint
        ----
        You may find self.robt_data_history() useful

        Recall that robot data is a dictionary
        containing the following data:
            position
            sensor
            delta_time

        """
        pass