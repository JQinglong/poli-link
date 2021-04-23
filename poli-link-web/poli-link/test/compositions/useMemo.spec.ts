import useMemo from "@/compositions/useMemo";

import { shallowMount } from '@vue/test-utils'


// beforeAll(() => {
//   jest.mock('@/compositions/useMemo');
//   getMemoList = jest.fn();
//   jest.spyOn(composition, 'use〜').mockReturnValue({
//     state: {
//       ...
//     },
//     hogeMethod
//   });　// compositionのメソッドやstateはmock化します。
//   const mountFunction = (options: any) => {
//     return mount(〜, {
//       localVue,
//       ...options
//     });
//   };
// });

describe('compositions/useMemo.spec.ts', () => {
//   it('getMemo', async () => {
//     const { state, getMemo } = useMemo();
//     await getMemo(2);
//     console.log('state.memoData.memo', state)
//     expect(state.memoData.memo).toEqual(['bmemo']);
//   });
  
  it('getMemoList should work properly', async () => {
    const { state, getMemoList } = useMemo();
    await getMemoList;
    console.log('state.memoList', state.memoList)
    expect(state.memoList.length).toBeLessThan(1);
  });

});
