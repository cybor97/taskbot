export abstract class Task {
  abstract verify(): Promise<boolean>;
}
