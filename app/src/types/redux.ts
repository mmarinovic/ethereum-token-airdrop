export interface IPayloadWrapper<T> {
    payload?: T;
}
  
export interface ISimpleAction<T> {
    type: T;
 }
  
export interface IAction<T, P> extends ISimpleAction<T>, IPayloadWrapper<P> { }