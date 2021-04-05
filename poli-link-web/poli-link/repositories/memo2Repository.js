import Repository from "./Repository";

const resource = "/memo"

export default {
  get() {
    return Repository.get(`${resource}`)
  },

  getMemo(memoId) {
    return Repository.get(`${resource}/${memoId}`)
  },

  creteMemo(payload) {
    return Repository.post(`${resource}`, payload)
  }
}