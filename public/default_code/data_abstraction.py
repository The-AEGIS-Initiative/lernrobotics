"""
-----------------------------------------------
DO NOT CHANGE
-----------------------------------------------
"""
from game.game_api import AEGISCore
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

        delta_pos = (self.cur_pos() - self.prev_pos())
        vel = delta_pos / self.cur_delta_time()
        self.set_acceleration( ((2.4,0) - vel) * 10)
    
    """
    -----------------------------------------------
    """


    """
    -----------------------------------------------
    YOUR CODE BELOW
    -----------------------------------------------
    """

    def cur_pos(self):
        """
        Calculate current robot position

        Returns
        -------
        (x, y) tuple of robot position

        Hint
        ----
        You may find self.data_history useful

        Recall that robot data is a dictionary
        containing the following keys:
            position
            wall_sensor
            object_sensor
            delta_time

        """
        pass

    def prev_pos(self):
        """
        Calculate previous robot position

        Returns
        -------
        (x, y) tuple of robot position

        Hint
        ----
        You may find self.robot_data_history useful

        Recall that robot data is a dictionary
        containing the following keys:
            position
            sensor
            delta_time

        """
        pass

    def cur_delta_time(self):
        """
        Calculate elapsed time between current frame and previous frame

        Returns
        -------
        delta_time 

        Hint
        ----
        You may find self.robot_data_history useful

        Recall that robot_data_history is an array of python
        dictionaries containing the following keys:
            position
            sensor
            delta_time

        The most recent robot data is appended to the end
        of the robot_data_history array

        """
        pass



