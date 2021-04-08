import { InjectionKey } from "@vue/composition-api";
import { MemoStore } from "@/store";

const MemoKey: InjectionKey<typeof MemoStore> = Symbol('MemoStore')
export default MemoKey
