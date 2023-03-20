export const retryIfError = (fn, maxAttempts = 3, delay = 1000) => {
    return new Promise((resolve, reject) => {
      let attempts = 0;
  
      function execute() {
        attempts++;
        try {
          const result = fn();
          resolve(result);
        } catch (error) {
          if (attempts >= maxAttempts) {
            reject(error);
          } else {
            setTimeout(execute, delay);
          }
        }
      }
  
      execute();
    });
  }