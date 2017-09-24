export const disposableListener = (field, fieldEvent, callback) => {
  if (typeof fieldEvent === 'string') {
    field.addEventListener(fieldEvent, function evCallback(event) {
      callback(event.currentTarget);
      event.currentTarget.removeEventListener(fieldEvent, evCallback);
    });
  }
};
