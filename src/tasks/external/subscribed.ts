export class SubscribedTask {
    async verify(): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }
  }
  