import Taro from '@tarojs/taro'
import getNoteListByType from './service'

const inintState ={
  noteList: {
    public: {
      list: [],
      total: 0
    },
    private: {
      list:[],
      total: 0
    }
  },
}
export default {
  namespace: "finding",
  state: inintState,
  effects: {
    *getNoteListAction({ payload }, { call, put }) {
      console.log(444)
      const res = yield call(getNoteListByType, payload);
      if (res.resultCode === 200) {
        if (payload.start === 0) {
          yield put({ type: 'setFirstNoteList', payload: { ...res.data, type:payload.type } });
        } else {
          yield put({ type: 'setNoteList', payload: { ...res.data, type:payload.type } });
        }
      }
      return yield res;
    }
  },
  reducers: {
    setNoteList(state, { payload }){
      const {type,results,total} = payload
      state.noteList[type].list =  [...state.noteList[type].list, ...results]
      state.noteList[type].total = total
      return { ...state };
    },
    setFirstNoteList(state, {payload}){
      const { type, results, total } = payload
      state.noteList[type].list = results
      state.noteList[type].total = total
      return { ...state };
    }
  }
};