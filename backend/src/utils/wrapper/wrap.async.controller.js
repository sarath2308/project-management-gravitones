export function wrapAsyncController(controller) {
  const proto = Object.getPrototypeOf(controller);

  const methodNames = Object.getOwnPropertyNames(proto).filter(
    (name) => typeof controller[name] === 'function' && name !== 'constructor'
  );

  methodNames.forEach((name) => {
    const original = controller[name].bind(controller);

    controller[name] = (req, res, next) => {
      Promise.resolve(original(req, res, next)).catch(next);
    };
  });

  return controller;
}
