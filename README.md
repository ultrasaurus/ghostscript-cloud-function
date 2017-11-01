# Cloud Function using Ghostscript

This is an example of a Google Cloud Function using Ghostscript based on 
the idea that node modules can install native code that is in the same directory
as the Cloud Function's source code.

* Node library that wraps Ghostscript command line: https://github.com/sina-masnadi/node-gs
* Compiled Ghostscript which is used via git submodule: https://github.com/sina-masnadi/lambda-ghostscript

I don't know if this a good idea, rather it was an experiment in learning more
about the experience of using Cloud Storage events to trigger Cloud Functions
with the Firebase development experience.

To use this in your own project, the following steps should work.  I haven't
tested them, so if anyone is reading this, and it works, please do a PR and
remove this note (or ask me questions on twitter @ultrasaurus if these don't
work and I'll see if I can figure it out again!)

Pre-requisites:

```
nvm use 6.11   # or whatever you use to install Node 6.11.x 
npm install -g firebase-tools
```

Steps:

1. Create a new project in the [Firebsae Console](https://console.firebase.google.com/)
2. clone this repo  
3. In your terminal:
```
cd ghostscript-cloud-function
git submodule update --init
firebase deploy --only functions
```
4. In the Firebase Console, on the Storage tab you can upload a PDF, and a
PNG should appear in a few seconds.
5. You can look at the verbose logs in the Functions tab to see what is going
on. 