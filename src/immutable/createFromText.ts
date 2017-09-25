import { EditorState, ContentState, convertFromRaw } from 'draft-js';
import { List } from 'immutable';

export type Range = [ number, number, any ];
export type IRange = List<Range>;

export default function createFromText(text: string, ranges: Array<Range> = []) {
  const contentState = ContentState.createFromText(text);
  if (!text || ! ranges.length) {
    return contentState;
  }
  
  // spilit text into blocks
  const blockTexts = text.split('\n');
  let rangeForLoop = List(ranges.slice()) as List<Range>;
  let accumulateLength = 0;
  let entityCount = 0;
  const getEntityKey = (() => () => entityCount++)();
  const entityMap = {};
  const blocks = [] as Array<any>;
  for (let i = 0; i < blockTexts.length; i++) {
    const block = blockTexts[i];
    blocks.push({
      text: block,
      type: 'unstyled',
      entityRanges: rangeForLoop
        .takeWhile(range => 
          !!range && !!range[0] && !!range[1]
          && range[0] - accumulateLength >= 0 && range[1] - accumulateLength <= block.length
        )
        .map(range => {
          if (!!range && !!range[0] && !!range[1]) {
            const entityKey = getEntityKey();
            
            entityMap[`${entityKey}`] = {
              type: 'TOKEN',
              mutability: 'MUTABLE',
              data: range[2],
            };

            return {
              offset: range[0] - accumulateLength,
              length: range[1] - range[0],
              key: `${entityKey}`,
            };
          }
          return null;
        }),
    });
    accumulateLength += block.length;
  }

  return convertFromRaw({
    blocks,
    entityMap,
  });  
}