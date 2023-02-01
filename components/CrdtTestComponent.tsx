import * as Automerge from '@automerge/automerge';

const CrdtTestComponent = () => {
    const doc = Automerge.init();
    return (
      <div>
        <>{JSON.stringify(doc)}</>
      </div>
    );
  };

export default CrdtTestComponent
