export class MockDisposable implements Disposable {
  constructor () { }
  
  public dispose = jest.fn()
}