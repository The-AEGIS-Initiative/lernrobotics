## Dynamical systems


Control theory is a mathematical theory that deals with the control of continuous **dynamical systems**. A dynamical system is a time-dependent black-box function that takes in some inputs and returns some outputs.

*INSERT INTRODUCTION TO BLOCK DIAGRAMS*


In this case, our black-box function is our robot. We provide the robot with some inputs (via `self.set_acceleration`), and it returns an response such as an change in velocity. It is important to note that the inner workings of the black-box function is not important (hence the name). The same control theory principles can be applied to any dynamical system whether it may be our robot, a micromouse car, rockets, etc.

*INSERT BLOCK DIAGRAM OF ROBOT*
