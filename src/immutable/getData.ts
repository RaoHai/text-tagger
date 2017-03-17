import { ContentState } from 'draft-js';

export type Range = [ number, number, any ];
export default function getData(contentState: ContentState) {
  const blocks = contentState.getBlockMap();
  const ranges = [] as Array<Range>;
  blocks.map(block => {
    block && block.findEntityRanges(
      character => !!character && !!character.getEntity(),
    (start, end) => {
      var key = block.getEntityAt(start);
      const entityData = contentState.getEntity(key).getData();
      ranges.push([ start, end , entityData ]);
    });
  });

  return {
    text: blocks.map(block => block && block.getText()).join('\n'),
    ranges,
  };
}