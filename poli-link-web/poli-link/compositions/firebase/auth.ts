import { auth } from '@/plugins/firebase.config';
import Firebase from 'firebase';

type SuccessResType = {
  status: 'ok';
  data: Firebase.auth.UserCredential;
};

type FailureResType = {
  status: 'failed';
  message: string;
};

export const SigninWithBasic = async (email: string, password: string): Promise<SuccessResType | FailureResType> => {
  try {
    const loginUser = await auth.signInWithEmailAndPassword(email, password);
    return {
      status: 'ok',
      data: loginUser,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    let message = '';
    if (e instanceof Error) {
      message = e.message;
    }
    return {
      status: 'failed',
      message: message,
    };
  }
};

export const SignUpWithBasic = async (email: string, password: string): Promise<SuccessResType | FailureResType> => {
  try {
    console.log(email, password);
    const createdUser = await auth.createUserWithEmailAndPassword(email, password);
    console.log('作成された情報について', createdUser);
    return {
      status: 'ok',
      data: createdUser,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    let message = '';
    if (e instanceof Error) {
      message = e.message;
    }
    return {
      status: 'failed',
      message: message,
    };
  }
};

export const SigninWithOAuth = async (provider: any): Promise<SuccessResType | FailureResType> => {
  try {
    const loginUser = await auth.signInWithPopup(provider);
    // eslint-disable-next-line no-console
    console.error(loginUser);
    return {
      status: 'ok',
      data: loginUser,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    let message = '';
    if (e instanceof Error) {
      message = e.message;
    }
    return {
      status: 'failed',
      message: message,
    };
  }
};

export const SignOut = async (): Promise<void | FailureResType> => {
  try {
    await auth.signOut();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    let message = '';
    if (e instanceof Error) {
      message = e.message;
    }
    return {
      status: 'failed',
      message: message,
    };
  }
};
