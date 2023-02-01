import * as Automerge from '@automerge/automerge';

const CrdtTestComponent =
  // Return a React component that calls the add_one method on the wasm module
  () => {
    const doc = Automerge.init();
    return (
      <div>
        <>{JSON.stringify(doc)}</>
      </div>
    );
  };

export default CrdtTestComponent
