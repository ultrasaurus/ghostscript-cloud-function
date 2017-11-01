These are my notes from suing the Firebase CLI to interactively test 
the function. See [firebase docs](https://firebase.google.com/docs/functions/local-emulator)
for more info.  I don't have complete steps since I need to go back and

```
npm install -g firebase-tools
firebase --version
# 3.14.0
cd functions
firebase serve --only functions # to only emulate functions
```

hmm... this used to work, but now it just shows this:

```
i  functions: Preparing to emulate functions.
```

and hangs...

before I could do this and it would emulate my Cloud Function

```
doSomething(
   { kind: 'storage#object',
     resourceState: 'exists',
     id: 'gs-example.appspot.com/sand-contour-map.jpg/1507280848709169',
     selfLink: 'https://www.googleapis.com/storage/v1/b/gs-example.appspot.com/o/sand-contour-map.jpg',
     name: 'sand-contour-map.jpg',
     bucket: 'gs-example.appspot.com',
     generation: '1507280848709169',
     metageneration: '1',
     contentType: 'image/jpeg',
     timeCreated: '2017-10-06T09:07:28.666Z',
     updated: '2017-10-06T09:07:28.666Z',
     storageClass: 'STANDARD',
     size: '153355',
     md5Hash: 'YThiYThjNmUzZTRhZGE3OGM2NmNjYjQ5NGJlNDEzOGY=',
     mediaLink: 'https://www.googleapis.com/download/storage/v1/b/gs-example.appspot.com/o/sand-contour-map.jpg?generation=1507280848709169&amp;alt=media',
     contentDisposition: 'inline; filename*=utf-8\'\'sand-contour-map.jpg',
     metadata: { firebaseStorageDownloadTokens: '1cb6d00d-08fe-4bf2-9a9e-f4a70d78c961' },
     crc32c: 'kbSHCQ==' })
```

I first tried this, based on console.log, I think...

```
doSomething({ timestamp: '2017-10-06T09:07:28.709Z',
  eventType: 'providers/cloud.storage/eventTypes/object.change',
  resource: 'projects/_/buckets/gs-example.appspot.com/objects/sand-contour-map.jpg#1507280848709169',
  data: 
   { kind: 'storage#object',
     resourceState: 'exists',
     id: 'gs-example.appspot.com/sand-contour-map.jpg/1507280848709169',
     selfLink: 'https://www.googleapis.com/storage/v1/b/gs-example.appspot.com/o/sand-contour-map.jpg',
     name: 'sand-contour-map.jpg',
     bucket: 'gs-example.appspot.com',
     generation: '1507280848709169',
     metageneration: '1',
     contentType: 'image/jpeg',
     timeCreated: '2017-10-06T09:07:28.666Z',
     updated: '2017-10-06T09:07:28.666Z',
     storageClass: 'STANDARD',
     size: '153355',
     md5Hash: 'YThiYThjNmUzZTRhZGE3OGM2NmNjYjQ5NGJlNDEzOGY=',
     mediaLink: 'https://www.googleapis.com/download/storage/v1/b/gs-example.appspot.com/o/sand-contour-map.jpg?generation=1507280848709169&amp;alt=media',
     contentDisposition: 'inline; filename*=utf-8\'\'sand-contour-map.jpg',
     metadata: { firebaseStorageDownloadTokens: '1cb6d00d-08fe-4bf2-9a9e-f4a70d78c961' },
     crc32c: 'kbSHCQ==' },
  params: {} })
  ```