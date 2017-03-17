import { ContentState } from 'draft-js';

export default function getData(contentState: ContentState) {
  const blocks = contentState.getBlockMap();
  const ranges = [];
  blocks.map(block => {
    block.findEntityRanges(
      character => !!character.getEntity(),
    (start, end) => {
      var key = block.getEntityAt(start);
      const entityData = contentState.getEntity(key).getData();
      ranges.push([ start, end , entityData ]);
    });
  });

  return {
    text: blocks.map(block => block.getText()).join('\n'),
    ranges,
  };
}