import { EditorState, ContentState, ContentBlock, convertFromRaw } from 'draft-js';
import { Iterable, List, fromJS } from 'immutable';

export type Range = [ number, number, any ];
export type IRange = List<Range>;

function getEntityRanges(ranges: IRange, accumulateLength: number, currentLength): Iterable<number, any> {
    return ranges
      .takeWhile(range => range[0] - accumulateLength >= 0 && range[1] - accumulateLength <= currentLength)
      .map((range, idx) => ({
        offset: range[0] - accumulateLength,
        length: range[1] - range[0],
        key: `${accumulateLength}-${idx}`
      }));
}

export default function createFromText(text: string, ranges: Array<Range> = []) {
  const contentState = ContentState.createFromText(text);
  if (!text) {
    return EditorState.createEmpty();
  }
  if (!ranges.length) {
    return EditorState.createWithContent(contentState);
  }
  
  // spilit text into blocks
  const blockTexts = text.split('\n');
  let rangeForLoop = List(ranges.slice());
  let accumulateLength = 0;
  let entityCount = 0;
  const getEntityKey = (() => () => entityCount++)();
  const entityMap = {};
  const blocks = [];
  for (let i = 0; i < blockTexts.length; i++) {
    const block = blockTexts[i];
    blocks.push({
      text: block,
      type: 'unstyled',
      entityRanges: rangeForLoop
        .takeWhile(range => range[0] - accumulateLength >= 0 && range[1] - accumulateLength <= block.length)
        .map((range, idx) => {
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
        }),
    });
    accumulateLength += block.length;
  }

  return convertFromRaw({
    blocks,
    entityMap,
  });  
}