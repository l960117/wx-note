import Taro from '@tarojs/taro'
import { getFriendNote, getUserNoteInfo } from './service'

const inintState ={
  nickname: '',
  total: '',
  noteList: []
}
export default {
  namespace: "friend",
  state: inintState,
  effects: {
    *getFriendNoteAction({ payload }, { call, put }) {
      const res = yield call(getFriendNote, payload);
      if (res.resultCode === 200) {
        if (payload.start === 0) {
          yield put({ type: 'setFirstNoteList', payload: { ...res.data, type:payload.type } });
        } else {
          yield put({ type: 'setNoteList', payload: { ...res.data, type:payload.type } });
        }
      }
      return yield res;
    },
    *getUserNoteInfoAction({ payload }, { call, put }) {
      const res = yield call(getUserNoteInfo, payload);
      if (res.resultCode === 200) {
        yield put({ type: 'setUserInfo' , payload: { ...res.data }});
      }
    }
  },
  reducers: {
    setUserInfo(state, { payload }){
      const {userInfo,total} = payload
      state.nickname =  userInfo.nickname
      state.total = total
      return { ...state };
    },
    setFirstNoteList(state, {payload}){
      const { results } = payload
      state.noteList = results
      return { ...state };
    },
    setNoteList(state, { payload }){
      const { results } = payload
      state.noteList =  [...state.noteList, ...results]
      return { ...state };
    },
  }
};