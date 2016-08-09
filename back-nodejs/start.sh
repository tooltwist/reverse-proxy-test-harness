#!/bin/bash
#
#	Start the backend servers
#

PORT=9001 CCODE=au node backend-server-18773.js &
PORT=9002 CCODE=nz node backend-server-18773.js &
PORT=9003 CCODE=us node backend-server-18773.js &
