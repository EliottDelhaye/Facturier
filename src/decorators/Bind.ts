// Le décorateur bind permet de lier la méthode à l'instance de la classe
export function bind(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  let newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };
  return newDescriptor;
}
