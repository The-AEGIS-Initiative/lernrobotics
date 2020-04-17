## Proportional-Integral-Derivative (PID) Controller
The **PID controller** is a control loop feedback mechanism that is widely used in industrial control systems. The full mathematical defintion of a PID controller is as follows:
$$
    u(t) = K_pe(t) + K_i\int_{0}^{t}e(t^{'})dt^{'} + K_d\frac{de(t)}{dt}
$$
At each timestep, the PID controller calculates an error value $e(t)$ as the difference between a desired setpoint $v_{target}(t)$ and a measured system output $v(t)$. The controller then applies a correction to the system input $u(t)$ based on the proportional, integral, and derivative terms so that the measured system output $v(t)$ converges to the desired setpont $v_{target}(t)$.
