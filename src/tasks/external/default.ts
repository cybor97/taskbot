import { TaskVerifier } from "../task";

export class DefaultTask extends TaskVerifier {
  async verify(): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }
}
