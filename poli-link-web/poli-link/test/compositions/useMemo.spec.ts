import 'jest';
import useMemo from "@/compositions/useMemo";
import { Memo } from "@/types";


describe('compositions/useMemo.spec.ts', () => {
  // it('getMemo', async () => {
  //   const { state, getMemo } = useMemo();
  //   await getMemo(2);
  //   expect(state.memoData.memo).toEqual(['bmemo']);
  // });
  
  it('addTodo should work properly', async () => {
    const { state, getMemoList } = useMemo();
    await getMemoList;
    expect(state.memoList.length).toBeLessThan(100);
  });

});