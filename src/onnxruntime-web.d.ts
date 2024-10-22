declare module 'onnxruntime-web' {
  export class InferenceSession {
    static create(path: string): Promise<InferenceSession>;
    run(feeds: { [name: string]: Tensor }): Promise<{ [name: string]: Tensor }>;
  }

  export class Tensor {
    constructor(type: string, data: Float32Array, dims: number[]);
  }
}
