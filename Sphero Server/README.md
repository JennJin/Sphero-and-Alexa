# Speed to Value Workshop - Sphero In Action

1) Create a folder where you want to download the NPM nodules, for example:

mkdir robot && cd robot

2) Download the required modules:

npm install sphero serialport


3) Connect your Bluetooth to your Sphero

4) Run app.js as root, e.g. sudo node app.js

5) From POSTMAN, SOAPUI, etc. send a POST request to port 3001 to the following APIs:


    - To make shapes: http://IP:3001/sphero/shape/{shape}/color/{color}
    - To Change Colours: http://10.0.0.97:3001/sphero/color/{color}   - Notice it is color, not colour… This is just to be consistent with the Sphero internal APIs

Supported shapes and colors:

-	Colors: blue, pink, yellow, green, red, surprise (this is a random one every time)
-	Shapes: Square, Triangle, Line (it goes north and comes back)

That's it! Enjoying seeing your Sphero in Action via NodeJS...

Any question or comment drop an email to: barack.dorman@gmail.com

Thanks for watching...
