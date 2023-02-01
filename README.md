# CRDT test

Trying out Automerge CRDTs for updating some simple state & sharing between instances.

Uses Next.js for quick & dirty server with API & client rendering.

## Running locally

Install dependencies with `npm i`

Run local server with `npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser

## Notes

TODOs:
- Add websockets/SSE for real-time updates across multiple clients 
- Add backend data store (e.g. redis) for more permanent storage of changes
- Investigate whether we need to store the document server-side at all (NB assume not)
- Change the data to be something a little more complex (e.g. bookmarks with metadata & option to delete)
- Add some styling...
