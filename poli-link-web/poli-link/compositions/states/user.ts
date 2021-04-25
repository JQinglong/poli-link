import {provide,inject, InjectionKey, reactive, toRefs} from "@vue/composition-api";

export type UserType  = {
    id?:string,
    name:string,
    email:string,
    thumbnail:string,
}

export type ErrorType = {
    state:number
    message:string
}
export type GlobalStateType = {
    user:UserType,
    error?:ErrorType
}

export const useGlobalState = ()=>{
    const globalState =reactive<GlobalStateType>({
        user:{
            id:"",
            name:"",
            email:"",
            thumbnail:""
        }
    });
    const setUserState = (state: UserType)=>{
        globalState.user.id=state.id;
        globalState.user.email=state.email;
        globalState.user.thumbnail=state.thumbnail;
        globalState.user.name=state.name;
    }
    const cleanUserState = () =>{
        globalState.user={
            id:"",
            name:"",
            email:"",
            thumbnail:""
        }
    }
    return {
        ...toRefs(globalState),
        setUserState,
        cleanUserState
    }
}

type StateType = ReturnType<typeof useGlobalState>

export const GlobalStateKey:InjectionKey<StateType> =Symbol("GlobalState");
export const ErrorStateKey: InjectionKey<ErrorType> = Symbol("ErrorState");

export const provideGlobalState= ()=>{
    provide(GlobalStateKey,useGlobalState());
};

export const injectGlobalState =()=>{
    const state = inject(GlobalStateKey);
    if(!state){
        throw Error("Unable to install User State");
    }
    return state;
}
