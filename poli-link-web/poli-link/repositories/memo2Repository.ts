// import Repository from "./Repository";

// const resource = "/memo"

export default {
  get() {
    // Repository.get(`${resource}`)
    return {data: [{memo: "memotest1"}]}
  },

  // getMemo(memoId) {
  //   return Repository.get(`${resource}/${memoId}`)
  // },

  // creteMemo(payload) {
  //   return Repository.post(`${resource}`, payload)
  // }
}