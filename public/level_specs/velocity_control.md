# Try it yourself!
Before we dive into P-controllers, try playing around with the naive approach in the skeleton code and see if you can finish the level. The idea here is to gradually reduce the acceleration as you approach the checkpoint. Feel free to try out any other ideas as well!

The problem with feedback-less approaches is that we don't know what acceleration will allow us to reach our target accurately. This is precisely the question that feedback loops can answer. **Feedback control loops use past measurable outputs of a system to determine appropriate future inputs such that the measurable outputs will converge to the setpoint**. Proportional controllers are a type of feedback control loop that sets the input proportional to the setpoint error.

# P-controller

The necessary calculations to implement a P-controller are summarized below:
$$
    u(t) = K_p*e(t)
$$
$$
   e(t) = v_{target} - v(t)
$$
$$
    v(t) = \frac{r(t) - r(t-\Delta t)}{\Delta t}
$$

The input, $u(t)$, is proportional to error to the setpoint, $e(t)$, by some constant $K_p$.

- The input $u(t)$ in our case is `self.set_acceleration(acc)`.

- The error term $e(t)$ is the **difference** between target velocity and current velocity.

- This constant $K_p$ should be hand tuned via trial and error until your robot achieves satisfactory performance.

To help you get started, we provided skeleton code containing methods:
- `calc_vel(self)`
- `calc_vel_error(self, target_vel)`
- `drive_at_vel(self, target_vel)`

Complete these methods to implement the P-controller

Goodluck!
