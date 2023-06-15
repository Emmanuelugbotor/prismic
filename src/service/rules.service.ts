import APIClient from "./api-client";

export default class RuleService {
  async getAllRules<T>() {
    const data: T = await new APIClient("/rules").getAll();
    return data;
  }

  postRules<T>(rules: T) {
    const data = new APIClient("/rules").post(rules);
    return data;
  }
  deleteRulesById<T>(id: T) {
    const data = new APIClient("/rules").delete(id);
    return data;
  }
  
  update<T, P>(id: T, resource:P) {
    const data = new APIClient("/rules").patch(id, resource);
    return data;
  }
}
