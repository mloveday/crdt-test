import * as Automerge from '@automerge/automerge';
import React, { useEffect, useState } from 'react';

const normalizeUint8Array = (serialized: Record<number, number>): Uint8Array => Uint8Array.from(
  (Object.entries(serialized)).reduce((acc: number[], [k, v]) => {
    acc[parseInt(k, 10)] = v;
    return acc;
  }, [])
);

type SyncResponse = { doc: Record<number, number>, changes: Record<number, number>[] };

const sync = async (body: BodyInit): Promise<SyncResponse> => fetch('/api/sync', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body,
}).then(r => r.json());

type DocType = { text: string };

const CrdtTestComponent = () => {
  const [doc, setDoc] = React.useState(Automerge.init<DocType>());
  const [localText, setLocalText] = useState('');
  console.log(doc.text);

  const handleSyncResponse = (r: SyncResponse) => {
    const parsedDoc = Automerge.load<DocType>(normalizeUint8Array(r.doc));
    const final = Automerge.merge(Automerge.clone(doc), parsedDoc);
    if (r.changes !== undefined) {
      console.log(r.changes);
      const [finalWithMerge] = Automerge.applyChanges(Automerge.clone(final), r.changes.map(normalizeUint8Array));
      setDoc(finalWithMerge);
    } else {
      setDoc(final);
    }
  };

  useEffect(() => {
    sync(JSON.stringify({
      doc: Automerge.save(doc),
      key: 'some-key',
      user: 'some-user',
    })).then(handleSyncResponse);
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setLocalText(ev.target.value);
    const newDoc = Automerge.change(doc, (d: DocType) => {
      d.text = ev.target.value;
    });
    sync(JSON.stringify({
      changes: Automerge.getChanges(doc, newDoc),
      key: 'some-key',
      user: 'some-user',
    })).then(handleSyncResponse);
    setDoc(newDoc);
  };

  return (
    <div>
      <h1>CRDT using Automerge</h1>
      <h2>User input</h2>
      <input type='text' value={localText} onChange={onChange}/>
      <h2>Stored state</h2>
      <p>
        {JSON.stringify(doc)}
      </p>
      <h2>History</h2>
      {Automerge.getHistory(doc).map((change) => <p>{JSON.stringify(change.snapshot)}</p>)}
    </div>
  );
};

export default CrdtTestComponent
