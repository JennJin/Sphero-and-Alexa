# Setting Up Local Sphero Server

Requirements:

-   [node.js](https://nodejs.org/)
-   [express.js](https://www.npmjs.com/package/express)
-   [sphero.js](https://github.com/orbotix/sphero.js)
-   [ngrok](https://ngrok.com/)
-   [Postman](https://www.getpostman.com/)

## Sphero Server

* Navigate to the 'sphero-server' folder.
* Run 'npm install' to install the node module dependencies.

## Install Postman and import Sphero Collection

Postman is an API development environment that allows developers to run
adhoc calls/requests to a REST API endpoint.

-   Install [Postman](https://www.getpostman.com/)
-   Import the Sphero Collection included in the Repo: Sphero.postman\_collection.json

## Connect to Sphero

**Mac**

To connect to your Sphero 1.0/2.0 or SPRK, you first need to pair it. To
pair your device on OS X, open the Bluetooth settings in **System
Preferences** \> **Bluetooth**. From this menu, locate your Sphero in
the Devices list and click the **Pair** button to pair it with your
computer.

Once you\'ve successfully paired your Sphero, open your terminal, go to
your `/dev` folder and locate the serial device connection (or use `ls -a
/dev \| grep tty.Sphero`) for your newly paired Sphero; it should look
something like tty.Sphero-RGB-AMP-SPP. Note, your device will likely be
different depending on its preset color code (the three colors your
Sphero cycles through when you first turn it on). The previous example
is for a Sphero with a Red, Green and Blue (RGB) color code.

Sphero port will be at:

`/dev/tty.Sphero-XXX-XXX-XXX`
  
**Windows**

To connect to your Sphero 1.0/2.0 or SPRK, you first need to pair it.
Locate the Bluetooth icon in the taskbar (or inside the system task tray
button) and follow the necessary steps to pair with your Sphero.

Once you\'ve successfully paired your Sphero, there are two options
available to you to check and see which serialport corresponds to the
Sphero you just connected. The first option is to right click on the
bluetooth icon in the task bar (same you use to pair), click on `Open
Settings`, when the settings window appears, navigate to the COM
Ports tab where you should see a list of ports which should list your
Sphero. If your Sphero is listed in more than one port, take note of the
one that has `RN-SPP` in the name, and use that one to connect. The list
should look something similar to:

Port      | Direction | Name
--------- | -------   | -------
COM3      | Outgoing  | Sphero-RPB 'RN-SPP'
COM4      | Incoming  | Sphero-RPB

In the above case, you should use serialport `COM3`.

The second option is to identify the port number. Click the `start` button
and type `device manager`. Once the program appears in the list, open it.
Navigate the tree of devices to Ports, there you should see a list of
COM ports, i.e. (`COM3, COM4`). From that port list, select the one that
belongs to your Sphero. If your Sphero name is not listed in the ports
list, you can either try them one by one or use the first method to
identify which port belongs to your Sphero.

The port address should look something like:

`COM2, COM3, COM4`

## Configure Sphero Server

Update `sphero-server/router/core/spheroCore.js` with the Sphero port
identified from previous step.

Look for line:

`var orb = sphero(\"\<Sphero Port\");`

Examples:

```
var orb = sphero(\"/dev/tty.Sphero-BRB-AMP-SPP\"); // mac
var orb = sphero(\"COM3\"); // windows
```
  
  
## Start Sphero Server

To start the server run the command:  

`sudo node apps.js`

### Test Server
Postman -  
GET Test Server

HTTP -  
`GET http://localhost:3000/`

Result:  
`Hello this is my web server`

### Test Connection with Sphero
Make sure computer is connected to Sphero via Bluetooth from *Connecting to Sphero/SPRK* steps from above.

Postman -  
POST Connect

HTTP -  
`POST http://localhost:3000/sphero/connect`

Response printed to Window should be:
`::SPHERO CONNECTED::`

*\<Screenshot of Terminal Window\>*

Once Sphero is connected, it should turn a solid 'pinkish-purple'.

### Test changing the color

Postman -  
POST Color-Green  

HTTP -  
`POST http://localhost:3000/sphero/color/green`

## Start Localhost Tunnel
For this project, we'll use ngrok to create a secure tunnel to the
Sphero Sever running locally. This removes the complexity and hassle of
configuring a secure public facing HTTPS server.

[Sign up](https://dashboard.ngrok.com/user/signup) for an account and download [ngrok](https://ngrok.com/).

Start the ngrok secure tunnel:  
`ngrok http \<listening port\>`

Example:
```
ngrok.exe http 3000 // windows
ngrok http 3000 // mac
```

If you change the port the Sphero Server is using (default 3000), make sure to update the port when starting the ngrok server.

Terminal Output:
```
Session Status online
Account John Doe
Version 2.2.8
Region United States (us)
Web Interface http://127.0.0.1:4040
Forwarding http://5d626552.ngrok.io -\> localhost:3000
Forwarding https://5d626552.ngrok.io -\> localhost:3000
```

*Note the http forwarding domain created.*
This will be needed for the Alexa Skill to know where send the User's
commands.
