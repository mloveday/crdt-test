import { NextApiHandler } from 'next';

const docs: Record<string, string> = {};
const changes: Record<string, string[]> = {};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    if (req.body.doc) {
      docs[req.body.key] = req.body.doc;
      console.log(docs[req.body.key]);
    }
    if (req.body.changes) {
      console.log('req-changes', req.body.changes);
      changes[req.body.key] = changes[req.body.key]
        ? [...changes[req.body.key], ...req.body.changes]
        : req.body.changes;
      console.log('all-changes', changes[req.body.key]);
    }
    res.json({
      doc: docs[req.body.key],
      changes: changes[req.body.key],
    });
    return;
  }
  if (req.method === 'GET') {
    res.json(docs[req.query.key as string]);
    console.log(docs[req.query.key as string]);
    return;
  }
  res.status(400);
  res.json({ bad: 'method' });
}

export default handler;